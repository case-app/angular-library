import { Gender } from '../../enums/gender.enum'
import { LinkType } from '../../enums/link-type.enum'
import { ResourceDefinition } from '../../interfaces/resource-definition.interface'

export const roleDefinition: ResourceDefinition = {
  title: 'Rôles',
  nameSingular: 'rôle',
  namePlural: 'rôles',
  gender: Gender.Masculine,
  mainIdentifier: 'displayName',
  slug: 'roles',
  hasDetailPage: false,
  hasListPage: true,
  buttons: [LinkType.CREATE],
  defaultLink: LinkType.EDIT,
  dropdownLinks: [
    {
      type: LinkType.EDIT,
      permission: 'editRoles'
    },
    {
      type: LinkType.DELETE,
      permission: 'deleteRoles'
    }
  ]
}
