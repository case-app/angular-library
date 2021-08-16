export const abcCreateEditTemplate = `
<section>
  <div class="flex flex-mobile space-between align-center mb-5">
    <div class="left-part">
      <h1 class="title is-2 has-text-weight-light" *ngIf="mode === 'create'">
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
        class="button is-primary is-hidden-touch"
        (click)="submit()"
        [ngClass]="{ 'is-loading': loading }"
      >
        Enregistrer
      </button>
      <button
        class="button is-primary is-rounded is-hidden-desktop"
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
      <div class="columns is-multiline">
        <ng-container *ngFor="let field of resolvedFields">
          <div
            class="column is-flex is-align-items-flex-end"
            [ngClass]="field.className"
            *ngIf="!field.hidden"
          >
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
              [label]="field.label"
              [placeholder]="field.placeholder"
              [validators]="field.validators"
              [showErrors]="showErrors"
              (valueChanged)="onValueChanged($event, field)"
            ></abc-input>
          </div>
        </ng-container>
      </div>
    </div>
  </form>
</section>
`
