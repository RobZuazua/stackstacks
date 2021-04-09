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
            Stacking Payout History
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
            You should not trust anyone. Check your wallet balance and verify for yourself. 
            <br/><br/>
            We used the average payout / slot of cycle 5 (24 hours before end of cycle) which came out to $640 per cycle per slot.
            <br/><br/>
            So if you stacked 90k STX for 3 cycles, you got $1920 payed out to you before cycle 6 even began.
            <br/><br/>
            You can see what happened <a href="https://explorer.stacks.co/address/SPGXKM11TG8GX814V460KDP9ZS5G0SYBWMZJG5AS?chain=mainnet">here</a>
            <br/><br/>
            In the future this will all be trustless.
            <br/><br/>
            We will announce when this has been taken over by smart contracts and oracles!
          </Typography>
        </Grid>
        <Grid item container justify="flex-start" xs={12}>
          {/* <Button
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
          </Button> */}
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="subtitle1"
            color="textPrimary"
            className={classes.inputTitle}
          >
          <a href="https://explorer.stacks.co/txid/0x76aa300498a91ad1bfc958f6b27af6d31177cda6eec91527169df2b5313bdc84?utm_source=stacks-wallet&chain=mainnet">SP348BNKDH8AFYF04FRKS6FE1DN8YJXNMGQEZDD6X</a> Stacked  99.999752; payout in USD: $2.13; payout in STX: 1.040647826;
          <br/><br/>
          <a href="https://explorer.stacks.co/txid/0xcdc0f7e511902346e81b7fb0345cee055e43cff21b7e269a11a4ba818ad3523c?utm_source=stacks-wallet&chain=mainnet">SP06QC626XTXDQ2D6X6SV2E5SVMNKHNRHYSAMN4M</a> Stacked  32,460.57; payout in USD: $692.49; payout in STX: 337.801101;
          <br/><br/>
          <a href="https://explorer.stacks.co/txid/0x70fa3dc764ea4ec0643e56a3960d8c6cdb997d2dffd242a1d164b706b5f2c9d0?utm_source=stacks-wallet&chain=mainnet">SP14KRZ87DS17BDCTHJAWZWT40XT7D5VC8BJ0TYW4</a> Stacked  50; payout in USD: $1.07; payout in STX: 0.5203252033;
          <br/><br/>
          <a href="https://explorer.stacks.co/txid/0x204720ca2a79135d2a5951685534ffbfa688cf8e79f07df194067898dd7f9ca1?utm_source=stacks-wallet&chain=mainnet">SP30S6Y3HWJ95BDC6PWBD9A0N5TSYZV9Z7BC41T7J</a> Stacked  91.4; payout in USD: $1.95; payout in STX: 0.9511544715;
          <br/><br/>
          <a href="https://explorer.stacks.co/txid/0x3af4ff80bd9c577f020159bc75cc7d00ba35acb7b737153acd9e9d6ec4707fe0?utm_source=stacks-wallet&chain=mainnet">SP197GMEG6WGBRDTCTGGWMRA1G77E65TRXWYKGCT7</a> Stacked  5,001.00; payout in USD: $106.69; payout in STX: 52.04292683;
          <br/><br/>
          <a href="https://explorer.stacks.co/txid/0x912c6197628e7271a947bf90b7bac582c432ef059f60d0a04af0cbc1087e7cc3?utm_source=stacks-wallet&chain=mainnet">SP3EVQ0GWNJAYTXMNKMDX6EWP06TXTX3RSE0RTNS4</a> Stacked  10; payout in USD: $0.21; payout in STX: 0.104065;

          </Typography>
        </Grid>
        {/* <Grid item xs={12} sm={6}>
          <Typography
            variant="subtitle1"
            color="textPrimary"
            className={classes.inputTitle}
          >
            See the smart contract code <a href="https://explorer.stacks.co/txid/0xdcb844259a6b1b5ccbaef4778d3794f6cff1fce112bad6d9380282f17c384d77?chain=mainnet">here</a>.
          </Typography>
        </Grid> */}
      </Grid>
    </div>
  );
};

export default Trade;