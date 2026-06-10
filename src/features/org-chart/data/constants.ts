export type Personnel = {
  id: string
  name: string
  role: string
  image: string
  bio: string
}

const PLACEHOLDER_IMG = '/personnel/placeholder.webp'
const PLACEHOLDER_BIO =
  'Bio coming soon. This is a placeholder description that will be updated with the actual background, experience, and accomplishments of the team member.'

export const BOARD_OF_TRUSTEES: Personnel[] = [
  {
    id: 'mt-cruz',
    name: 'Margarita T. de la Cruz',
    role: 'President & Executive Director',
    image: PLACEHOLDER_IMG,
    bio: PLACEHOLDER_BIO,
  },
  {
    id: 'r-melquiades',
    name: 'Rectito Melquiades',
    role: 'Vice President',
    image: PLACEHOLDER_IMG,
    bio: PLACEHOLDER_BIO,
  },
  {
    id: 'c-abuda',
    name: 'Concesa Abuda',
    role: 'Secretary',
    image: PLACEHOLDER_IMG,
    bio: PLACEHOLDER_BIO,
  },
  {
    id: 'p-gonzales',
    name: 'Praxedes Gonzales',
    role: 'Treasurer',
    image: PLACEHOLDER_IMG,
    bio: PLACEHOLDER_BIO,
  },
  {
    id: 'j-salazar',
    name: 'Jaime Salazar',
    role: 'Member',
    image: PLACEHOLDER_IMG,
    bio: PLACEHOLDER_BIO,
  },
  {
    id: 'g-lucero-pelino',
    name: 'Gemma Lucero - Pelino',
    role: 'Member',
    image: PLACEHOLDER_IMG,
    bio: PLACEHOLDER_BIO,
  },
  {
    id: 'a-garado',
    name: 'Alipio Garado',
    role: 'Member',
    image: PLACEHOLDER_IMG,
    bio: PLACEHOLDER_BIO,
  },
  {
    id: 'l-lacaba',
    name: 'Leo Lacaba',
    role: 'Member',
    image: PLACEHOLDER_IMG,
    bio: PLACEHOLDER_BIO,
  },
]

export const ADMIN_AND_FINANCE: Personnel[] = [
  {
    id: 'i-naing',
    name: 'Imelda Naing',
    role: 'Cashier',
    image: PLACEHOLDER_IMG,
    bio: PLACEHOLDER_BIO,
  },
  {
    id: 's-bernardo',
    name: 'Shelly Bernardo',
    role: 'Admin & Finance Officer',
    image: PLACEHOLDER_IMG,
    bio: PLACEHOLDER_BIO,
  },
  {
    id: 'y-colinares',
    name: 'Yolanda Colinares',
    role: 'Admin Asst. & Bookkeeper',
    image: PLACEHOLDER_IMG,
    bio: PLACEHOLDER_BIO,
  },
]

export const PROJECT_COORDINATION: Personnel[] = [
  {
    id: 'j-laurente',
    name: 'Joyce Laurente',
    role: 'Project Officer',
    image: PLACEHOLDER_IMG,
    bio: PLACEHOLDER_BIO,
  },
  {
    id: 'j-bajas',
    name: 'Jenny Bajas',
    role: 'Project Officer',
    image: PLACEHOLDER_IMG,
    bio: PLACEHOLDER_BIO,
  },
  {
    id: 'l-abuda',
    name: 'Leo Abuda',
    role: 'Monitoring, Evaluation & Learning Officer',
    image: PLACEHOLDER_IMG,
    bio: PLACEHOLDER_BIO,
  },
  {
    id: 'm-pagatpatan',
    name: 'Maylyn Pagatpatan',
    role: 'Project Coordinator',
    image: PLACEHOLDER_IMG,
    bio: PLACEHOLDER_BIO,
  },
  {
    id: 'l-lama',
    name: 'Lorna Lama',
    role: 'Project Assistant',
    image: PLACEHOLDER_IMG,
    bio: PLACEHOLDER_BIO,
  },
  {
    id: 'd-nicart',
    name: 'Danica Nicart',
    role: 'Project Field Assistant',
    image: PLACEHOLDER_IMG,
    bio: PLACEHOLDER_BIO,
  },
  {
    id: 't-padit',
    name: 'Teresito Padit, Jr.',
    role: 'Field Assistant/Driver',
    image: PLACEHOLDER_IMG,
    bio: PLACEHOLDER_BIO,
  },
  {
    id: 'n-ramasta',
    name: 'Nicky Joy Ramasta',
    role: 'Training Assistant',
    image: PLACEHOLDER_IMG,
    bio: PLACEHOLDER_BIO,
  },
]

export const VOLUNTEERS: Personnel[] = [
  {
    id: 'm-lama',
    name: 'Mark Lama',
    role: 'GIS',
    image: PLACEHOLDER_IMG,
    bio: PLACEHOLDER_BIO,
  },
  {
    id: 'n-macalinga',
    name: 'Nart Trance Macalinga',
    role: 'GIS/Drone Technical Assistance',
    image: PLACEHOLDER_IMG,
    bio: PLACEHOLDER_BIO,
  },
  {
    id: 'b-samson',
    name: 'Brenda Gajelan-Samson',
    role: 'Biology and GIS',
    image: PLACEHOLDER_IMG,
    bio: PLACEHOLDER_BIO,
  },
  {
    id: 'j-villamor',
    name: 'Janine Villamor',
    role: 'Mangrove Assessment',
    image: PLACEHOLDER_IMG,
    bio: PLACEHOLDER_BIO,
  },
  {
    id: 'j-cabansag',
    name: 'Jerome Cabansag',
    role: 'Coral Assessment & Fish Visual Census',
    image: PLACEHOLDER_IMG,
    bio: PLACEHOLDER_BIO,
  },
  {
    id: 'v-romero',
    name: 'Victor Romero II',
    role: 'IT/Computer Science',
    image: PLACEHOLDER_IMG,
    bio: PLACEHOLDER_BIO,
  },
  {
    id: 'j-yusiong',
    name: 'John Paul T. Yusiong',
    role: 'IT/Computer Science',
    image: PLACEHOLDER_IMG,
    bio: PLACEHOLDER_BIO,
  },
  {
    id: 'j-aliposa',
    name: 'Jericho Aliposa',
    role: 'Communication/Films',
    image: PLACEHOLDER_IMG,
    bio: PLACEHOLDER_BIO,
  },
  {
    id: 'r-samson',
    name: 'Rhonel Samson',
    role: 'Radio/Communication',
    image: PLACEHOLDER_IMG,
    bio: PLACEHOLDER_BIO,
  },
]
