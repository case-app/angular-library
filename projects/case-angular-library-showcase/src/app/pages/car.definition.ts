import { ActionType } from '../../../../case-angular-library/src/lib/enums/action-type.enum'
import {
  Gender,
  InputType,
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
  slug: 'types',
  buttons: [],
  defaultLink: LinkType.CREATE,
  mainIdentifier: 'name',
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
          definition: carDefinition,
          navigateTo: '/'
        }
      })
    },
    {
      label: 'test open CEM',
      action: (car) => ({
        type: ActionType.OpenCreateEditModal,
        openCreateEditModal: {
          title: 'Edit an email',
          definition: carDefinition,
          mode: 'create',
          fields: [
            {
              label: 'name',
              property: 'name',
              className: 'is-3',
              inputType: InputType.Text,
              required: true
            }
          ]
        }
      })
    }
  ]
}
