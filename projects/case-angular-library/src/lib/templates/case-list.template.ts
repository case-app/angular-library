export const caseListTemplate = `
<!-- Heading -->
<div class="is-flex flex-mobile is-justify-content-space-between is-align-items-center mb-5">
  <div class="left-part">
    <h1 class="title is-2 has-text-weight-light">
      {{ definition.title }}
    </h1>
  </div>
  <div class="right-part">
    <!-- Export button -->
    <a
      *ngIf="definition.buttons.indexOf(LinkType.EXPORT) > -1"
      class="button is-link ml-5 is-hidden-touch"
      routerLink="/{{ definition.path || definition.slug }}"
      [queryParams]="{ toXLS: 'true' }"
      queryParamsHandling="merge"
    >
      Exporter
    </a>
    <!-- Create button -->
    <ng-container *caseHasPermission="createResourcePermission">
    <a
      *ngIf="definition.buttons.indexOf(LinkType.CREATE) > -1"
      class="button is-link ml-5 is-hidden-touch"
      routerLink="/{{ definition.path || definition.slug }}/create"
    >
      Ajouter {{ definition.gender === 'Masculine' ? 'un' : 'une' }}
      {{ definition.nameSingular }}
    </a>
    <a
      *ngIf="definition.buttons.indexOf(LinkType.CREATE) > -1"
      class="button is-rounded is-link ml-5 is-hidden-desktop"
      routerLink="/{{ definition.path || definition.slug }}/create"
    >
      <i class="icon icon-plus"></i>
    </a>
    </ng-container>
  </div>
</div>

<!-- Filters -->
<section *ngIf="resolvedFilters && resolvedFilters.length">
  <div class="card p-4">
    <div class="columns">
      <div class="column">
        <h2 class="title is-6 has-text-weight-bold is-uppercase has-text-grey">Filtres</h2>
      </div>
    </div>
    <div class="columns is-multiline is-align-items-flex-end">
      <div
        class="column"
        [ngClass]="filter.className"
        *ngFor="let filter of resolvedFilters"
      >
        <case-input
          [type]="filter.inputType"
          [properties]="filter.properties"
          [initialValue]="filter.initialValue"
          [selectOptions]="filter.selectOptions"
          [label]="filter.label"
          [searchResources]="filter.searchResources"
          [placeholder]="filter.placeholder"
          (valueChanged)="onFilterValueChanged($event, filter)"
        ></case-input>
      </div>
    </div>
  </div>
</section>

<!-- List -->
<ng-container *ngIf="paginator">
  <div class="is-flex is-justify-content-space-between is-align-items-center relative">
    <case-meta [paginator]="paginator"></case-meta>

    <!-- Key numbers -->
    <div class="total total--alt is-hidden-mobile">
      <span
        class="badge mb-3"
        [ngClass]="keyNumber.className"
        *ngFor="let keyNumber of definition.keyNumbers"
      >
        <ng-container *ngIf="keyNumber.loading">Loading...</ng-container>
        <ng-container *ngIf="!keyNumber.loading"
          >{{ keyNumber.label }} : {{ keyNumber.value | euros }}</ng-container
        >
      </span>
    </div>
  </div>
  <div class="card p-0 mb-6">
    <div class="table-container">
      <case-table
        [items]="paginator.data"
        [definition]="definition"
        [yields]="yields"
        [orderBy]="orderBy"
        [orderByDesc]="orderByDesc"
        (orderByChanged)="onOrderByChanged($event)"
        (reloadPrompted)="reload()"
      ></case-table>
    </div>
  </div>

  <case-pagination
    [paginator]="paginator"
    (pageChange)="onPageChanged($event)"
  ></case-pagination>
</ng-container>

<div *ngIf="loading" class="list-loading pt-7">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div class="is-hidden-touch"></div>
  <div class="is-hidden-touch"></div>
  <div class="is-hidden-touch"></div>
  <div class="is-hidden-touch"></div>
  <div class="is-hidden-touch"></div>
  <div class="is-hidden-touch"></div>
  <div class="is-hidden-touch"></div>
</div>
`
