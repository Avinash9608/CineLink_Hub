'use client'

import { usePathname } from 'next/navigation'
import Footer from '@/components/footer'

export default function ConditionalFooter() {
  const pathname = usePathname()
  return pathname.startsWith('/admin') ? null : <Footer />
}
