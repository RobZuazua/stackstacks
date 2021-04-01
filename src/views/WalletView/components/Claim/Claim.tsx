import React, { useContext, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import jwt_decode from "jwt-decode";
import {
  useMediaQuery,
  Grid,
  Typography,
  TextField,
  Button,
  Divider,
} from '@material-ui/core';
import { browserHistory, UserContext } from 'App';
import { useConnect } from '@stacks/connect-react';
import { NETWORK } from 'stacks/Constants';

const useStyles = makeStyles(theme => ({
  inputTitle: {
    fontWeight: 700,
    marginBottom: theme.spacing(1),
  },
}));

const Trade = ({ className, account, ...rest }: ViewComponentProps): JSX.Element => {
  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  // TODO: replace setRewardAmount function with an actual call to the claim rewards contract
  const [rewardAmount, setRewardAmount] = useState(0.00);
  const [hasClaimed, setHasClaimed] = useState(false);

  const rewardMessage = rewardAmount == 0 ? "There are currently no rewards to claim. If you recently claimed a Triton pool reward, visit the Transaction History section to check the status of your reward" : ("You claimed " + rewardAmount + " STX tokens! Visit the Transaction History section to check the status of your reward")

  return (
    <div className={className} {...rest}>
      <Grid container spacing={isMd ? 4 : 2}>
        <Grid item xs={12}>
          <Typography variant="h4" color="textPrimary">
            Claim Reward
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item container justify="flex-start" xs={12}>
          <Button
            variant="contained"
            type="submit"
            color="primary"
            size="large"
            onClick={()=>{setHasClaimed(true); setRewardAmount(0)}}
          >
            Click to Claim
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography
            variant="subtitle1"
            color="textPrimary"
            className={classes.inputTitle}
          >
            {hasClaimed ? rewardMessage : "Click to claim your stacking rewards"}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default Trade;