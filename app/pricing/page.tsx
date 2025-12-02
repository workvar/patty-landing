'use client'

import Navbar from '../../components/general/Navbar'
import Footer from '../../components/general/Footer'
import Pricing from '../../pages/Pricing'

export default function PricingPage() {
  return (
    <>
      <Navbar onOpenWaitlist={() => {}} />
      <main className="flex-grow">
        <Pricing />
      </main>
      <Footer />
    </>
  )
}

