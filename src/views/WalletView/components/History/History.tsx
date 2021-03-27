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

  return (
    <div className={className} {...rest}>
      <Grid container spacing={isMd ? 4 : 2}>
        <Grid item xs={12}>
          <div className={classes.titleCta}>
            <Typography variant="h4" color="textPrimary">
              Transaction History
            </Typography>
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
                title={item.sender_address === stxAddress ? "Sent" : item.token_transfer.recipient_address === stxAddress ? "Received" : "Other"}
                subtitle={(parseInt(item.token_transfer.amount)/1000000).toString() + " STX"}
                // showArrow
                titleProps={{
                  variant: 'h6',
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
