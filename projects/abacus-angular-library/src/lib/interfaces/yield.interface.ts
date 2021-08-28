import { YieldType } from '../enums/yield-type.enum'

export interface Yield {
  // Label that will be shown on UI.
  label: string

  // Displays a tooltip on mouseover.
  tooltip?: string

  // Object property name.
  property: string

  // Secondary property name (some OutputType like Image require more than one output)
  secondProperty?: any
  thirdProperty?: string
  forthProperty?: string

  // Custom link on click.
  link?: string | ((item: any) => string)

  // Disables possibility to order by this prop. Useful when sorting for this prop does not make sense or is a calculated prop.
  disableOrderBy?: boolean

  // Property to be ordered by. If not specified, "property" is used
  orderByProperty?: string

  // Output type for display (default YieldType.Text)
  type?: YieldType

  // Column width in pixels or in percentage when displayed in a table. Ex: 120, '10%'.
  width?: number | string

  // Class of the yield
  className?: string

  // Calculated
  propertyValue?: string
  secondPropertyValue?: string
  thirdPropertyValue?: string
  forthPropertyValue?: string
}
