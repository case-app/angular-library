import {
  Gender,
  LinkType,
  ResourceDefinition
} from '../../../../case-angular-library/src/public-api'

export const carDefinition: ResourceDefinition = {
  title: 'Cars',
  nameSingular: 'car',
  namePlural: 'cars',
  gender: Gender.Feminine,
  slug: 'cars',
  buttons: [],
  defaultLink: LinkType.CREATE,
  mainIdentifier: 'id',
  dropdownLinks: []
}
