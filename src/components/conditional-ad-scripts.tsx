'use client'

import { usePathname } from 'next/navigation'
import Script from 'next/script'

export default function ConditionalAdScripts() {
  const pathname = usePathname()
  if (pathname.startsWith('/admin')) {
    return null
  }

  return (
    <>
      <Script id="ad-script-d51fae" type="text/javascript" src="//unhealthyirreparable.com/d5/1f/ae/d51fae18f343c883880c3ae7f62b9cdb.js" strategy="lazyOnload" />
      <Script id="ad-script-1235aa" type="text/javascript" src="//unhealthyirreparable.com/12/35/aa/1235aa99934d768925bb4f2f03375fe4.js" strategy="lazyOnload" />
    </>
  )
}
