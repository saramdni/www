import type { ColorMode } from '@/lib/theme'

export interface ResumePdfAsset {
  href: string
  downloadName: string
}

/** Theme-matched resume assets in /public/resume */
export function getResumePdf(mode: ColorMode): ResumePdfAsset {
  if (mode === 'dark') {
    return {
      href: '/resume/dark.pdf',
      downloadName: 'Sara-Madani-Resume-Dark.pdf',
    }
  }
  return {
    href: '/resume/light.pdf',
    downloadName: 'Sara-Madani-Resume.pdf',
  }
}

export function getResumeHtmlHref(mode: ColorMode): string {
  return mode === 'dark' ? '/resume/dark.html' : '/resume/light.html'
}

export function downloadResumePdf(mode: ColorMode) {
  const { href, downloadName } = getResumePdf(mode)
  const link = document.createElement('a')
  link.href = href
  link.download = downloadName
  link.rel = 'noopener'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function openResumeHtml(mode: ColorMode) {
  window.open(getResumeHtmlHref(mode), '_blank', 'noopener,noreferrer')
}
