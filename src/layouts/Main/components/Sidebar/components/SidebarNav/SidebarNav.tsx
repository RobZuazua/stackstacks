/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { useContext } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, Typography, ListItemIcon, Divider, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useConnect } from '@stacks/connect-react';
import { UserContext } from 'App';

const useStyles = makeStyles(theme => ({
  root: {
  },
  listItem: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  navLink: {
    '&:hover': {
      color: theme.palette.primary.dark,
    },
  },
  listItemIcon: {
    minWidth: 'auto',
  },
  closeIcon: {
    justifyContent: 'flex-end',
    cursor: 'pointer',
  },
  menu: {
    display: 'flex',
  },
  menuItem: {
    marginRight: theme.spacing(8),
    '&:last-child': {
      marginRight: 0,
    },
  },
  menuGroupItem: {
    paddingTop: 0,
  },
  menuGroupTitle: {
    textTransform: 'uppercase',
  },
  divider: {
    width: '100%',
  },
}));

interface Props {
  className?: string;
  onClose: Function;
  pages: PagesProps;
};

const SidebarNav = ({ pages, onClose, className, ...rest }: Props): JSX.Element => {
  const classes = useStyles();

  const landings = pages.landings;
  const supportedPages = pages.pages;
  const account = pages.account;
  const { doOpenAuth } = useConnect();

  const connectedString = useContext(UserContext);

  const logout = (): void => {
    localStorage.setItem('id', '');
    window.location.href = '/'
  }

  const MenuGroup = ({ item }: MenuGroupProps): JSX.Element => (
    <List disablePadding>
      <ListItem disableGutters>
        <Typography
          variant="body2"
          color="primary"
          className={classes.menuGroupTitle}
        >
          {item.groupTitle}
        </Typography>
      </ListItem>
      {item.pages.map((page, i) => (
        <ListItem disableGutters key={i} className={classes.menuGroupItem}>
          <Typography
            variant="body2"
            component={'a'}
            href={page.href}
            className={clsx(classes.navLink, 'submenu-item')}
            color="textPrimary"
            onClick={() => onClose()}
          >
            {page.title}
          </Typography>
        </ListItem>
      ))}
    </List>
  );

  const LandingPages = (): JSX.Element => {
    const { services, apps, web } = landings.children;
    return (
      <div className={classes.menu}>
        <div className={classes.menuItem}>
          <MenuGroup item={services} />
          <MenuGroup item={apps} />
        </div>
        <div className={classes.menuItem}>
          <MenuGroup item={web} />
        </div>
      </div>
    );
  };

  const SupportedPages = (): JSX.Element => {
    const {
      career,
      helpCenter,
      company,
      contact,
      blog,
      portfolio,
    } = supportedPages.children;
    return (
      <div className={classes.menu}>
        <div className={classes.menuItem}>
          <MenuGroup item={career} />
          <MenuGroup item={helpCenter} />
          <MenuGroup item={company} />
        </div>
        <div className={classes.menuItem}>
          <MenuGroup item={contact} />
          <MenuGroup item={blog} />
          <MenuGroup item={portfolio} />
        </div>
      </div>
    );
  };

  const AccountPages = (): JSX.Element => {
    const { settings, signup, signin, password, error } = account.children;
    return (
      <div className={classes.menu}>
        <div className={classes.menuItem}>
          <MenuGroup item={settings} />
          <MenuGroup item={signup} />
        </div>
        <div className={classes.menuItem}>
          <MenuGroup item={signin} />
          <MenuGroup item={password} />
          <MenuGroup item={error} />
        </div>
      </div>
    );
  };

  return (
    <List {...rest} className={clsx(classes.root, className)}>
      <ListItem className={classes.closeIcon} onClick={() => onClose()}>
        <ListItemIcon className={classes.listItemIcon}>
          <CloseIcon fontSize="small" />
        </ListItemIcon>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Typography variant="h6" color="textPrimary" onClick={() => onClose()} gutterBottom component={'a'} href={"/#FAQs"}>
          What is Stacks
        </Typography>
        {/* <LandingPages /> */}
      </ListItem>
      <ListItem className={classes.listItem}>
        <Divider className={classes.divider} />
      </ListItem>
      <ListItem className={classes.listItem}>
        <Typography variant="h6" color="textPrimary" onClick={() => onClose()} gutterBottom component={'a'} href={"/#About"}>
          About
        </Typography>
        {/* <SupportedPages /> */}
      </ListItem>
      <ListItem className={classes.listItem}>
        <Divider className={classes.divider} />
      </ListItem>
      {/* <ListItem className={classes.listItem}>
        <Typography variant="h6" color="textPrimary" gutterBottom>
          Account
        </Typography>
        <AccountPages />
      </ListItem> */}
      {/* <ListItem className={classes.listItem}>
        <Button
          variant="outlined"
          fullWidth
          component="a"
          href="/documentation"
        >
          Documentation
        </Button>
      </ListItem> */}
      <ListItem className={classes.listItem}>
        {
          connectedString ? (
          <Button
          variant="contained"
          color="primary"
          fullWidth
          component="a"
          target="blank"
          href="/wallet"
         >
          Go to Wallet!
        </Button>
          )
          : (
          <Button
          variant="contained"
          color="primary"
          fullWidth
          component="a"
          target="blank"
          onClick={()=>doOpenAuth()}
        >
          Connect Wallet
        </Button>
          )
        }
      </ListItem>
      {
               connectedString ? (
                <ListItem className={classes.listItem}>
                <Button
                  variant="outlined"
                  fullWidth
                  component="a"
                  onClick={()=>logout()}
                >
                  Logout
                </Button>
              </ListItem>
               )
               : (<></>)
             }
    </List>
  );
};

export default SidebarNav;
