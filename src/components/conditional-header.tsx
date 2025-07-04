'use client'

import { usePathname } from 'next/navigation'
import Header from '@/components/header'

export default function ConditionalHeader() {
  const pathname = usePathname()
  return pathname.startsWith('/admin') ? null : <Header />
}
