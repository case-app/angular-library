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
      action: (i) => ({
        type: ActionType.Link,
        link: {
          path: '/create-edit',
          queryParams: {
            id: i.id,
            e: 'ets'
          }
        }
      })
    }
  ],
  dropdownLinks: [
    {
      label: 'Générer une facture avec division en haut',
      action: (i) => ({
        type: ActionType.Link,
        link: {
          path: '/create-edit',
          queryParams: {
            id: i.id,
            e: 'ets'
          }
        }
      })
    },
    {
      label: 'test patch',
      action: () => ({
        type: ActionType.Patch,
        patch: {
          resourceName: 'tesss',
          successMessage: 'orale',
          errorMessage: 'no mames'
        }
      })
    },
    {
      label: 'test delete',
      action: (car) => ({
        type: ActionType.Delete,
        delete: {
          itemToDelete: car,
          definition: this
        }
      })
    }
  ]
}
