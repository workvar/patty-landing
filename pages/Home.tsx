import React from 'react';
import Hero from '../components/pages/home/1-Hero';
import Features from '../components/pages/home/2-Features';
import Workflow from '../components/pages/home/3-Workflow';
import UseCases from '../components/pages/home/4-UseCases';
import Coverage from '../components/pages/home/5-Coverage';
import Integrations from '../components/pages/home/6-Integrations';
import { GridBackground } from '../components/ui/GridBackground';

interface HomeProps {
  onOpenWaitlist: () => void;
}

const Home: React.FC<HomeProps> = ({ onOpenWaitlist }) => {
  return (
    <GridBackground>
      <Hero onOpenWaitlist={onOpenWaitlist} />
      <Features />
      <Workflow />
      <UseCases />
      <Coverage />
      <Integrations />
    </GridBackground>
  );
};

export default Home;