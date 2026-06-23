export const CASH_DONATION_DETAILS = {
  title: 'Cash Donations',
  description:
    'Your financial support directly funds our coastal resource management, livelihood programs, and environmental education initiatives.',
  bankDetails: [
    { label: 'Bank Name', value: 'Banco de Oro (BDO)' },
    {
      label: 'Bank Address',
      value:
        'P. Burgos St. cor. Real St., Justice Romualdez St., Tacloban City',
    },
    {
      label: 'Account Name',
      value: 'Guiuan Development Foundation, Inc.',
      isCopyable: true,
    },
    {
      label: 'Account Number',
      value: '002920154041',
      isMono: true,
      isCopyable: true,
    },
    { label: 'SWIFT Code', value: 'BNORPHMM', isMono: true, isCopyable: true },
  ],
  taxNote: {
    title: 'Tax-Deductible Donations',
    description:
      'Tax-deductible cash donations for GDFI may also be channeled through Heries Funds, Myriad USA. For details, please contact Brenda Doriano.',
    email: 'bmdoriano@yahoo.org',
  },
}

export const IN_KIND_DONATION_DETAILS = {
  title: 'In-Kind Donations',
  description:
    'We welcome equipment, supplies, and materials that can aid our field researchers, community organizers, and local fisherfolk.',
  shippingAddress: [
    'Guiuan Development Foundation, Inc.',
    'Guimbaolibot Avenue, Brgy. 10',
    'Guiuan, Eastern Samar',
    'Philippines',
    'Zip Code: 6809',
  ],
}
