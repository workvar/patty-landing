'use client'

import Navbar from '../../components/general/Navbar'
import Footer from '../../components/general/Footer'
import Blog from '../../pages/Blog'

export default function BlogPage() {
  return (
    <>
      <Navbar onOpenWaitlist={() => {}} />
      <main className="flex-grow">
        <Blog />
      </main>
      <Footer />
    </>
  )
}

