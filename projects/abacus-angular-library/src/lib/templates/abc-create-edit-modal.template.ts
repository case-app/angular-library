export const abcCreateEditModalTemplate = `
<div class="modal is-active">
  <div class="modal-background"></div>
  <div class="modal-content notification has-text-weight-light">
    <div class="columns">
      <div class="column">
        <h1 class="title is-2 has-text-weight-light" *ngIf="mode === 'create'">
          Ajouter {{ definition.gender === 'Masculine' ? 'un' : 'une' }}
          {{ definition.nameSingular }}
        </h1>
        <h1 class="title is-2 has-text-weight-light" *ngIf="mode === 'edit'">
          Modifier {{ definition.gender === 'Masculine' ? 'un' : 'une' }}
          {{ definition.nameSingular }}
        </h1>
      </div>
    </div>

    <div class="columns is-multiline is-align-items-flex-end">
      <form [formGroup]="form" *ngIf="form" class="full-width">
        <ng-container *ngFor="let field of resolvedFields">
          <div class="column" [ngClass]="field.className" *ngIf="!field.hidden">
            <abc-input
              [type]="field.inputType"
              [initialValue]="field.initialValue"
              [searchResources]="field.searchResources"
              [resourceName]="definition.slug"
              [searchParams]="field.searchParams"
              [maxSelectedItems]="field.maxSelectedItems"
              [selectOptions]="field.selectOptions"
              [min]="field.min"
              [max]="field.max"
              [copyDateFromOnDateTo]="field.copyDateFromOnDateTo"
              [label]="field.label"
              [placeholder]="field.placeholder"
              [validators]="field.validators"
              [showErrors]="showErrors"
              (valueChanged)="onValueChanged($event, field)"
            ></abc-input>
          </div>
        </ng-container>
      </form>
    </div>

    <div class="columns">
      <div class="column mt-4 pb-0">
        <div class="is-flex is-align-items-stretch is-justify-content-space-between">
          <button class="button" (click)="close()">Annuler</button>
          <button
            class="button is-link is-hidden-touch"
            (click)="submit()"
            [ngClass]="{ 'is-loading': loading }"
          >
            Enregistrer
          </button>
          <button
            class="button is-link is-hidden-desktop"
            (click)="submit()"
            [ngClass]="{ 'is-loading': loading }"
          >
            <i class="icon icon-save"></i>
          </button>
        </div>
      </div>
    </div>
    <button class="button is-light close" aria-label="close" (click)="close()">
      <i class="icon icon-x is-size-2"></i>
    </button>
  </div>
</div>
`
