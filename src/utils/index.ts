import router from '@/router'

export async function toLogin() {
  const urlObj = new URL(window.location.href)
  const url = `${urlObj.origin}/#/login?url=${encodeURIComponent(urlObj.href)}&t=`
  location.href = `https://company.lingman.tech/#/login?url=${encodeURIComponent(url)}`
}

export function windowOpen(url: string, obj?) {
  if (!url) window.open(`${window.location.origin}/${window.location.hash ? '#' : ''}/404`)
  if (url.startsWith('http')) {
    window.open(url)
  }
  else {
    const routeData = router.resolve({
      path: url,
      query: obj,
    })
    window.open(routeData.href, '_blank')
  }
}

export async function copyText(text) {
  const { copy } = useClipboard()
  await copy(text)
  ElMessage.success('复制成功')
}
