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
import { UserContext } from 'App';
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

  const connectedString = useContext(UserContext);
  let decodedObj:any = jwt_decode(connectedString);
  const { doSTXTransfer } = useConnect();

  const [token, setToken] = useState("STX");
  const [amount, setAmount] = useState("0");
  const [recipient, setRecipient] = useState("");
  const [note, setNote] = useState("");


  const handleChange = (e) => {
    if (e.target.id === 'amount') {
      setAmount(e.target.value);
    } else if (e.target.id === 'recipient') {
      setRecipient(e.target.value);
    } else if (e.target.id === 'note') {
      setNote(e.target.value);
    }
  }

  return (
    <div className={className} {...rest}>
      <Grid container spacing={isMd ? 4 : 2}>
        <Grid item xs={12}>
          <Typography variant="h4" color="textPrimary">
            Send
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography
            variant="subtitle1"
            color="textPrimary"
            className={classes.inputTitle}
          >
            Token
          </Typography>
          <TextField
            placeholder="STX"
            variant="outlined"
            size="medium"
            fullWidth
            type="text"
            disabled={true}
          />
          Currently only supporting STX transactions
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography
            variant="subtitle1"
            color="textPrimary"
            className={classes.inputTitle}
          >
            Amount (uSTX)
          </Typography>
          <TextField
            id="amount"
            placeholder="0"
            variant="outlined"
            size="medium"
            fullWidth
            type="number"
            onChange={handleChange}
          />
          1000000 uSTX = 1 STX
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="subtitle1"
            color="textPrimary"
            className={classes.inputTitle}
          >
            Recipient
          </Typography>
          <TextField
            id="recipient"
            placeholder="SP..."
            variant="outlined"
            size="medium"
            fullWidth
            type="text"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="subtitle1"
            color="textPrimary"
            className={classes.inputTitle}
          >
            Note (optional)
          </Typography>
          <TextField
            id="note"
            placeholder="Bitcoin rocks!!"
            variant="outlined"
            size="medium"
            fullWidth
            type="text"
          />
        </Grid>
        <Grid item container justify="flex-start" xs={12}>
          <Button
            variant="contained"
            type="submit"
            color="primary"
            size="large"
            onClick={e=>doSTXTransfer({
              recipient, 
              amount,
              network: NETWORK,
              onFinish: data => {
                console.log(data);

                // setTxId(data.txId);
                // spinner.current.classList.add('d-none');
              }
              })}
          >
            Preview Transaction
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4" color="textPrimary">
            Recieve
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography
            variant="subtitle1"
            color="textPrimary"
            className={classes.inputTitle}
          >
            {connectedString ? decodedObj.profile.stxAddress.mainnet : ""}
          </Typography>
          <Typography
            variant="subtitle1"
            color="textPrimary"
            className={classes.inputTitle}
          >
            Only send STX compatible tokens to this address
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default Trade;