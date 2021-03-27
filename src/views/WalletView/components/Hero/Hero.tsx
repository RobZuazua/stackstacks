import React, { useContext } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { SectionHeader } from 'components/molecules';
import { Section } from 'components/organisms';
import { Image } from 'components/atoms';
import { Grid } from '@material-ui/core';
import jwt_decode from "jwt-decode";
import { UserContext } from 'App';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
    // background: theme.palette.primary.dark,
    // background: 'rgb(63,80,181)',
    background: 'linear-gradient(241.76deg, #3F50B5 -0.2%, #DFF7FE 121.1%)',
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

const Hero = ({ className, account, ...rest }: ViewComponentProps): JSX.Element => {
  const classes = useStyles();
  const connectedString = useContext(UserContext);
  let decodedObj:any = connectedString ? jwt_decode(connectedString) : "";

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Section>
        <SectionHeader
          title={account ? account.balance : ""}
          subtitle="Micro Stacks - uSTX"
          ctaGroup={[<div className={classes.textWhite}>{connectedString ? decodedObj.profile.stxAddress.mainnet : ""}</div>]}
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
