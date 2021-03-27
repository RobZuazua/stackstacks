import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  useMediaQuery,
  Grid,
  Typography,
  TextField,
  FormControlLabel,
  Switch,
  Button,
  Divider,
} from '@material-ui/core';
import { CardJobMinimal } from 'components/organisms';

const useStyles = makeStyles(theme => ({
  inputTitle: {
    fontWeight: 700,
    marginBottom: theme.spacing(1),
  },
  switchTitle: {
    fontWeight: 700,
  },
  titleCta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));



const Stacking = ({ className, account, transactions, ...rest }: ViewComponentProps): JSX.Element => {
  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <div className={className} {...rest}>
      <Grid container spacing={isMd ? 4 : 2}>
        <Grid item xs={12}>
          <div className={classes.titleCta}>
            <Typography variant="h4" color="textPrimary">
              Transaction History
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          {transactions.map((item: any, index: number) => (
            <Grid item xs={12} key={index}>
              <CardJobMinimal
                title={`placehodler`}
                subtitle={`placehodler`}
                // showArrow
                titleProps={{
                  variant: 'h6',
                }}
                subtitleProps={{
                  variant: 'subtitle1',
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default Stacking;
