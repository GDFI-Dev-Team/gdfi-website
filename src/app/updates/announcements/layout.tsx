export default function AnnouncementsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="flex-1 flex flex-col bg-foreground/0.02">{children}</main>
  )
}
