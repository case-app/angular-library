import { Gender } from '../../enums/gender.enum'
import { LinkType } from '../../enums/link-type.enum'
import { ResourceDefinition } from '../../interfaces/resource-definition.interface'

export const userDefinition: ResourceDefinition = {
  title: 'Collaborateurs',
  nameSingular: 'collaborateur',
  namePlural: 'collaborateurs',
  gender: Gender.Masculine,
  mainIdentifier: 'name',
  slug: 'users',
  path: 'users',
  hasDetailPage: false,
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
