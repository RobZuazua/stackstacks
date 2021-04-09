import React, { useCallback, useState } from 'react';
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
import { useConnect } from '@stacks/connect-react';
import { NETWORK } from 'stacks/Constants';
import {
  callReadOnlyFunction,
  uintCV,
  tupleCV,
  OptionalCV,
  someCV,
  noneCV,
  cvToString,
  standardPrincipalCV,
} from "@stacks/transactions";
import { calculateUntilBurnHeightBlockFromCycles, fetchPoxInfo } from 'stacks/Utils';
import { browserHistory } from 'App';

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

const Stacking = ({ className, account, ...rest }: ViewComponentProps): JSX.Element => {
  const classes = useStyles();
  const { doContractCall } = useConnect();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const [poolAddress, setPoolAddress] = useState("SPGXKM11TG8GX814V460KDP9ZS5G0SYBWMZJG5AS");
  const [amount, setAmount] = useState(0);
  const [cycles, setCycles] = useState(9);

  const handleChange = (e) => {
    if (e.target.id === 'amount') {
      setAmount(e.target.value);
    } 
  }

  const cyclesToUntilBurnBlockHeight = useCallback(
    async () => {
      const poxInfo = await fetchPoxInfo();
      if (!poxInfo) throw new Error('`poxInfo` not defined');
      if (!cycles) return;
      return calculateUntilBurnHeightBlockFromCycles({
        cycles,
        rewardCycleLength: poxInfo.reward_cycle_length,
        currentCycleId: poxInfo.reward_cycle_id,
        genesisBurnBlockHeight: poxInfo.first_burnchain_block_height,
      });
    },[cycles]
  );

  return (
    <div className={className} {...rest}>
      <Grid container spacing={isMd ? 4 : 2}>
        <Grid item xs={12}>
          <div className={classes.titleCta}>
            <Typography variant="h4" color="textPrimary">
              Stack STX
            </Typography>
            <Button variant="outlined" color="secondary" target="_blank" href={`https://stacking.club/learn`}>
              Learn more about stacking
            </Button>
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
            placeholder="SPGXKM11TG8GX814V460KDP9ZS5G0SYBWMZJG5AS"
            variant="outlined"
            size="medium"
            name="fullname"
            fullWidth
            type="text"
            disabled={true}
            helperText={"We currently only support the Neptune stacking pool"}
          />
          
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
            id="amount"
            placeholder="0 STX"
            variant="outlined"
            size="medium"
            fullWidth
            type="number"
            onChange={handleChange}
            error={amount < 1}
            helperText={"Must Stack at least 1 STX."}
          />
          
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
            placeholder="9"
            variant="outlined"
            size="medium"
            fullWidth
            type="number"
            disabled={true}
            helperText={"We only support Stacking for 9 cycles. (Until cycle #15 for the Stacks 2.1 fork)"}
          />
        </Grid>
        {/* <Grid item xs={12}>
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
        </Grid> */}
        {/* <Grid item xs={12}>
        <Typography
            variant="subtitle1"
            color="textPrimary"
            className={classes.inputTitle}
          >
            When you stack with neptune your STX tokens NEVER leave your account. Stacking requires that we lock some of your tokens, in your own wallet, in order to earn yield.  
          </Typography>
        </Grid> */}
        <Grid item xs={12}>
        <Typography
            variant="subtitle1"
            color="textPrimary"
            className={classes.inputTitle}
          >
              The Neptune stacking pool pays <a target="_blank" href="https://stacking.club/cycles/current">rewards</a> in STX to the address you delegate from. There is no fee.
              <br/><br/>
              After your tokens are locked, you will see a new tab "Claim Instant Rewards". 
              <br/><br/> 
              You will have the option to claim your rewards instantly by clicking this button. Or, you can wait until the end of the cycle and we will send you your rewards.
              
               Please read  <a target="_blank" href="https://docs.google.com/document/d/1btirO0ObkInkKMpMxwRCp-W2Y1xbSYsupQ9HCOYPmFM/edit?usp=sharing">FAQ</a> for more information.

          </Typography>
        </Grid>
        <Grid item container justify="flex-start" xs={12}>
        <Button
            disabled={amount < 1}
            variant="contained"
            type="submit"
            color="primary"
            size="large"
            onClick={async e=>doContractCall({
              contractAddress: "SP000000000000000000002Q6VF78",
              contractName: "pox",
              functionName: "delegate-stx",
              functionArgs: [
                uintCV((amount* 1000000).toString()),
                standardPrincipalCV(poolAddress),
                // noneCV(),
                someCV(uintCV(await cyclesToUntilBurnBlockHeight())),
                noneCV(),
              ],
              network: NETWORK,
              onFinish: data => {
                // console.log(data);
                browserHistory.push("/wallet/?pid=history");
                // console.log(data.txId);
                // browserHistory.push("/wallet/?pid=history");
              }
              })}
          >
            PREVIEW STACK
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Stacking;
