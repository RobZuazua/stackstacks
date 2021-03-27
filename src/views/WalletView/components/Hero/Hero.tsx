import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { SectionHeader } from 'components/molecules';
import { Section } from 'components/organisms';
import { Image } from 'components/atoms';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
    // background: theme.palette.primary.dark,
    // background: 'rgb(63,80,181)',
    backgroundImage: 'linear-gradient(rgb(63,80,181) , rgb(223,247,254))',
  },
  textWhite: {
    color: 'white',
  },
  title: {
    fontWeight: 'bold',
  },
  address: {
    color: 'white',
    fontWeight: 'bold',
  },
  logoImage: {
    width: '58px',
    height: '58px',
  },
}));

const Hero = ({ className, ...rest }: ViewComponentProps): JSX.Element => {
  const classes = useStyles();
  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Section>
        <SectionHeader
          title="5702.45"
          subtitle="Stacks - STX"
          ctaGroup={[<div className={classes.textWhite}>ST20CXAA8S6SQQHFF4RKAWA4M14VMNT55QQ3LYGZ5</div>]}
          align="left"
          disableGutter
          titleProps={{
            className: clsx(classes.title, classes.textWhite),
            variant: 'h3',
          }}
          subtitleProps={{
            className: classes.textWhite,
          }}
          ctaGroupProps={{
            className: classes.textWhite,
          }}
        />
      </Section>
      
    </div>
  );
};

export default Hero;
