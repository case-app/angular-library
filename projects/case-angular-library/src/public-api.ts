/*
 * Public API Surface of CASE
 */

export * from './lib/case.module'

// Guards.
export { AuthGuard } from './lib/guards/auth.guard'
export { PermissionGuard } from './lib/guards/permission.guard'

// Pipes.
export { EurosPipe } from './lib/pipes/euros.pipe'
export { StripHtmlPipe } from './lib/pipes/strip-html.pipe'
export { TruncatePipe } from './lib/pipes/truncate.pipe'

// Enums
export { FileMime } from './lib/enums/file-mime.enum'
export { Gender } from './lib/enums/gender.enum'
export { ImageSize } from './lib/enums/image-size.enum'
export { InputType } from './lib/enums/input-type.enum'
export { LinkType } from './lib/enums/link-type.enum'
export { YieldType } from './lib/enums/yield-type.enum'

// Interfaces
export { CaseConfig } from './lib/interfaces/case-config.interface'
export { CaseInput } from './lib/interfaces/case-input.interface'
export { ActionButton } from './lib/interfaces/action-button.interface'
export { AddressObject } from './lib/interfaces/address-object.interface'
export { BreadcrumbLink } from './lib/interfaces/breadcrumb-link.interface'
export { DropdownAction } from './lib/interfaces/dropdown-action.interface'
export { FieldSpecialRule } from './lib/interfaces/field-special-rule.interface'
export { Field } from './lib/interfaces/field.interface'
export { Filter } from './lib/interfaces/filter.interface'
export { HTMLInputEvent } from './lib/interfaces/html-input-event.interface'
export { KeyNumber } from './lib/interfaces/key-number.interface'
export { MetaObject } from './lib/interfaces/meta-object.interface'
export { OrderByChangedEvent } from './lib/interfaces/order-by-changed-event.interface'
export { Paginator } from './lib/interfaces/paginator.interface'
export { ResourceDefinition } from './lib/interfaces/resource-definition.interface'
export { SearchResult } from './lib/interfaces/search-result.interface'
export { SelectOption } from './lib/interfaces/select-option.interface'
export { Yield } from './lib/interfaces/yield.interface'
export { Notification } from './lib/interfaces/resources/notification.interface'
export { Permission } from './lib/interfaces/resources/permission.interface'
export { Role } from './lib/interfaces/resources/role.interface'
export { User } from './lib/interfaces/resources/user.interface'
export { MenuItem } from './lib/interfaces/menu-item.interface'

// Directives.
export { HasPermissionDirective } from './lib/directives/has-permission.directive'

// Services.
export { AuthService } from './lib/services/auth.service'
export { BreadcrumbService } from './lib/services/breadcrumb.service'
export { EventService } from './lib/services/event.service'
export { FlashMessageService } from './lib/services/flash-message.service'
export { MetaService } from './lib/services/meta.service'
export { ResourceService } from './lib/services/resource.service'
export { UploadService } from './lib/services/upload.service'
export { VersionService } from './lib/services/version.service'
export { ViewportService } from './lib/services/viewport.service'

// Components.
export { CaseCreateEditComponent } from './lib/components/case-create-edit.component'
export { CaseListComponent } from './lib/components/case-list.component'
export { CaseDetailComponent } from './lib/components/case-detail.component'
export { CaseChartComponent } from './lib/components/case-chart.component'
export { CaseDatepickerComponent } from './lib/components/case-datepicker.component'

// Elements: Inputs.
export { CaseInputComponent } from './lib/elements/inputs/case-input/case-input.component'
export { CheckboxInputComponent } from './lib/elements/inputs/checkbox-input/checkbox-input.component'
export { ColorPickerInputComponent } from './lib/elements/inputs/color-picker-input/color-picker-input.component'
export { DateRangeInputComponent } from './lib/elements/inputs/date-range-input/date-range-input.component'
export { DatepickerInputComponent } from './lib/elements/inputs/datepicker-input/datepicker-input.component'
export { EmailInputComponent } from './lib/elements/inputs/email-input/email-input.component'
export { FileInputComponent } from './lib/elements/inputs/file-input/file-input.component'
export { ImageInputComponent } from './lib/elements/inputs/image-input/image-input.component'
export { MultiSearchInputComponent } from './lib/elements/inputs/multi-search-input/multi-search-input.component'
export { MultiSelectInputComponent } from './lib/elements/inputs/multi-select-input/multi-select-input.component'
export { NumberInputComponent } from './lib/elements/inputs/number-input/number-input.component'
export { PasswordInputComponent } from './lib/elements/inputs/password-input/password-input.component'
export { RadioInputComponent } from './lib/elements/inputs/radio-input/radio-input.component'
export { RichTextInputComponent } from './lib/elements/inputs/rich-text-input/rich-text-input.component'
export { SelectInputComponent } from './lib/elements/inputs/select-input/select-input.component'
export { TelInputComponent } from './lib/elements/inputs/tel-input/tel-input.component'
export { TextInputComponent } from './lib/elements/inputs/text-input/text-input.component'
export { TextareaInputComponent } from './lib/elements/inputs/textarea-input/textarea-input.component'
export { TimeInputComponent } from './lib/elements/inputs/time-input/time-input.component'
export { ToggleInputComponent } from './lib/elements/inputs/toggle-input/toggle-input.component'

// Elements: Navigation.
export { SideMenuComponent } from './lib/elements/navigation/side-menu/side-menu.component'
export { TopMenuComponent } from './lib/elements/navigation/top-menu/top-menu.component'
export { TouchMenuComponent } from './lib/elements/navigation/touch-menu/touch-menu.component'

// Elements: Partials.
export { ActionDropdownComponent } from './lib/elements/partials/action-dropdown/action-dropdown.component'
export { BreadcrumbsComponent } from './lib/elements/partials/breadcrumbs/breadcrumbs.component'
export { ConfirmDeleteModalComponent } from './lib/elements/partials/confirm-delete-modal/confirm-delete-modal.component'
export { FlashMessageComponent } from './lib/elements/partials/flash-message/flash-message.component'
export { ImageComponent } from './lib/elements/partials/image/image.component'
export { MetaComponent } from './lib/elements/partials/meta/meta.component'
export { PaginationComponent } from './lib/elements/partials/pagination/pagination.component'
export { TableComponent } from './lib/elements/partials/table/table.component'

// Elements: Yields.
export { AddressYieldComponent } from './lib/elements/yields/address-yield/address-yield.component'
export { AnalogProgressBarYieldComponent } from './lib/elements/yields/analog-progress-bar-yield/analog-progress-bar-yield.component'
export { ColorYieldComponent } from './lib/elements/yields/color-yield/color-yield.component'
export { CurrencyYieldComponent } from './lib/elements/yields/currency-yield/currency-yield.component'
export { DateYieldComponent } from './lib/elements/yields/date-yield/date-yield.component'
export { DownloadYieldComponent } from './lib/elements/yields/download-yield/download-yield.component'
export { FileIconYieldComponent } from './lib/elements/yields/file-icon-yield/file-icon-yield.component'
export { ImageYieldComponent } from './lib/elements/yields/image-yield/image-yield.component'
export { ProgressBarYieldComponent } from './lib/elements/yields/progress-bar-yield/progress-bar-yield.component'
export { NumberYieldComponent } from './lib/elements/yields/number-yield/number-yield.component'

// Pages.
export { ForgotPasswordComponent } from './lib/pages/auth/forgot-password/forgot-password.component'
export { LoginComponent } from './lib/pages/auth/login/login.component'
export { LogoutComponent } from './lib/pages/auth/logout/logout.component'
export { ResetPasswordComponent } from './lib/pages/auth/reset-password/reset-password.component'
export { Error404Component } from './lib/pages/error404/error404.component'
export { HomeComponent } from './lib/pages/home/home.component'

// Default resources.
export { UserListComponent } from './lib/resources/user/user-list.component'
export { UserCreateEditComponent } from './lib/resources/user/user-create-edit.component'
export { RoleListComponent } from './lib/resources/role/role-list/role-list.component'
export { RoleCreateEditComponent } from './lib/resources/role/role-create-edit/role-create-edit.component'

// Templates.
export { caseCreateEditTemplate } from './lib/templates/case-create-edit.template'
export { caseCreateEditModalTemplate } from './lib/templates/case-create-edit-modal.template'
export { caseListTemplate } from './lib/templates/case-list.template'

// Other.
export { caseConstants } from './lib/constants/case.constants'
export { caseRoutes } from './lib/routes/case.routes'
