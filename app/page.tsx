import { Heading } from './components/ui/heading'
import { Text } from './components/ui/text'

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 sm:items-start">
        <Heading level={1}>Hello, world from GDFI website.</Heading>
        <Heading level={2}>Alright, thanks!</Heading>
        <Heading level={3}>Come back again...</Heading>
        <Text>A heading under text</Text>
      </main>
    </div>
  )
}
