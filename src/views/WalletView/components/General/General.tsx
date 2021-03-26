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

const General = ({ className, ...rest }: ViewComponentProps): JSX.Element => {
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
            name="fullname"
            fullWidth
            type="text"
          />
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
            name="email"
            fullWidth
            type="email"
          />
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
            name="address"
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
            placeholder="Hello World..."
            variant="outlined"
            size="medium"
            name="address"
            fullWidth
            type="text"
          />
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
            Your Address Here
          </Typography>
          <Typography
            variant="subtitle1"
            color="textPrimary"
            className={classes.inputTitle}
          >
            Only send STX compatible tokens to this address
          </Typography>
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
      </Grid>
    </div>
  );
};

export default General;
