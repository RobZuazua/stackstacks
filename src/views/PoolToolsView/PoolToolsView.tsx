import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import { Image } from 'components/atoms';
import { LearnMoreLink } from 'components/atoms';
import { SectionHeader } from 'components/molecules';
import { HeroShaped, Section } from 'components/organisms';
import { useConnect } from '@stacks/connect-react';
import { address } from 'bitcoinjs-lib';
import { NETWORK } from 'stacks/Constants';
import {
  uintCV,
  standardPrincipalCV,
  tupleCV,
  bufferCV,
  noneCV,
  stringUtf8CV,
  bufferCVFromString,
  AddressHashMode,
} from "@stacks/transactions";
import BN from 'bn.js';

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
  const [delegateStackSTXAmount, setDelegateStackSTXAmount] = useState(0);
  const [delegateStackSTXStacker, setDelegateStackSTXStacker] = useState("");
  const [delegateStacksBTCAddress, setDelegateStacksSTXBTCAddress] = useState("1LMn4ycjBXbVC4tKgCfPESFVjFn8x1XiKM");
  const [delegateStackSTXVersion, setDelegateStackSTXVersion] = useState(AddressHashMode.SerializeP2PKH);
  const [delegateStackSTXStartBurnHeight, setDelegateStackSTXStartBurnHeight] = useState(0);
  const [delegateStackSTXStartLockPeriod, setDelegateStackSTXStartLockPeriod] = useState(0);


  // const { hashMode, data } = decodeBtcAddress(poxAddress);

  //  {
  //   hashMode,
  //   data: b58Result.hash,
  // };
  //   const hashModeBuffer = bufferCV(new BN(hashMode, 10).toArrayLike(Buffer));
  //   const hashbytes = bufferCV(data);
  //   const address = tupleCV({
  //     hashbytes,
  //     version: hashModeBuffer,
  //   });

  let b58Result: address.Base58CheckResult;
  try {
    b58Result = address.fromBase58Check(delegateStacksBTCAddress);
  } catch (error) {
    // throw new InvalidAddressError(delegateStackSTXHashBytes, error);
  }  

  const hashModeBuffer = bufferCV(new BN(delegateStackSTXVersion, 10).toArrayLike(Buffer));
  const hashbytes = bufferCV(b58Result.hash);

  const [amount, setAmount] = useState(0);

  const [mySTXAddress, setMySTXAddress] = useState("");
  const [rewards, setRewards] = useState(0);

  const { doContractCall } = useConnect();

  const handleClick = (): void => {
    window.history.back();
  };

  const handleChange = (e) => {
    if (e.target.id === 'amount') {
      setAmount(e.target.value);
    } else if (e.target.id === 'mySTXAddress') {
      setMySTXAddress(e.target.value);
    } else if (e.target.id === 'rewards') {
      setRewards(e.target.value);
    } else if (e.target.id === 'delegateStackSTXAmount') {
      setDelegateStackSTXAmount(e.target.value);
    } else if (e.target.id === 'delegateStackSTXStacker') {
      setDelegateStackSTXStacker(e.target.value);
    } else if (e.target.id === 'delegateStackSTXBTCAddress') {
      setDelegateStacksSTXBTCAddress(e.target.value);
    } else if (e.target.id === 'delegateStackSTXVersion') {
      setDelegateStackSTXVersion(e.target.value);
    } else if (e.target.id === 'delegateStackSTXStartBurnHeight') {
      setDelegateStackSTXStartBurnHeight(e.target.value);
    } else if (e.target.id === 'delegateStackSTXStartLockPeriod') {
      setDelegateStackSTXStartLockPeriod(e.target.value);
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
            Delegate Stack STX for user
          </Typography>
          <TextField
            id="delegateStackSTXAmount"
            placeholder="1"
            variant="outlined"
            size="medium"
            fullWidth
            type="number"
            onChange={handleChange}
            helperText="amount"
          />
          <br/><br/>
          <TextField
            id="delegateStackSTXStacker"
            placeholder=""
            variant="outlined"
            size="medium"
            fullWidth
            type="text"
            onChange={handleChange}
            helperText="stacker"
          />
          <br/><br/>
          <TextField
            id="delegateStackSTXBTCAddress"
            defaultValue={delegateStacksBTCAddress}
            disabled={true}
            variant="outlined"
            size="medium"
            fullWidth
            type="text"
            onChange={handleChange}
            helperText="BTC Address"
          />
          <br/><br/>
          <TextField
            id="delegateStackSTXVersion"
            defaultValue={delegateStackSTXVersion}
            disabled={true}
            variant="outlined"
            size="medium"
            fullWidth
            type="number"
            onChange={handleChange}
            helperText="version"
          />
          <br/><br/>
          <TextField
            id="delegateStackSTXStartBurnHeight"
            placeholder="1"
            variant="outlined"
            size="medium"
            fullWidth
            type="number"
            onChange={handleChange}
            helperText="burn height"
          />
          <br/><br/>
          <TextField
            id="delegateStackSTXStartLockPeriod"
            placeholder="1"
            variant="outlined"
            size="medium"
            fullWidth
            type="number"
            onChange={handleChange}
            helperText="lock period"

          />
          <br/><br/>
          <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={async e=>doContractCall({
            contractAddress: "SP000000000000000000002Q6VF78",
            contractName: "pox",
            functionName: "delegate-stack-stx",
            functionArgs: [
              standardPrincipalCV(delegateStackSTXStacker),
              uintCV((delegateStackSTXAmount).toString()),
              // tupleCV({"hashbytes": delegateStackSTXHashBytes, "version" : delegateStackSTXVersion}),
              //tupleCV({"hashbytes": bufferCVFromString(delegateStackSTXHashBytes), "version" : bufferCVFromString(delegateStackSTXVersion)}),
              tupleCV({
                hashbytes,
                version: hashModeBuffer,
              }),
              // POX ADDRESS
              uintCV((delegateStackSTXStartBurnHeight).toString()),
              uintCV((delegateStackSTXStartLockPeriod).toString()),
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
          delegate-stack-stx for user
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
            id="mySTXAddress"
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
              standardPrincipalCV(mySTXAddress),
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
