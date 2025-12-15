'use client'

import Navbar from '../../components/general/Navbar';
import Footer from '../../components/general/Footer';
import CaseStudies from '../../pages/CaseStudies';

export default function CaseStudiesPage() {
  return (
    <>
      <Navbar onOpenWaitlist={() => {}} />
      <main className="flex-grow">
        <CaseStudies />
      </main>
      <Footer />
    </>
  );
}


