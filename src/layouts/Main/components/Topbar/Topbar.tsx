import React, { useContext, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  Toolbar,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  Popover,
  Typography,
  IconButton,
  Button,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MenuIcon from '@material-ui/icons/Menu';
import { Image, DarkModeToggler } from 'components/atoms';
import { UserContext } from 'App';
import { useConnect } from '@stacks/connect-react';

const useStyles = makeStyles(theme => ({
  flexGrow: {
    flexGrow: 1,
  },
  navigationContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toolbar: {
    zIndex: 999,
    maxWidth: theme.layout.contentWidth,
    width: '100%',
    margin: '0 auto',
    padding: theme.spacing(0, 2),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(0, 8),
    },
  },
  navLink: {
    '&:hover': {
      color: theme.palette.primary.dark,
    },
  },
  listItem: {
    cursor: 'pointer',
    '&:hover > .menu-item, &:hover svg': {
      color: theme.palette.primary.dark,
    },
    '&.menu-item--no-dropdown': {
      paddingRight: 0,
    },
  },
  listItemActive: {
    '&> .menu-item': {
      color: theme.palette.primary.dark,
    },
  },
  listItemText: {
    flex: '0 0 auto',
    marginRight: theme.spacing(2),
    whiteSpace: 'nowrap',
  },
  listItemButton: {
    whiteSpace: 'nowrap',
  },
  listItemIcon: {
    minWidth: 'auto',
  },
  popover: {
    padding: theme.spacing(4),
    border: theme.spacing(2),
    boxShadow: '0 0.5rem 2rem 2px rgba(116, 123, 144, 0.09)',
    minWidth: 350,
    marginTop: theme.spacing(2),
  },
  iconButton: {
    marginLeft: theme.spacing(2),
    padding: 0,
    '&:hover': {
      background: 'transparent',
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
    color: theme.palette.primary.dark,
  },
  logoContainer: {
    width: 100,
    height: 28,
    [theme.breakpoints.up('md')]: {
      width: 120,
      height: 32,
    },
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  menu: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  menuItem: {
    marginRight: theme.spacing(5),
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
}));

interface Props {
  className?: string;
  onSidebarOpen: Function,
  pages: PagesProps;
  themeMode: string;
  themeToggler: Function;
};

const Topbar = ({ themeMode, themeToggler, onSidebarOpen, pages, className, ...rest }: Props): JSX.Element => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState<any>(null);
  const [openedPopoverId, setOpenedPopoverId] = useState<string | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>, popoverId: string | null): void => {
    setAnchorEl(event.target);
    setOpenedPopoverId(popoverId);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
    setOpenedPopoverId(null);
  };

  const logout = (): void => {
    localStorage.setItem('id', '');
    window.location.href = '/'
  }

  const { doOpenAuth } = useConnect();

  const connectedString = useContext(UserContext);

  const landings = pages.landings;
  const supportedPages = pages.pages;
  const account = pages.account;

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
            variant="body1"
            component={'a'}
            href={page.href}
            className={clsx(classes.navLink, 'submenu-item')}
            color="textSecondary"
            onClick={handleClose}
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
        </div>
        <div className={classes.menuItem}>
          <MenuGroup item={company} />
          <MenuGroup item={contact} />
        </div>
        <div className={classes.menuItem}>
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
        </div>
        <div className={classes.menuItem}>
          <MenuGroup item={signup} />
          <MenuGroup item={signin} />
        </div>
        <div className={classes.menuItem}>
          <MenuGroup item={password} />
          <MenuGroup item={error} />
        </div>
      </div>
    );
  };

  const renderPages = (id: string): JSX.Element | null => {
    if (id === 'landing-pages') {
      return <LandingPages />;
    }
    if (id === 'supported-pages') {
      return <SupportedPages />;
    }
    if (id === 'account') {
      return <AccountPages />;
    }
    return null;
  };

  return (
    <Toolbar disableGutters className={classes.toolbar} {...rest}>
      <div className={classes.logoContainer}>
        <a href="/" title="neptune">
          <Image
            className={classes.logoImage}
            src={themeMode === 'light' ? 'https://crashcodeexamples.s3.us-east-2.amazonaws.com/neptune.svg' : 'https://crashcodeexamples.s3.us-east-2.amazonaws.com/neptune-dark.svg'}
            alt="neptune"
            lazy={false}
          />
        </a>
      </div>
      <div className={classes.flexGrow} />
      <Hidden smDown>
        <List disablePadding className={classes.navigationContainer}>
        
          <ListItem
                aria-describedby={"1"}
                //onClick={e => handleClick(e, "1")}
                className={clsx(
                  classes.listItem,
                  openedPopoverId === "1" ? classes.listItemActive : '',
                )}
              >
                <Typography
                  variant="body1"
                  component={'a'}
                  href={"#FAQs"}
                  color="textPrimary"
                  className={clsx(classes.listItemText, 'menu-item')}
                >
                  What is Stacks
                </Typography>
              </ListItem>
              <ListItem
                aria-describedby={"1"}
                //onClick={e => handleClick(e, "1")}
                className={clsx(
                  classes.listItem,
                  openedPopoverId === "1" ? classes.listItemActive : '',
                )}
              >
                <Typography
                  variant="body1"
                  component={'a'}
                  href={"#About"}
                  color="textPrimary"
                  className={clsx(classes.listItemText, 'menu-item')}
                >
                  About
                </Typography>
              </ListItem>
          {/* {[landings, supportedPages, account].map((page, i) => (
            <div key={page.id}>
              <ListItem
                aria-describedby={page.id}
                onClick={e => handleClick(e, page.id)}
                className={clsx(
                  classes.listItem,
                  openedPopoverId === page.id ? classes.listItemActive : '',
                )}
              >
                <Typography
                  variant="body1"
                  color="textPrimary"
                  className={clsx(classes.listItemText, 'menu-item')}
                >
                  {page.title}
                </Typography>
                <ListItemIcon className={classes.listItemIcon}>
                  <ExpandMoreIcon
                    className={
                      openedPopoverId === page.id ? classes.expandOpen : ''
                    }
                    fontSize="small"
                  />
                </ListItemIcon>
              </ListItem>
              <Popover
                elevation={1}
                id={page.id}
                open={openedPopoverId === page.id}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                classes={{ paper: classes.popover }}
              >
                <div>{renderPages(page.id)}</div>
              </Popover>
            </div>
          ))} */}
          
          {/* <ListItem className={clsx(classes.listItem, 'menu-item--no-dropdown')}>
            <Button
              variant="outlined"
              component="a"
              href="/documentation"
            >
              Documentation
            </Button>
          </ListItem> */}
          {/* <ListItem className={clsx(classes.listItem, 'menu-item--no-dropdown')}>
            <Button
              variant="contained"
              color="primary"
              component="a"
              target="blank"
              href="https://material-ui.com/store/items/the-front-landing-page/"
              className={classes.listItemButton}
            >
              Connect Wallet
            </Button>
          </ListItem> */}
           <ListItem className={clsx(classes.listItem, 'menu-item--no-dropdown')}>
            <DarkModeToggler themeMode={themeMode} onClick={() => themeToggler()} />
          </ListItem>
          <ListItem
                aria-describedby={"1"}
                //onClick={e => handleClick(e, "1")}
                className={clsx(
                  classes.listItem,
                  openedPopoverId === "1" ? classes.listItemActive : '',
                )}
              >
                {
                  connectedString ?
                  <Typography
                  variant="body1"
                  component={'a'}
                  href={"/wallet"}
                  color="textPrimary"
                  className={clsx(classes.listItemText, 'menu-item')}
                  style={{color:"green"}}
                >
                  CONNECTED •
                </Typography> 
                  : (
                    <Typography
                  variant="body1"
                  // component={'a'}
                  // href={"#About"}
                  onClick={()=>doOpenAuth()}
                  color="textPrimary"
                  className={clsx(classes.listItemText, 'menu-item')}
                  style={{color:"red"}}
                >
                  DISCONNECTED •
                </Typography>
                  )
                }
                
              </ListItem>
             {
               connectedString ? (
              <ListItem className={clsx(classes.listItem, 'menu-item--no-dropdown')}>
                <Button
                  variant="contained"
                  color="primary"
                  component="a"
                  target="blank"
                  className={classes.listItemButton}
                  onClick={()=>logout()}
                >
                  Logout
                </Button>
              </ListItem>
               )
               : (<></>)
             }
               
        </List>
      </Hidden>
      <Hidden mdUp>
        <DarkModeToggler themeMode={themeMode} onClick={() => themeToggler()} />
        <IconButton
          className={classes.iconButton}
          onClick={() => onSidebarOpen()}
          aria-label="Menu"
        >
          <MenuIcon />
        </IconButton>
      </Hidden>
    </Toolbar>
  );
};

export default Topbar;
