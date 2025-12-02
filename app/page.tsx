'use client'

import { useState } from 'react'
import Navbar from '../components/general/Navbar'
import Footer from '../components/general/Footer'
import Home from '../pages/Home'
import WaitlistModal from '../components/modals/WaitlistModal'

export default function HomePage() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false)

  const openWaitlist = () => setIsWaitlistOpen(true)
  const closeWaitlist = () => setIsWaitlistOpen(false)

  return (
    <>
      <Navbar onOpenWaitlist={openWaitlist} />
      <main className="flex-grow">
        <Home onOpenWaitlist={openWaitlist} />
      </main>
      <Footer />
      <WaitlistModal isOpen={isWaitlistOpen} onClose={closeWaitlist} />
    </>
  )
}

