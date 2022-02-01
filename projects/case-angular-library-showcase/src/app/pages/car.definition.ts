import { ActionType } from '../../../../case-angular-library/src/lib/enums/action-type.enum'
import {
  Gender,
  LinkType,
  ResourceDefinition
} from '../../../../case-angular-library/src/public-api'

export const carDefinition: ResourceDefinition = {
  title: 'Cars',
  nameSingular: 'car',
  namePlural: 'cars',
  className: 'Car',
  icon: 'icon-file-text',
  gender: Gender.Feminine,
  slug: 'cars',
  buttons: [],
  defaultLink: LinkType.CREATE,
  mainIdentifier: 'id',
  actionButtons: [
    {
      label: '',
      icon: 'icon-file-text',
      action: () => ({
        type: ActionType.Link,
        link: {
          path: '/create-edit'
        }
      })
    }
  ],
  dropdownLinks: [
    {
      label: 'Générer une facture avec division en haut',
      action: () => ({
        type: ActionType.Link,
        link: {
          path: '/create-edit'
        }
      })
    }
  ]
}
