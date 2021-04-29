import { Gender } from '../../enums/gender.enum'
import { LinkType } from '../../enums/link-type.enum'
import { YieldType } from '../../enums/yield-type.enum'
import { ResourceDefinition } from '../../interfaces/resource-definition.interface'

export const userDefinition: ResourceDefinition = {
  title: 'Collaborateurs',
  nameSingular: 'collaborateur',
  namePlural: 'collaborateurs',
  gender: Gender.Masculine,
  slug: 'users',
  path: 'users',
  hasDetailPage: true,
  hasListPage: true,
  buttons: [LinkType.CREATE],
  defaultLink: LinkType.DETAIL,
  childrenThatPreventDelete: [],
  dropdownLinks: [
    {
      type: LinkType.EDIT,
      permission: 'editUsers'
    },
    {
      type: LinkType.DELETE,
      permission: 'deleteUsers'
    }
  ]
}
