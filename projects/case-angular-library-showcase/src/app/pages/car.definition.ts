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
  dropdownLinks: []
}
