export const caseCreateEditTemplate = `
<section>
  <div class="is-flex is-justify-content-space-between is-align-items-center mb-5">
    <div class="left-part">
      <h1 class="title is-2 has-text-weight-light" *ngIf="mode === 'create'"> 
       <span class="icon is-large">
          <i class="icon {{definition.icon}} is-size-2 has-text-link"></i>
        </span>
        Ajouter {{ definition.gender === 'Masculine' ? 'un' : 'une' }}
        {{ definition.nameSingular }}
      </h1>
      <h1 class="title is-2 has-text-weight-light" *ngIf="mode === 'edit'">
        Modifier {{ definition.gender === 'Masculine' ? 'un' : 'une' }}
        {{ definition.nameSingular }}
      </h1>
    </div>
    <div class="right-part">
      <button
        class="button is-link is-hidden-touch"
        (click)="submit()"
        [ngClass]="{ 'is-loading': loading }"
      >
        Enregistrer
      </button>
      <button
        class="button is-link is-rounded is-hidden-desktop"
        (click)="submit()"
        [ngClass]="{ 'is-loading': loading }"
      >
        <i class="icon icon-save"></i>
      </button>
    </div>
  </div>

  <form [formGroup]="form" *ngIf="form">
    <div class="card p-4">
      <!-- Fields -->
      <div class="columns is-multiline is-align-items-flex-end">
        <ng-container *ngFor="let field of resolvedFields">
          <div
            class="column is-flex is-align-items-flex-end"
            [ngClass]="field.className"
            *ngIf="!field.hidden"
          >
            <case-input
              [type]="field.inputType"
              [label]="field.label"
              [placeholder]="field.placeholder"
              [secondPlaceholder]="field.secondPlaceholder"
              [initialValue]="field.initialValue"
              [searchResources]="field.searchResources"
              [resourceName]="definition.slug"
              [searchParams]="field.searchParams"
              [maxSelectedItems]="field.maxSelectedItems"
              [selectOptions]="field.selectOptions"
              [min]="field.min"
              [max]="field.max"
              [copyDateFromOnDateTo]="field.copyDateFromOnDateTo"
              [validators]="field.validators"
              [showErrors]="showErrors"
              (valueChanged)="onValueChanged($event, field)"
            ></case-input>
          </div>
        </ng-container>
      </div>
    </div>
  </form>
</section>
`
