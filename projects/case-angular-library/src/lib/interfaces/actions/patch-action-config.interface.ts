export interface PatchActionConfig {
  resourceName: string
  successMessage: string
  errorMessage: string
  id?: number | string
  suffix?: string
  formData?: FormData
}
