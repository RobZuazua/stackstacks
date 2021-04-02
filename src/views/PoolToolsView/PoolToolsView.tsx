import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import { Image } from 'components/atoms';
import { LearnMoreLink } from 'components/atoms';
import { SectionHeader } from 'components/molecules';
import { HeroShaped, Section } from 'components/organisms';
import { useConnect } from '@stacks/connect-react';
import { NETWORK } from 'stacks/Constants';
import {
  uintCV,
  standardPrincipalCV,
} from "@stacks/transactions";
const useStyles = makeStyles(theme => {
  const toolbar = theme.mixins.toolbar as any;
  return ({
    root: {
      '& .hero-shaped': {
        borderBottom: 0,
      },
      '& .hero-shaped__wrapper': {
        [theme.breakpoints.up('md')]: {
          minHeight: `calc(100vh - ${toolbar['@media (min-width:600px)'].minHeight}px)`,
        },
      },
    },
    formContainer: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      [theme.breakpoints.down('sm')]: {
        maxWidth: 500,
        margin: `0 auto`,
      },
    },
    image: {
      objectFit: 'cover',
    },
    label: {
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
    txt: {
      fontWeight: 700,
      marginBottom: theme.spacing(1),
    }
  });
});

const PoolToolsView = (): JSX.Element => {
  const classes = useStyles();
  const [amount, setAmount] = useState(0);

  const [address, setAddress] = useState("");
  const [rewards, setRewards] = useState(0);

  const { doContractCall } = useConnect();

  const handleClick = (): void => {
    window.history.back();
  };

  const handleChange = (e) => {
    if (e.target.id === 'amount') {
      setAmount(e.target.value);
    } else if (e.target.id === 'address') {
      setAddress(e.target.value);
    } else if (e.target.id === 'rewards') {
      setRewards(e.target.value);
    } 
  }

  return (
    <div className={classes.root}>
     <Section>
     <Grid item xs={12}>
          <Typography
            variant="subtitle1"
            color="textPrimary"
            className={classes.txt}
          >
            Add STX Tokens to liquidity pool
          </Typography>
          <TextField
            id="amount"
            placeholder="1"
            variant="outlined"
            size="medium"
            fullWidth
            type="number"
            onChange={handleChange}
          />
          <br/><br/>
          <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={async e=>doContractCall({
            contractAddress: "SPYRSAYCD5JXRPG9J93R5HVHEBG2T9VBYKQ37S8W",
            contractName: "neptune-pool",
            functionName: "fill-liquidity-pool",
            functionArgs: [
              uintCV((amount* 1000000).toString()),
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
        >
          Fill Liquidity Pool
        </Button>
        </Grid>
     
     </Section>
     <Section>
     <Grid item xs={12}>
          <Typography
            variant="subtitle1"
            color="textPrimary"
            className={classes.txt}
          >
            STX Address
          </Typography>
          <TextField
            id="address"
            placeholder=""
            variant="outlined"
            size="medium"
            fullWidth
            type="text"
            onChange={handleChange}
          />
          <br/><br/>
          <Typography
            variant="subtitle1"
            color="textPrimary"
            className={classes.txt}
          >
            Reward Amount
          </Typography>

          <TextField
            id="rewards"
            placeholder="1"
            variant="outlined"
            size="medium"
            fullWidth
            type="number"
            onChange={handleChange}
          />
          <br/><br/>
          <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={async e=>doContractCall({
            contractAddress: "SPYRSAYCD5JXRPG9J93R5HVHEBG2T9VBYKQ37S8W",
            contractName: "neptune-pool",
            functionName: "set-rewards",
            functionArgs: [
              standardPrincipalCV(address),
              uintCV((rewards* 1000000).toString()),
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
        >
          Add to rewards map
        </Button>
        </Grid>
    </Section>
          
    </div>
  );
};

export default PoolToolsView;
