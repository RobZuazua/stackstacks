import React, { useContext, useEffect, useState } from 'react';
import clsx from 'clsx';
import { parse } from 'query-string';
import { makeStyles } from '@material-ui/core/styles';
import { Box, List, ListItem, Grid, Typography } from '@material-ui/core';
import { SectionAlternate, CardBase } from 'components/organisms';
import { Hero, Trade, Stacking, Assets, History, Claim } from './components';
import { UserContext } from 'App';
import { fetchAccount, fetchAccountTransactions } from 'stacks/Utils';
import jwt_decode from "jwt-decode";

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    width: '100%',
  },
  section: {
    '& .section-alternate__content': {
      paddingTop: 0,
      marginTop: theme.spacing(-5),
      position: 'relative',
      zIndex: 1,
    },
    '& .card-base__content': {
      padding: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(3),
      },
    },
  },
  menu: {
    height: 'auto',
  },
  list: {
    display: 'inline-flex',
    overflow: 'auto',
    flexWrap: 'nowrap',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      flexDirection: 'column',
      marginRight: theme.spacing(-3),
      marginLeft: theme.spacing(-3),
    },
  },
  listItem: {
    marginRight: theme.spacing(2),
    flex: 0,
    [theme.breakpoints.up('md')]: {
      paddingRight: theme.spacing(3),
      paddingLeft: theme.spacing(3),
      borderLeft: '2px solid transparent',
    },
  },
  listItemActive: {
    [theme.breakpoints.up('md')]: {
      borderLeft: `2px solid ${theme.palette.primary.dark}`,
    },
    '& .menu__item': {
      color: theme.palette.text.primary,
    },
  },
}));

const subPages = [
  {
    id: 'trade',
    href: '/wallet/?pid=trade',
    title: 'Trade',
  },
  {
    id: 'assets',
    href: '/wallet/?pid=assets',
    title: 'Assets',
  },
  {
    id: 'stack',
    href: '/wallet/?pid=stack',
    title: 'Stack',
  },
  {
    id: 'history',
    href: '/wallet/?pid=history',
    title: 'Transaction History',
  },
  {
    id: 'claim',
    href: '/wallet/?pid=claim',
    title: 'Claim Reward',
  },
];

interface TabPanelProps {
  children: JSX.Element;
  value: string | string[] | number | null;
  index: string | string[] | number | null;
};

const TabPanel = ({ children, value, index, ...other }: TabPanelProps): JSX.Element => (
  <Box component="div" hidden={value !== index} {...other}>
    {value === index && children}
  </Box>
);

const WalletView = (): JSX.Element => {
  const classes = useStyles();
  let pageId = parse(window.location.search).pid || 'trade';

  const connectedString = useContext(UserContext);
  let decodedObj:any = connectedString ? jwt_decode(connectedString) : "";
  const [userAccountAPI, setUserAccountAPI] = useState(null);
  const [transactionHistory, setTransactionHistory] = useState([]);

  const stxAddress = decodedObj ? decodedObj.profile.stxAddress.mainnet : "";
  useEffect(() => {
    fetchAccount(stxAddress).then(acc => {
      console.log("Account:")
      console.log(acc);
      setUserAccountAPI(acc);
    });

    fetchAccountTransactions(stxAddress).then(transactions => {
      console.log("Transactions:")
      console.log(transactions)
      setTransactionHistory(transactions);
    })

  }, [stxAddress]);

  return (
    <div className={classes.root}>
      <Hero account={userAccountAPI}/>
      <SectionAlternate className={classes.section}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <CardBase withShadow align="left" className={classes.menu}>
              <List disablePadding className={classes.list}>
                {subPages.map((item, index) => (
                  <ListItem
                    key={index}
                    component={'a'}
                    href={item.href}
                    className={clsx(
                      classes.listItem,
                      pageId === item.id ? classes.listItemActive : {},
                    )}
                    disableGutters
                  >
                    <Typography
                      variant="subtitle1"
                      noWrap
                      color="textSecondary"
                      className="menu__item"
                    >
                      {item.title}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </CardBase>
          </Grid>
          <Grid item xs={12} md={9}>
            <CardBase withShadow align="left">
              <>
              <TabPanel value={pageId} index={'trade'}>
                <Trade account={userAccountAPI}/>
              </TabPanel>
              <TabPanel value={pageId} index={'assets'}>
                <Assets account={userAccountAPI}/>
              </TabPanel>
              <TabPanel value={pageId} index={'stack'}>
                <Stacking account={userAccountAPI}/>
              </TabPanel>
              <TabPanel value={pageId} index={'history'}>
                <History account={userAccountAPI} transactions = {transactionHistory}/>
              </TabPanel>
              <TabPanel value={pageId} index={'claim'}>
                <Claim account={userAccountAPI} transactions = {transactionHistory}/>
              </TabPanel>
              </>
            </CardBase>
          </Grid>
        </Grid>
      </SectionAlternate>
    </div>
  );
};

export default WalletView;
