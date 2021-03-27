import React, { useContext } from 'react';
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
          />
          Currently only supporting STX transactions
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography
            variant="subtitle1"
            color="textPrimary"
            className={classes.inputTitle}
          >
            Amount
          </Typography>
          <TextField
            placeholder="0.00"
            variant="outlined"
            size="medium"
            fullWidth
            type="number"
          />
          There will be a {"< 1"} STX fee added to the amount you specify
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
            placeholder="SP..."
            variant="outlined"
            size="medium"
            fullWidth
            type="text"
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
