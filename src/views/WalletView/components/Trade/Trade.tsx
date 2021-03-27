import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  useMediaQuery,
  Grid,
  Typography,
  TextField,
  Button,
  Divider,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  inputTitle: {
    fontWeight: 700,
    marginBottom: theme.spacing(1),
  },
}));

const Trade = ({ className, ...rest }: ViewComponentProps): JSX.Element => {
  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

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
          There will be a 1 STX fee added to the amount you specify
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
            Send
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
            ST20CXAA8S6SQQHFF4RKAWA4M14VMNT55QQ3LYGZ5
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
