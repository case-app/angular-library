import { HttpErrorResponse } from '@angular/common/http'
import { Component, EventEmitter, Output } from '@angular/core'
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable } from 'rxjs'

import { FieldSpecialRule } from '../interfaces/field-special-rule.interface'
import { Field } from '../interfaces/field.interface'
import { ResourceDefinition } from '../interfaces/resource-definition.interface'
import { BreadcrumbService } from '../services/breadcrumb.service'
import { FlashMessageService } from '../services/flash-message.service'
import { ResourceService } from '../services/resource.service'

@Component({
  template: 'NO UI TO BE FOUND HERE!'
})
export class AbcCreateEditComponent {
  item: any
  definition: ResourceDefinition
  fieldSpecialRules?: FieldSpecialRule[] = []
  editModeSpecialRules?: FieldSpecialRule[] = []

  form: FormGroup
  resolvedFields: Field[]
  fields: Field[]

  mode: string
  loading: boolean
  showErrors: boolean
  isModal: boolean
  redirectTo: string

  @Output() submitSuccessful: EventEmitter<void> = new EventEmitter()

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private breadcrumbService: BreadcrumbService,
    private resourceService: ResourceService,
    private flashMessageService: FlashMessageService,
    private activatedRoute?: ActivatedRoute
  ) {}

  async initCreateEditView() {
    if (this.activatedRoute) {
      this.mode = this.activatedRoute.snapshot.data.mode
      this.redirectTo = this.activatedRoute.snapshot.queryParams.redirectTo

      // Apply special rules from queryParams.
      if (this.activatedRoute.snapshot.queryParams.specialRules) {
        this.fieldSpecialRules = JSON.parse(
          this.activatedRoute.snapshot.queryParams.specialRules
        )
      }

      // Get remote resource on edit mode.
      if (this.mode === 'edit') {
        await this.getItem(this.activatedRoute.snapshot.params.id)
      }
    }

    this.resolvedFields = await this.resolveFields(this.fields)
    this.form = this.generateForm(this.resolvedFields)

    if (!this.isModal) {
      this.setBreadcrumbs()
    }
  }

  // Get remote item from API for "edit" mode.
  async getItem(id: string) {
    this.item = await this.resourceService
      .show(this.definition.slug, id)
      .toPromise()
      .then((itemRes) => itemRes)
  }

  // Return a promise of an array of fields with all async items retrieved.
  async resolveFields(fields: Field[]): Promise<Field[]> {
    const asyncFieldPromises: Promise<any>[] = []

    if (this.mode === 'edit') {
      Object.assign(this.fieldSpecialRules, this.editModeSpecialRules || {})
    }

    fields.forEach((field: Field) => {
      if (field.createValidators && field.editValidators) {
        field.validators =
          this.mode === 'create' ? field.createValidators : field.editValidators
      } else if (!field.validators) {
        field.validators = []
      }

      if (field.required) {
        field.validators.push(Validators.required)
      }

      if (typeof field.selectOptions === 'function') {
        asyncFieldPromises.push(
          field.selectOptions().then((res) => {
            field.selectOptions = res
          })
        )
      }

      // Apply special rules.
      const specialRuleForField: FieldSpecialRule =
        field.id &&
        this.fieldSpecialRules.find((rule) => rule.fieldId === field.id)
      if (specialRuleForField) {
        field.hidden = specialRuleForField.hidden
        field.forcedValue = specialRuleForField.forcedValue
      }
    })

    return Promise.all(asyncFieldPromises).then(() => fields)
  }

  // Create ReactiveForm based on resource definition.
  generateForm(fields: Field[]): FormGroup {
    const form: FormGroup = this.formBuilder.group({})
    fields.forEach((field: Field) => {
      field.initialValue = {}

      Object.keys(field.properties).forEach((fieldProp: string) => {
        // Get name of the property and path if different from controlName.
        const controlName: string = field.properties[fieldProp]

        form.addControl(
          controlName,
          this.generateControl(field, fieldProp, controlName)
        )
      })
    })

    return form
  }

  generateControl(
    field: Field,
    fieldProp: string,
    controlName: string
  ): AbstractControl | FormArray {
    const retrievedItemProp: string = field.retrievedItemProperties
      ? field.retrievedItemProperties[
          Object.keys(field.retrievedItemProperties).find(
            (key) => key === controlName
          )
        ]
      : null
    // Set initial value of field.
    if (field.forcedValue) {
      field.initialValue = field.forcedValue
    } else {
      field.initialValue[fieldProp] = this.item
        ? this.getItemValue(this.item, retrievedItemProp || controlName)
        : null
    }

    // If the field is an array, create a FormArray.
    return Array.isArray(field.initialValue[fieldProp])
      ? this.formBuilder.array(
          field.initialValue[fieldProp] as any[],
          field.validators
        )
      : this.formBuilder.control(
          field.initialValue[fieldProp],
          field.validators
        )
  }

  setBreadcrumbs() {
    this.breadcrumbService.breadcrumbLinks.next([
      {
        path: `/${this.definition.path || this.definition.slug}`,
        label: this.definition.title
      },
      {
        label: `${this.mode === 'create' ? 'Ajouter' : 'Modifier'} ${
          this.definition.gender === 'Masculine' ? 'un' : 'une'
        } ${this.definition.nameSingular}`
      }
    ])
  }

  onValueChanged(newValue: { [key: string]: any }, field: Field) {
    Object.keys(field.properties).forEach((fieldProp: string) => {
      const controlName: string = field.properties[fieldProp]
      if (Array.isArray(newValue[fieldProp])) {
        // If newValue is array we have to reset the control by putting a new FormArray of FormControls.
        this.form.setControl(
          controlName,
          new FormArray(newValue[fieldProp].map((v) => new FormControl(v)))
        )
      } else {
        this.form.get(controlName).setValue(newValue[fieldProp])
      }
    })

    if (field.onChange) {
      field.onChange(newValue)
    }
  }

  submit() {
    if (this.form.invalid) {
      this.showErrors = true

      this.debugFindInvalidControls()

      return this.flashMessageService.error(
        `Impossible d'envoyer le formulaire: certains champs n'ont pas été remplis correctement.`
      )
    }

    const observable: Observable<any> =
      this.mode === 'create'
        ? this.resourceService.store(this.definition.slug, this.form.value)
        : this.resourceService.update(
            this.definition.slug,
            this.item.id,
            this.form.value
          )

    this.loading = true
    observable.subscribe(
      (res: { id: number }) => {
        this.flashMessageService.success(
          `La resource a bien été ${
            this.mode === 'create' ? 'créée' : 'mise à jour'
          }`
        )
        this.loading = false

        this.form.reset()
        this.submitSuccessful.emit()

        if (this.isModal) {
          return
        }
        let redirectTo: string = this.redirectTo && JSON.parse(this.redirectTo)
        if (!redirectTo) {
          if (this.definition.hasDetailPage) {
            if (this.mode === 'create') {
              redirectTo = `/${this.definition.path || this.definition.slug}/${
                res.id
              }`
            } else {
              redirectTo = this.router.url.replace('/edit', '')
            }
          } else {
            if (this.definition.hasListPage) {
              redirectTo = `/${this.definition.path || this.definition.slug}`
            } else {
              redirectTo = '/'
            }
          }
        }
        this.router.navigateByUrl(redirectTo)
      },
      (err: HttpErrorResponse) => {
        this.loading = false
        this.flashMessageService.error(
          err && err.error && err.error.message
            ? err.error.message
            : `Une erreur à eu lieu. La ressource n'a pas pu être sauvegardée.`
        )
      }
    )
  }

  // Recursive getter to retrieve nested properties.
  getItemValue(item: any, propName: string): any | any[] {
    let value: any
    try {
      value = propName.split('.').reduce((prev, current) => prev[current], item)
    } catch (error) {
      value = null
    }
    return value
  }

  getFieldById(id: string): Field {
    return this.resolvedFields.find((f) => f.id === id)
  }

  // Reset Form Control from Field.
  resetFieldFormControls(field: Field): void {
    Object.keys(field.properties).forEach((fieldProp: string) => {
      const controlName: string = field.properties[fieldProp]

      this.form.setControl(
        controlName,
        this.generateControl(field, fieldProp, controlName)
      )
    })
  }

  // Set custom value to Field.
  setFieldValue(field: Field, value: any): void {
    field.forcedValue = value
    this.resetFieldFormControls(field)
  }

  // Debug feature.
  private debugFindInvalidControls(): AbstractControl[] {
    const invalid = []
    const controls = this.form.controls
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name)
      }
    }
    console.log(invalid)
    return invalid
  }
}
