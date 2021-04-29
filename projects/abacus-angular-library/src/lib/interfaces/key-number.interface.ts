import { Subscription } from 'rxjs'

export interface KeyNumber {
  label: string
  className: string
  extraParams: { [key: string]: string }

  // Calculated.
  subscription?: Subscription
  loading?: boolean
  value?: number
}
