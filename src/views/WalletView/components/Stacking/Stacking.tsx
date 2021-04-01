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
  const [cycles, setCycles] = useState(1);

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
            helperText={"We currently only support the Triton stacking pool"}
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
            placeholder="1"
            variant="outlined"
            size="medium"
            fullWidth
            type="number"
            disabled={true}
            helperText={"We only support Stacking for 1 cycle"}
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
              The Triton stacking pool pays <a target="_blank" href="https://stacking.club/cycles/current">rewards</a> in STX to the address you delegate from within 2 days of the cycle ending. 0% of your stacking reward will be used as a fee.
          </Typography>
        </Grid>
        <Grid item xs={12}>
        <Typography
            variant="subtitle1"
            color="secondary"
            className={classes.inputTitle}
          >
              We will NOT lock your STX until the Triton pool has reached the required amount necessary to begin receiving rewards from the Stacks blockchain. If we do not expect to reach the threshold for the upcoming cycle, we will let you know more than 24 hours before the cycle begins via our <a target="_blank" href="https://discord.gg/FQtHwdQNyR">discord</a>.
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
