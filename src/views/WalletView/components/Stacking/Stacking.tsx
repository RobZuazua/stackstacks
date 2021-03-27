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

const Stacking = ({ className, ...rest }: ViewComponentProps): JSX.Element => {
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
              Stack STX
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="subtitle1"
            color="textPrimary"
            className={classes.inputTitle}
          >
            Pool's address
          </Typography>
          <TextField
            placeholder="SP25V7B7NQNS3ZWRG6WX4966S65E1K0731Z0JMBNK"
            variant="outlined"
            size="medium"
            name="fullname"
            fullWidth
            type="text"
            disabled={true}
          />
          We currently only support the Triton stacking pool
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="subtitle1"
            color="textPrimary"
            className={classes.inputTitle}
          >
            Stacking Amount
          </Typography>
          <TextField
            placeholder="0.00 STX"
            variant="outlined"
            size="medium"
            fullWidth
            type="number"
          />
          Must Stack at least 250 STX
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="subtitle1"
            color="textPrimary"
            className={classes.inputTitle}
          >
            Stacking Cycles
          </Typography>
          <TextField
            placeholder="1"
            variant="outlined"
            size="medium"
            fullWidth
            type="number"
          />
          Minimum 1. Your STX will be locked for the duration of the cycles specified
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="subtitle1"
            color="textPrimary"
            className={classes.inputTitle}
          >
            BTC Reward Address
          </Typography>
          <TextField
            placeholder="0x..."
            variant="outlined"
            size="medium"
            fullWidth
            type="text"
          />
          You MUST provide a valid Bitcoin address in order to recieve your stacking reward
        </Grid>
        
        <Grid item container justify="flex-start" xs={12}>
          <Button
            variant="contained"
            type="submit"
            color="primary"
            size="large"
          >
            STACK
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Stacking;
