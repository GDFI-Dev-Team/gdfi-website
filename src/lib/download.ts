// Source - https://stackoverflow.com/q/78099865
export function downloadPDF(url: string, filename?: string) {
  const link = document.createElement('a')
  link.href = url
  link.download = filename ?? 'download.pdf'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
