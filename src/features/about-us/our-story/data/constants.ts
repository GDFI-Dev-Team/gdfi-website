export const OVERVIEW_TEXT =
  'Guiuan Development Foundation, Inc. (GDFI) is a nonstock, non-profit, non-governmental organization committed to empowering coastal communities, protecting the environment, and conserving natural resources. We operate in 7 coastal municipalities in Eastern Samar, from Guiuan to Lawaan.'

export type HistoryMilestone = {
  id: string
  year: string
  title: string
  description: string
}

export const HISTORY_MILESTONES: HistoryMilestone[] = [
  {
    id: 'milestone-1',
    year: '1980s',
    title: 'A Call to Action',
    description:
      'During the 1980s, the coastal municipalities of southern Samar Island faced a severe ecological crisis. Rampant illegal practices, including dynamite and cyanide fishing, were rapidly depleting marine resources and threatening the livelihoods of the 40,000 residents who heavily depended on the sea. Driven by a deep concern for these vulnerable fishing communities, Prof. Margarita de la Torre - de la Cruz, then a faculty member at the University of the Philippines Visayas Tacloban College (UPVTC), took decisive action to organize a response.',
  },
  {
    id: 'milestone-2',
    year: '1988 – 1995',
    title: 'Founding and Fostering Community Stewardship',
    description:
      'On August 30, 1988, Prof. de la Cruz officially established the Guiuan Development Foundation, Inc. (GDFI) as a non-stock, non-profit organization dedicated to empowering coastal communities and conserving natural resources. Following its SEC registration in April 1989, GDFI launched its flagship program: Community-Based Coastal Resources Management (CBCRM).\n\nRecognizing that true resource stewardship requires broad, interconnected action, the CBCRM program expanded significantly in 1995. Originally operating in Guiuan, Mercedes, and Salcedo, it grew to include Quinapondan, Giporlos, Balangiga, and Lawaan. Together, these seven municipalities share the critical waters of the northern Leyte Gulf.',
  },
  {
    id: 'milestone-3',
    year: '2005',
    title: 'Institutionalizing Regional Resilience',
    description:
      'For 18 years, GDFI laid the groundwork through intensive community organizing, establishing marine sanctuaries, and promoting environmental education. In 2006, this grassroots empowerment evolved into structural policy when GDFI initiated the formation of the Alliance of Seven Municipalities for Integrated Coastal Zone Management (A7 for ICZM). This landmark alliance successfully engaged Local Government Units (LGUs) to take a major, collaborative role in protecting and managing their shared waters.',
  },
  {
    id: 'milestone-4',
    year: 'time',
    title: 'label',
    description: 'Some description...',
  },
  {
    id: 'milestone-5',
    year: 'time',
    title: 'label',
    description: 'Some description...',
  },
  {
    id: 'milestone-6',
    year: 'time',
    title: 'label',
    description: 'Some description...',
  },
]
