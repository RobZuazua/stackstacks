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
import {
  uintCV,
  standardPrincipalCV,
} from "@stacks/transactions";

const useStyles = makeStyles(theme => ({
  inputTitle: {
    fontWeight: 700,
    marginBottom: theme.spacing(1),
  },
}));

const Trade = ({ className, account, ...rest }: ViewComponentProps): JSX.Element => {
  const classes = useStyles();
  const { doContractCall } = useConnect();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  // TODO: replace setRewardAmount function with an actual call to the claim rewards contract
  const [rewardAmount, setRewardAmount] = useState(0.00);
  const [hasClaimed, setHasClaimed] = useState(false);

  const rewardMessage = rewardAmount == 0 ? "There are currently no rewards to claim. If you recently claimed a Neptune pool reward, visit the Transaction History section to check the status of your reward" : ("You claimed " + rewardAmount + " STX tokens! Visit the Transaction History section to check the status of your reward")

  return (
    <div className={className} {...rest}>
      <Grid container spacing={isMd ? 4 : 2}>
        <Grid item xs={12}>
          <Typography variant="h4" color="textPrimary">
            {/* Claim Reward */}
            Claim Rewards
          </Typography>
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
            Stack STX. Get Paid. Instantly.
          </Typography>
        </Grid>
        <Grid item container justify="flex-start" xs={12}>
          <Button
            variant="contained"
            type="submit"
            color="primary"
            size="large"
            onClick={async e=>doContractCall({
              contractAddress: "SPYRSAYCD5JXRPG9J93R5HVHEBG2T9VBYKQ37S8W",
              contractName: "neptune-pool",
              functionName: "claim-rewards",
              functionArgs: [
                // standardPrincipalCV(address),
                // uintCV((rewards* 1000000).toString()),
                // standardPrincipalCV(poolAddress),
                // noneCV(),
                //someCV(uintCV(await cyclesToUntilBurnBlockHeight())),
                //noneCV(),
              ],
              network: NETWORK,
              postConditionMode: 0x01,
              onFinish: data => {
                console.log(data)
                // console.log(data);
                //browserHistory.push("/wallet/?pid=history");
                // console.log(data.txId);
                // browserHistory.push("/wallet/?pid=history");
              }
              })}
            // disabled={true}
          >
            Click to Claim
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="subtitle1"
            color="textPrimary"
            className={classes.inputTitle}
          >
            {/* {hasClaimed ? rewardMessage : "Click to claim your stacking rewards"} */}
            As soon as the neptune stacking pool locks your tokens, you will have the option to claim your rewards instantly.

If you do not want to claim your rewards instantly, we will send them to you within two days of the cycle ending.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography
            variant="subtitle1"
            color="textPrimary"
            className={classes.inputTitle}
          >
            See the smart contract code <a href="https://explorer.stacks.co/txid/0xdcb844259a6b1b5ccbaef4778d3794f6cff1fce112bad6d9380282f17c384d77?chain=mainnet">here</a>.
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default Trade;