type Partner = {
  name: string
  file: string
  link?: string
}

export type Award = {
  name: string
  file: string
  description: string
  link?: string
}

export const partners: Partner[] = [
  {
    name: 'Australian Centre for International Agricultural Research',
    file: 'ACIAR',
    link: 'https://www.aciar.gov.au/',
  },
  { name: 'Give2Asia', file: 'G2A', link: 'https://give2asia.org/' },
  {
    name: 'BFAR VIII-NFRDI-GMFDC',
    file: 'BFAR',
    link: 'https://region8.bfar.da.gov.ph/',
  },
  {
    name: 'University of the Philippines Tacloban',
    file: 'UPTAC',
    link: 'https://www.uptacloban.edu.ph/',
  },
  {
    name: 'Juan and Isabel Zapanta Foundation, Inc.',
    file: 'JIZF',
    link: 'https://www.facebook.com/jizfoundation/',
  },
  {
    name: 'A7 for ICZM',
    file: 'A7',
    link: 'https://www.google.com/search?q=A7+for+ICZM',
  },
  {
    name: 'Environmental Defense Fund',
    file: 'EDF',
    link: 'https://www.edf.org/',
  },
  {
    name: 'Department of Environment and Natural Resources - Guiuan Marine Reserve Protected Landscape and Seascape',
    file: 'DENR',
    link: 'https://www.google.com/search?q=Department+of+Environment+and+Natural+Resources+-+Guiuan+Marine+Reserve+Protected+Landscape+and+Seascape',
  },
  {
    name: 'Institute for Climate and Sustainable Cities',
    file: 'ICSC',
    link: 'https://icsc.ngo/',
  },
  { name: 'RARE, INC.', file: 'RARE', link: 'https://rare.org/' },
]

export const awards: Award[] = [
  {
    name: 'Champion of the Sea Awards',
    file: 'award',
    description: `Initiated during GDFI's 35th anniversary, this major institutional recognition honors grassroots local leaders, fishers, and advocates for outstanding commitment to locally led climate action and marine biodiversity conservation.`,
  },
  {
    name: 'LGU Salcedo Institutional Recognition (2018)',
    file: 'award',
    description: `GDFI was formally recognized by the Local Government Unit of Salcedo, Eastern Samar, for its unwavering support as a vital partner in providing basic services and driving sustainable development goals for local communities.`,
  },
  {
    name: 'Best Managed MPA Competition Prizes',
    file: 'award',
    description: `Through long-standing coastal management advocacy, multiple Marine Protected Areas (MPAs) trained and supported by GDFI have consistently won top prizes and recognition during the annual regional Fisherfolk Day celebrations.`,
  },
  {
    name: '3rd Prize – Regional Booth Competition (2018)',
    file: 'award',
    description: `GDFI's community partners won third prize in a regional exhibition, highlighting zero-waste management and sustainability by creating innovative eco-friendly packaging from recycled materials.`,
  },
  {
    name: 'Global Development Aid of the Year Award Shortlist (2019)',
    file: 'award',
    description: `GDFI's Executive Director, Margarita Dela Cruz, and the foundation's climate-resilient initiatives have been globally cited by international bodies like the Global Environment Facility (GEF) for pioneering framework models in disaster recovery and community coastal preservation.`,
  },
]
