export const abcListTemplate = `
<!-- Heading -->
<div class="flex flex-mobile space-between align-center m-b-gutter">
  <div class="left-part">
    <h1 class="title is-2 is-light">
      {{ definition.title }}
    </h1>
  </div>
  <div class="right-part">
    <!-- Export button -->
    <a
      *ngIf="definition.buttons.indexOf(LinkType.EXPORT) > -1"
      class="button is-link m-l-gutter is-hidden-touch"
      routerLink="/{{ definition.path || definition.slug }}"
      [queryParams]="{ toXLS: 'true' }"
      queryParamsHandling="merge"
    >
      Exporter
    </a>
    <!-- Create button -->
    <a
      *ngIf="definition.buttons.indexOf(LinkType.CREATE) > -1"
      class="button is-primary m-l-gutter is-hidden-touch"
      routerLink="/{{ definition.path || definition.slug }}/create"
    >
      Ajouter {{ definition.gender === 'Masculine' ? 'un' : 'une' }}
      {{ definition.nameSingular }}
    </a>
    <a
      *ngIf="definition.buttons.indexOf(LinkType.CREATE) > -1"
      class="button is-rounded is-primary m-l-gutter is-hidden-desktop"
      routerLink="/{{ definition.path || definition.slug }}/create"
    >
      <i class="icon icon-plus"></i>
    </a>
  </div>
</div>

<!-- Filters -->
<section *ngIf="resolvedFilters && resolvedFilters.length">
  <div class="card">
    <div class="columns">
      <div class="column">
        <h2 class="title is-6 is-bold is-uppercase text-is-grey">Filtres</h2>
      </div>
    </div>
    <div class="columns flex flex-wrap">
      <div
        class="column"
        [ngClass]="filter.className"
        *ngFor="let filter of resolvedFilters"
      >
        <abc-input
          [type]="filter.inputType"
          [properties]="filter.properties"
          [initialValue]="filter.initialValue"
          [selectOptions]="filter.selectOptions"
          [label]="filter.label"
          [searchResources]="filter.searchResources"
          [placeholder]="filter.placeholder"
          (valueChanged)="onFilterValueChanged($event, filter)"
        ></abc-input>
      </div>
    </div>
  </div>
</section>

<!-- List -->
<ng-container *ngIf="paginator">
  <div class="flex space-between align-center relative">
    <abc-meta [paginator]="paginator"></abc-meta>

    <!-- Key numbers -->
    <div class="total total--alt is-hidden-mobile">
      <span
        class="badge m-b-md m-t-lg"
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
  <div class="card p-a-0 has-table m-b-lg">
    <div class="table-responsive">
      <abc-table
        [items]="paginator.data"
        [definition]="definition"
        [yields]="yields"
        [orderBy]="orderBy"
        [orderByDesc]="orderByDesc"
        (orderByChanged)="onOrderByChanged($event)"
        (reloadPrompted)="reload()"
      ></abc-table>
    </div>
  </div>

  <abc-pagination
    [paginator]="paginator"
    (pageChange)="onPageChanged($event)"
  ></abc-pagination>
</ng-container>

<div *ngIf="loading" class="list-loading p-t-xl">
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
