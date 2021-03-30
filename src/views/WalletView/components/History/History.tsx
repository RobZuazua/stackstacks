import React, { useContext } from 'react';
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
import { CardJobMinimal } from 'components/organisms';
import { UserContext } from 'App';
import jwt_decode from "jwt-decode";

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



const Stacking = ({ className, account, transactions, ...rest }: ViewComponentProps): JSX.Element => {
  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const connectedString = useContext(UserContext);
  let decodedObj:any = connectedString ? jwt_decode(connectedString) : "";
  const stxAddress = decodedObj ? decodedObj.profile.stxAddress.mainnet : "";

  console.log(transactions);
  return (
    <div className={className} {...rest}>
      <Grid container spacing={isMd ? 4 : 2}>
        <Grid item xs={12}>
          <div className={classes.titleCta}>
            <Typography variant="h4" color="textPrimary">
              Completed Transactions
            </Typography>
            <Button variant="outlined" color="primary" target="_blank" href={`https://explorer.stacks.co/address/${stxAddress}?chain=mainnet`}>
              See Pending Transactions
            </Button>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          {transactions.map((item: any, index: number) => (
            <Grid item xs={12} key={index}>
              <a target="_blank" href={`https://explorer.stacks.co/txid/${item.tx_id}?chain=mainnet`}>
              <CardJobMinimal
                title={
                  item.tx_type === "token_transfer" 
                    ? item.sender_address === stxAddress 
                      ? "Sent" 
                      : "Received" 
                    : item.tx_type === "contract_call" 
                      ? item.contract_call.function_name === "delegate-stx" 
                        ? "Delegate STX" 
                        : item.contract_call.function_name === "revoke-delegate-stx" 
                          ? "Revoke Delegation"
                          : "Contract call"
                      : "Contract call"}
                subtitle={
                  item.tx_type === "token_transfer" 
                    ? item.sender_address === stxAddress 
                      ? (parseInt(item.token_transfer.amount)/1000000).toString() + " STX" 
                      : (parseInt(item.token_transfer.amount)/1000000).toString() + " STX" 
                    : ""
                  }
                // showArrow
                titleProps={{
                  variant: 'h6',
                  color: item.tx_status === "success" ? "text-primary" : "error"
                }}
                subtitleProps={{
                  variant: 'subtitle1',
                }}
              />
              </a>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default Stacking;
