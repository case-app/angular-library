export interface CaseConfig {
  baseUrl: string
  apiBaseUrl: string
  storagePath: string
  appName: string
  tokenName: string
  tokenAllowedDomains: string[]
  flashMessageTimeout?: number
  production?: boolean
}