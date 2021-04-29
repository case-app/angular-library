import { YieldType } from '../../enums/yield-type.enum'
import { Yield } from '../../interfaces/yield.interface'

export const userYields: Yield[] = [
  {
    label: 'Utilisateur',
    property: 'imageObjects',
    secondProperty: 'name',
    orderByProperty: 'name',
    type: YieldType.Image
  },
  {
    label: 'Rôle',
    property: 'role.displayName'
  },
  {
    label: 'Profil',
    property: 'position.name'
  }
]
