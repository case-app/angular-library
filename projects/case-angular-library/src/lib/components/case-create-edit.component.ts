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
import { ResourceMode } from '../enums/resource-mode.enum'

import { FieldSpecialRule } from '../interfaces/field-special-rule.interface'
import { Field } from '../interfaces/field.interface'
import { ResourceDefinition } from '../interfaces/resource-definition.interface'
import { BreadcrumbService } from '../services/breadcrumb.service'
import { FlashMessageService } from '../services/flash-message.service'
import { ResourceService } from '../services/resource.service'

@Component({
  template: 'NO UI TO BE FOUND HERE!'
})
export class CaseCreateEditComponent {
  item: any
  definition: ResourceDefinition
  fieldSpecialRules?: FieldSpecialRule[] = []
  editModeSpecialRules?: FieldSpecialRule[] = []

  form: FormGroup
  resolvedFields: Field[]
  fields: Field[]

  mode: ResourceMode
  loading: boolean
  showErrors: boolean
  isModal: boolean
  redirectTo: string
  redirectToQueryParams: { [key: string]: string }
  patchURL: string

  ResourceMode = ResourceMode

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
      this.redirectToQueryParams =
        this.activatedRoute.snapshot.queryParams.redirectToQueryParams &&
        JSON.parse(
          this.activatedRoute.snapshot.queryParams.redirectToQueryParams
        )

      // Apply special rules from queryParams.
      if (this.activatedRoute.snapshot.queryParams.specialRules) {
        this.fieldSpecialRules = JSON.parse(
          this.activatedRoute.snapshot.queryParams.specialRules
        )
      }

      // Get remote resource on edit mode.
      if (this.mode === ResourceMode.Edit) {
        await this.getItem(this.activatedRoute.snapshot.params.id)
      }
    }

    this.resolvedFields = await this.resolveFields(this.fields)
    this.form = await this.generateForm(this.resolvedFields)

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

    if (this.mode === ResourceMode.Edit) {
      Object.assign(this.fieldSpecialRules, this.editModeSpecialRules || {})
    }

    fields.forEach((field: Field) => {
      if (field.createValidators && field.editValidators) {
        field.validators =
          this.mode === ResourceMode.Create
            ? field.createValidators
            : field.editValidators
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
  async generateForm(fields: Field[]): Promise<FormGroup> {
    const form: FormGroup = this.formBuilder.group({})
    fields.forEach((field: Field) => {
      if (field.property) {
        field.properties = { value: field.property }
      }

      Object.keys(field.properties || []).forEach(async (fieldProp: string) => {
        // Get name of the property and path if different from controlName.
        const controlName: string = field.properties[fieldProp]

        form.addControl(
          controlName,
          await this.generateControl(field, fieldProp, controlName)
        )
      })
    })

    return form
  }

  async generateControl(
    field: Field,
    fieldProp: string,
    controlName: string
  ): Promise<AbstractControl | FormArray> {
    const retrievedItemProp: string = field.retrievedItemProperties
      ? field.retrievedItemProperties[
          Object.keys(field.retrievedItemProperties).find(
            (key) => key === controlName
          )
        ]
      : null

    // Set initial value of field, in order: forcedValue, itemValue (fetched), initialValue, null.
    if (field.forcedValue) {
      field.initialValue = field.forcedValue
    }
    const itemValue: any = this.getItemValue(
      this.item,
      retrievedItemProp || controlName
    )
    if (itemValue !== null) {
      field.initialValue = {
        [fieldProp]: itemValue
      }
    } else if (field.initialValue) {
      if (typeof field.initialValue === 'function') {
        field.initialValue = await field.initialValue().then((res) => res)
      }
    } else {
      field.initialValue = {
        [fieldProp]: null
      }
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
        label: `${this.mode === ResourceMode.Create ? 'Ajouter' : 'Modifier'} ${
          this.definition.gender === 'Masculine' ? 'un' : 'une'
        } ${this.definition.nameSingular}`
      }
    ])
  }

  onValueChanged(newValue: { [key: string]: any }, field: Field) {
    Object.keys(field.properties).forEach((fieldProp: string) => {
      const controlName: string = field.properties[fieldProp]

      let typedValue: any = newValue[fieldProp]

      if (Array.isArray(typedValue)) {
        // If newValue is array we have to reset the control by putting a new FormArray of FormControls.
        this.form.setControl(
          controlName,
          new FormArray(typedValue.map((v) => new FormControl(v)))
        )
      } else {
        // Prevent wrong value from being set from HTML selects.
        if (typedValue === 'null') {
          typedValue = null
        }

        this.form.get(controlName).setValue(typedValue)
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

    let action: Observable<any>

    switch (this.mode) {
      case ResourceMode.Create:
        action = this.resourceService.store(
          this.definition.slug,
          this.form.value
        )
        break
      case ResourceMode.Edit:
        action = this.resourceService.update(
          this.definition.slug,
          this.item.id,
          this.form.value
        )
        break
      case ResourceMode.Patch:
        action = this.resourceService.patch(this.patchURL, this.form.value)
        break
    }

    this.loading = true
    action.subscribe(
      (res: { id: number }) => {
        this.flashMessageService.success(
          `${this.definition.gender === 'Masculine' ? 'Le' : 'La'} ${
            this.definition.nameSingular
          } a bien été ${
            this.mode === ResourceMode.Create
              ? this.definition.gender === 'Masculine'
                ? 'créé'
                : 'créée'
              : this.definition.gender === 'Masculine'
              ? 'mis à jour'
              : 'mise à jour'
          }.`
        )
        this.loading = false

        this.form.reset()
        this.submitSuccessful.emit()

        if (this.isModal) {
          this.close()
        }

        if (!this.redirectTo) {
          if (this.definition.hasDetailPage) {
            if (this.mode === ResourceMode.Create) {
              this.redirectTo = `/${
                this.definition.path || this.definition.slug
              }/${res.id}`
            } else {
              this.redirectTo = this.router.url.replace('/edit', '')
            }
          } else {
            if (this.definition.hasListPage) {
              this.redirectTo = `/${
                this.definition.path || this.definition.slug
              }`
            } else {
              this.redirectTo = '/'
            }
          }
        }

        if (!this.redirectToQueryParams) {
          this.redirectToQueryParams = {}
        }

        // Add query params in redirect URL to plug custom behavior on front (onboarding, etc.).
        if (this.mode === ResourceMode.Create) {
          this.redirectToQueryParams.resourceCreated = `${this.definition.className}-${res.id}`
        } else if (this.mode === ResourceMode.Edit) {
          this.redirectToQueryParams.resourceEdited = `${this.definition.className}-${res.id}`
        }

        this.router.navigate([this.redirectTo], {
          queryParams: Object.assign(this.redirectToQueryParams, {
            reload: new Date().toISOString()
          }),
          queryParamsHandling: 'merge'
        })
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
    Object.keys(field.properties).forEach(async (fieldProp: string) => {
      const controlName: string = field.properties[fieldProp]

      this.form.setControl(
        controlName,
        await this.generateControl(field, fieldProp, controlName)
      )
    })
  }

  // Set custom value to Field.
  setFieldValue(field: Field, value: any): void {
    field.initialValue = value
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

  close() {
    // Empty function to be override in modal.
  }
}
