import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  useMediaQuery,
  Grid,
  Typography,
  Divider,
} from '@material-ui/core';
import Jobs from '../Jobs';

const useStyles = makeStyles(() => ({
  titleCta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

const Assets = ({ className, account, ...rest }: ViewComponentProps): JSX.Element => {
  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const stxBalance = account ? account.balance : '';
  const jobs = [
    {
      title: 'Micro Stacks',
      subtitle: 'uSTX',
      amount: stxBalance,
    },
    {
      title: 'Example Coin',
      subtitle: 'EXAMPLE',
      amount: '0',
    },
  ];

  return (
    <div className={className} {...rest}>
      <Grid container spacing={isMd ? 4 : 2}>
        <Grid item xs={12}>
          <div className={classes.titleCta}>
            <Typography variant="h4" color="textPrimary">
              Assets
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
          <Jobs data={jobs} />
      </Grid>
    </div>
  );
};

export default Assets;
