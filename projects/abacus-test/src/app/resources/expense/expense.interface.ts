export interface Expense {
  id: number
  name: string
  reference: string
  date: string
  comments: string
  attachment: string
  amount: number
  billableToCustomer: boolean
  project: any
}
