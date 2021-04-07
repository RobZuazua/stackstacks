import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { Grid, Button, useMediaQuery, colors } from '@material-ui/core';
import { Icon } from 'components/atoms';
import { SectionHeader } from 'components/molecules';
import { DescriptionListIcon } from 'components/organisms';

const Story = ({ className, ...rest }: ViewComponentProps): JSX.Element => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <div className={className} {...rest} id="FAQs">
      <SectionHeader title="FAQs" data-aos="fade-up" />
      <Grid container spacing={isMd ? 4 : 2}>
        <Grid item xs={12} sm={6} data-aos={'fade-up'}>
          <DescriptionListIcon
            title="What is Stacks?"
            subtitle="Stacks makes Bitcoin programmable, enabling decentralized apps and smart contracts that inherit all of Bitcoin’s powers."
            icon={
              <Icon
                fontIconClass="fas fa-book"
                size="medium"
                fontIconColor={colors.yellow[700]}
              />
            }
            align="left"
          />
        </Grid>
        <Grid item xs={12} sm={6} data-aos={'fade-up'}>
          <DescriptionListIcon
            title="What are STX Tokens?"
            subtitle="STX is the native currency of the Stacks ecosystem."
            icon={
              <Icon
                fontIconClass="fas fa-briefcase"
                size="medium"
                fontIconColor={colors.yellow[700]}
              />
            }
            align="left"
          />
        </Grid>
        <Grid item xs={12} sm={6} data-aos={'fade-up'}>
          <DescriptionListIcon
            title="What is Delegated Stacking?"
            subtitle="Delegated Stacking is a process which lets you lock up your STX tokens to earn bitcoin!"
            icon={
              <Icon
                fontIconClass="fas fa-briefcase"
                size="medium"
                fontIconColor={colors.yellow[700]}
              />
            }
            align="left"
          />
        </Grid>
        <Grid item xs={12} sm={6} data-aos={'fade-up'}>
          <DescriptionListIcon
            title="Who are we?"
            subtitle="Professional software enginners passionate about security, bitcoin, and the future of the open internet! Our twitter accounts are linked below."
            icon={
              <Icon
                fontIconClass="fas fa-briefcase"
                size="medium"
                fontIconColor={colors.yellow[700]}
              />
            }
            align="left"
          />
        </Grid>
        <Grid item xs={12} sm={6} data-aos={'fade-up'}>
          <DescriptionListIcon
            title="Learn More About Neptune"
            subtitle="Check out our most frequently asked questions!"
            icon={
              <Icon
                fontIconClass="fas fa-question"
                size="medium"
                fontIconColor={colors.yellow[700]}
              />
            }
            align="left"
          />
          <a href="https://docs.google.com/document/d/1btirO0ObkInkKMpMxwRCp-W2Y1xbSYsupQ9HCOYPmFM/edit?usp=sharing">FAQs</a>
        </Grid>
        {/* <Grid item container justify="center" xs={12} data-aos={'fade-up'}>
          <Button variant="outlined" color="primary">
            Learn more
          </Button>
        </Grid> */}
      </Grid>
    </div>
  );
};

export default Story;
