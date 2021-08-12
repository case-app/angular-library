export const abcCreateEditModalTemplate = `
<div class="modal is-active">
  <div class="modal-background"></div>
  <div class="modal-content notification is-light">
    <div class="columns">
      <div class="column">
        <h1 class="title is-2 is-light" *ngIf="mode === 'create'">
          Ajouter {{ definition.gender === 'Masculine' ? 'un' : 'une' }}
          {{ definition.nameSingular }}
        </h1>
        <h1 class="title is-2 is-light" *ngIf="mode === 'edit'">
          Modifier {{ definition.gender === 'Masculine' ? 'un' : 'une' }}
          {{ definition.nameSingular }}
        </h1>
      </div>
    </div>

    <div class="columns flex flex-wrap">
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
        <div class="flex flex-mobile align-stretch space-between">
          <button class="button" (click)="close()">Annuler</button>
          <button
            class="button is-primary is-hidden-touch"
            (click)="submit()"
            [ngClass]="{ 'is-loading': loading }"
          >
            Enregistrer
          </button>
          <button
            class="button is-primary is-hidden-desktop"
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
