import { Gender } from '../../../../../abacus-angular-library/src/lib/enums/gender.enum'
import { LinkType } from '../../../../../abacus-angular-library/src/lib/enums/link-type.enum'
import { ResourceDefinition } from '../../../../../abacus-angular-library/src/lib/interfaces/resource-definition.interface'

export const expenseDefinition: ResourceDefinition = {
  title: 'Frais',
  mainIdentifier: 'id',
  nameSingular: 'frais',
  namePlural: 'frais',
  gender: Gender.Masculine,
  slug: 'expenses',
  path: 'frais',
  hasDetailPage: false,
  hasListPage: false,
  buttons: [],
  defaultLink: null,
  dropdownLinks: [
    {
      type: LinkType.EDIT,
      permission: 'editExpenses'
    },
    {
      type: LinkType.DELETE,
      permission: 'deleteExpenses'
    }
  ]
}
