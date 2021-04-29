import { CommonModule, registerLocaleData } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import localeFr from '@angular/common/locales/fr'
import { ModuleWithProviders, NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule } from '@angular/router'
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt'
import { CKEditorModule } from '@ckeditor/ckeditor5-angular'
import { CalendarModule, DateAdapter } from 'angular-calendar'
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns'
import { AngularGooglePlaceModule } from 'angular-google-place'
import { AngularMyDatePickerModule } from 'angular-mydatepicker'
import { ChartsModule } from 'ng2-charts'

import { AbcChartComponent } from './components/abc-chart.component'
import { AbcCreateEditComponent } from './components/abc-create-edit.component'
import { AbcDatepickerComponent } from './components/abc-datepicker.component'
import { AbcListComponent } from './components/abc-list.component'
import { HasPermissionDirective } from './directives/has-permission.directive'
import { AbcInputComponent } from './elements/inputs/abc-input/abc-input.component'
import { CheckboxInputComponent } from './elements/inputs/checkbox-input/checkbox-input.component'
import { ColorPickerInputComponent } from './elements/inputs/color-picker-input/color-picker-input.component'
import { DateRangeInputComponent } from './elements/inputs/date-range-input/date-range-input.component'
import { DatepickerInputComponent } from './elements/inputs/datepicker-input/datepicker-input.component'
import { EmailInputComponent } from './elements/inputs/email-input/email-input.component'
import { FileInputComponent } from './elements/inputs/file-input/file-input.component'
import { GooglePlacesInputComponent } from './elements/inputs/google-places-input/google-places-input.component'
import { ImageInputComponent } from './elements/inputs/image-input/image-input.component'
import { MultiSearchInputComponent } from './elements/inputs/multi-search-input/multi-search-input.component'
import { MultiSelectInputComponent } from './elements/inputs/multi-select-input/multi-select-input.component'
import { NumberInputComponent } from './elements/inputs/number-input/number-input.component'
import { PasswordInputComponent } from './elements/inputs/password-input/password-input.component'
import { RadioInputComponent } from './elements/inputs/radio-input/radio-input.component'
import { RichTextInputComponent } from './elements/inputs/rich-text-input/rich-text-input.component'
import { SelectInputComponent } from './elements/inputs/select-input/select-input.component'
import { TelInputComponent } from './elements/inputs/tel-input/tel-input.component'
import { TextInputComponent } from './elements/inputs/text-input/text-input.component'
import { TextareaInputComponent } from './elements/inputs/textarea-input/textarea-input.component'
import { TimeInputComponent } from './elements/inputs/time-input/time-input.component'
import { ToggleInputComponent } from './elements/inputs/toggle-input/toggle-input.component'
import { SideMenuComponent } from './elements/navigation/side-menu/side-menu.component'
import { TopMenuComponent } from './elements/navigation/top-menu/top-menu.component'
import { TouchMenuComponent } from './elements/navigation/touch-menu/touch-menu.component'
import { ActionDropdownComponent } from './elements/partials/action-dropdown/action-dropdown.component'
import { BreadcrumbsComponent } from './elements/partials/breadcrumbs/breadcrumbs.component'
import { ConfirmDeleteModalComponent } from './elements/partials/confirm-delete-modal/confirm-delete-modal.component'
import { FlashMessageComponent } from './elements/partials/flash-message/flash-message.component'
import { ImageComponent } from './elements/partials/image/image.component'
import { MetaComponent } from './elements/partials/meta/meta.component'
import { PaginationComponent } from './elements/partials/pagination/pagination.component'
import { TableComponent } from './elements/partials/table/table.component'
import { AddressYieldComponent } from './elements/yields/address-yield/address-yield.component'
import { AnalogProgressBarYieldComponent } from './elements/yields/analog-progress-bar-yield/analog-progress-bar-yield.component'
import { ColorYieldComponent } from './elements/yields/color-yield/color-yield.component'
import { CurrencyYieldComponent } from './elements/yields/currency-yield/currency-yield.component'
import { DateYieldComponent } from './elements/yields/date-yield/date-yield.component'
import { DownloadYieldComponent } from './elements/yields/download-yield/download-yield.component'
import { FileIconYieldComponent } from './elements/yields/file-icon-yield/file-icon-yield.component'
import { ImageYieldComponent } from './elements/yields/image-yield/image-yield.component'
import { ProgressBarYieldComponent } from './elements/yields/progress-bar-yield/progress-bar-yield.component'
import { AbacusConfig } from './interfaces/abacus-config.interface'
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component'
import { LoginComponent } from './pages/auth/login/login.component'
import { LogoutComponent } from './pages/auth/logout/logout.component'
import { ResetPasswordComponent } from './pages/auth/reset-password/reset-password.component'
import { Error404Component } from './pages/error404/error404.component'
import { HomeComponent } from './pages/home/home.component'
import { EurosPipe } from './pipes/euros.pipe'
import { StripHtmlPipe } from './pipes/strip-html.pipe'
import { TruncatePipe } from './pipes/truncate.pipe'
import { AuthService } from './services/auth.service'
import { BreadcrumbService } from './services/breadcrumb.service'
import { EventService } from './services/event.service'
import { FlashMessageService } from './services/flash-message.service'
import { MetaService } from './services/meta.service'
import { ResourceService } from './services/resource.service'
import { UploadService } from './services/upload.service'
import { VersionService } from './services/version.service'
import { ViewportService } from './services/viewport.service'
import { UserListComponent } from './resources/user/user-list.component'
import { UserCreateEditComponent } from './resources/user/user-create-edit.component'
import { RoleCreateEditComponent } from './resources/role/role-create-edit/role-create-edit.component'
import { RoleListComponent } from './resources/role/role-list/role-list.component'

// Register locale data
registerLocaleData(localeFr, 'fr')

export function jwtOptionsFactory(authService: AuthService) {
  // Prevent making a Lambda function because not allowed : https://github.com/ng-packagr/ng-packagr/issues/696.
  let i = 1
  return {
    tokenGetter: function () {
      return authService.getToken()
    },
    allowedDomains: authService.tokenAllowedDomains
  }
}

@NgModule({
  declarations: [
    // Pipes.
    EurosPipe,
    StripHtmlPipe,
    TruncatePipe,

    // Directives.
    HasPermissionDirective,

    // Components.
    AbcCreateEditComponent,
    AbcListComponent,
    AbcCreateEditComponent,
    AbcChartComponent,
    AbcDatepickerComponent,

    // Elements: Inputs
    AbcInputComponent,
    CheckboxInputComponent,
    ColorPickerInputComponent,
    DateRangeInputComponent,
    DatepickerInputComponent,
    EmailInputComponent,
    FileInputComponent,
    GooglePlacesInputComponent,
    ImageInputComponent,
    MultiSearchInputComponent,
    MultiSelectInputComponent,
    NumberInputComponent,
    PasswordInputComponent,
    RadioInputComponent,
    RichTextInputComponent,
    SelectInputComponent,
    TelInputComponent,
    TextInputComponent,
    TextareaInputComponent,
    TimeInputComponent,
    ToggleInputComponent,

    // Elements: Navigation.
    SideMenuComponent,
    TopMenuComponent,
    TouchMenuComponent,

    // Elements: Partials.
    ActionDropdownComponent,
    BreadcrumbsComponent,
    ConfirmDeleteModalComponent,
    FlashMessageComponent,
    ImageComponent,
    MetaComponent,
    PaginationComponent,
    TableComponent,

    // Elements: Yields.
    AddressYieldComponent,
    AnalogProgressBarYieldComponent,
    ColorYieldComponent,
    CurrencyYieldComponent,
    DateYieldComponent,
    DownloadYieldComponent,
    FileIconYieldComponent,
    ImageYieldComponent,
    ProgressBarYieldComponent,

    // Pages.
    ForgotPasswordComponent,
    LoginComponent,
    LogoutComponent,
    ResetPasswordComponent,
    Error404Component,
    HomeComponent,

    // Default resources.
    UserListComponent,
    UserCreateEditComponent,
    RoleCreateEditComponent,
    RoleListComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularGooglePlaceModule,
    AngularMyDatePickerModule,
    CKEditorModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [AuthService]
      }
    }),
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    ChartsModule,
    RouterModule
  ],
  exports: [
    // Pipes.
    EurosPipe,
    StripHtmlPipe,
    TruncatePipe,

    // Directives.
    HasPermissionDirective,

    // Components.
    AbcCreateEditComponent,
    AbcListComponent,
    AbcCreateEditComponent,
    AbcChartComponent,
    AbcDatepickerComponent,

    // Elements: Inputs
    AbcInputComponent,
    CheckboxInputComponent,
    ColorPickerInputComponent,
    DateRangeInputComponent,
    DatepickerInputComponent,
    EmailInputComponent,
    FileInputComponent,
    GooglePlacesInputComponent,
    ImageInputComponent,
    MultiSearchInputComponent,
    MultiSelectInputComponent,
    NumberInputComponent,
    PasswordInputComponent,
    RadioInputComponent,
    RichTextInputComponent,
    SelectInputComponent,
    TelInputComponent,
    TextInputComponent,
    TextareaInputComponent,
    TimeInputComponent,
    ToggleInputComponent,

    // Elements: Navigation.
    SideMenuComponent,
    TopMenuComponent,
    TouchMenuComponent,

    // Elements: Partials.
    ActionDropdownComponent,
    BreadcrumbsComponent,
    ConfirmDeleteModalComponent,
    FlashMessageComponent,
    ImageComponent,
    MetaComponent,
    PaginationComponent,
    TableComponent,

    // Elements: Yields.
    AddressYieldComponent,
    AnalogProgressBarYieldComponent,
    ColorYieldComponent,
    CurrencyYieldComponent,
    DateYieldComponent,
    DownloadYieldComponent,
    FileIconYieldComponent,
    ImageYieldComponent,
    ProgressBarYieldComponent,

    // Pages.
    ForgotPasswordComponent,
    LoginComponent,
    LogoutComponent,
    ResetPasswordComponent,
    Error404Component,
    HomeComponent
  ]
})
export class AbacusModule {
  static forRoot(
    configuration: AbacusConfig
  ): ModuleWithProviders<AbacusModule> {
    return {
      ngModule: AbacusModule,
      providers: [
        AuthService,
        BreadcrumbService,
        EventService,
        FlashMessageService,
        MetaService,
        ResourceService,
        UploadService,
        VersionService,
        ViewportService,
        { provide: 'ABACUS_CONFIG_TOKEN', useValue: configuration }
      ]
    }
  }
}
