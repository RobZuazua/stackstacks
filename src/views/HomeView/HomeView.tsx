import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Section, SectionAlternate } from 'components/organisms';
import {
  About,
  Articles,
  Features,
  Hero,
  HowItWorks,
  MobileApp,
  Partners,
  Pricings,
  Reviews,
  Storage,
  Story,
  Support,
} from './components';

import {
  features,
  mobileapp,
  howItWorks,
  pricings,
  partners,
  articles,
  reviews,
} from './data';

const useStyles = makeStyles(theme => ({
  sectionAlternate: {
    backgroundImage: `linear-gradient(180deg, ${theme.palette.alternate.main} 50%, ${theme.palette.background.paper} 0%)`,
  },
  reviewSection: {
    background: theme.palette.primary.dark,
  },
}));

const HomeView = (): JSX.Element => {
  const classes = useStyles();
  
  return (
    <div>
      <Hero />
      <Section>
        <Features data={features} />
      </Section>
      <SectionAlternate>
        <Story />
      </SectionAlternate>
    </div>
  );
};

export default HomeView;
