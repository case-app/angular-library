import { Gender } from '../../../../../abacus/src/lib/enums/gender.enum'
import { LinkType } from '../../../../../abacus/src/lib/enums/link-type.enum'
import { YieldType } from '../../../../../abacus/src/lib/enums/yield-type.enum'
import { ResourceDefinition } from '../../../../../abacus/src/lib/interfaces/resource-definition.interface'

export const expenseDefinition: ResourceDefinition = {
  title: 'Frais',
  nameSingular: 'frais',
  namePlural: 'frais',
  gender: Gender.Masculine,
  slug: 'expenses',
  path: 'frais',
  hasDetailPage: false,
  hasListPage: false,
  buttons: [],
  defaultLink: null,
  dropdownLinks: [
    {
      type: LinkType.EDIT,
      permission: 'editExpenses'
    },
    {
      type: LinkType.DELETE,
      permission: 'deleteExpenses'
    }
  ],
  yields: [
    {
      label: 'Libellé',
      property: 'name'
    },
    {
      label: 'Référence',
      property: 'reference'
    },
    {
      label: 'Refacturé',
      property: 'invoice.number'
    },
    {
      label: `Date d'achat`,
      property: 'date',
      type: YieldType.Date
    },
    {
      label: `Paiement`,
      property: 'paymentDate',
      type: YieldType.Date
    },
    {
      label: `Montant HT`,
      property: 'amount',
      type: YieldType.Currency
    },
    {
      label: 'Commentaire',
      property: 'comments'
    },
    {
      label: 'Reçu',
      property: 'attachment',
      type: YieldType.Download
    }
  ]
}
