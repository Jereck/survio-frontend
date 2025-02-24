"use client"

import { BarChart2 } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation';

function Navbar() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-xl items-center justify-between px-10">
        <Link href="/" className="flex items-center space-x-2">
          <BarChart2 className="h-6 w-6" />
          <span className="font-bold text-xl">Survur.io</span>
        </Link>
        <nav className="flex items-center gap-4 sm:gap-6">
          <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4">
            Features
          </Link>
          <Link href="#how-it-works" className="text-sm font-medium hover:underline underline-offset-4">
            How It Works
          </Link>
          <Link href="#how-it-works" className="text-sm font-medium hover:underline underline-offset-4">
            Pricing
          </Link>
          <Button variant="outline" onClick={() => router.push('/pricing')}>Sign Up</Button>
        </nav>
      </div>
    </header>
  )
}

export default Navbar