/*  Source - https://stackoverflow.com/q/78099865
    Utility for opening a PDF in a new tab
*/
export function downloadPDF(url: string) {
  const link = document.createElement('a')
  link.href = url
  link.target = '_blank'
  link.rel = 'noopener noreferrer'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
