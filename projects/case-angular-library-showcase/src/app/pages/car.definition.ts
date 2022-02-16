import {
  ActionType,
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
  slug: 'users',
  path: 'voitures',
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
      }),
      withDivision: true
    },
    {
      label: 'test patch',
      action: () => ({
        type: ActionType.Patch,
        patch: {
          path: 'tesss',
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
      label: 'Edit name',
      action: (car) => ({
        type: ActionType.OpenCreateEditModal,
        openCreateEditModal: {
          title: `Change le nom rapidement de ${car.name}`,
          definition: carDefinition,
          mode: 'edit',
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
