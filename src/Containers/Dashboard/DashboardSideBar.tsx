import { useState, MouseEvent, useRef } from 'react';

import {
  makeStyles,
  createStyles,
  useTheme,
  useMediaQuery,
  Box,
  Drawer,
  Collapse,
  IconButton,
  Popover,
  List,
  ListSubheader,
  ListItem,
  ListItemIcon,
  ListItemText,
} from 'Components/Material';
import { MenuIcon, HomeIcon, ArrowRightIcon, ExpandMoreIcon, ExpandLessIcon } from 'Components/Icons';

import { SideBarMenuEntry, SideBarMenuItemEntry } from 'Utils/Menu';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 240,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }),
);

interface SideBarMenuItemProps {
  mobile: boolean;
  menu: SideBarMenuItemEntry;
  anchorEl: null | HTMLElement;
  handleMouseEnter: (event: MouseEvent<HTMLDivElement>) => void;
  handleClose: (event: MouseEvent<HTMLDivElement>) => void;
  handleNavigation: (event: MouseEvent<HTMLDivElement>) => void;
}

function SideBarMenuItem(props: SideBarMenuItemProps) {
  const ref = useRef(null);

  const classes = useStyles();

  const { menu, mobile, anchorEl, handleMouseEnter, handleClose, handleNavigation } = props;

  const [mobileCollapseOpen, setMobileCollapseOpen] = useState(false);

  const isOpen = anchorEl ? ref.current === anchorEl : false;

  const hasChildren = menu.children?.length || false;

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    setMobileCollapseOpen(!mobileCollapseOpen);
  };

  return (
    <>
      <ListItem ref={ref} button disableRipple onClick={handleClick} onMouseEnter={handleMouseEnter}>
        {menu.icon && <ListItemIcon>{menu.icon}</ListItemIcon>}
        <ListItemText primary={menu.title} />
        {mobile && hasChildren && (mobileCollapseOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
        {!mobile && hasChildren && <ArrowRightIcon />}
      </ListItem>
      {mobile && menu.children && (
        <Collapse in={mobileCollapseOpen} timeout="auto">
          {menu.children.map((item) => (
            <List key={item.title} component="div" disablePadding>
              <ListItem button className={classes.nested}>
                {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                <ListItemText primary={item.title} />
              </ListItem>
            </List>
          ))}
        </Collapse>
      )}
      {!mobile && hasChildren && (
        <Popover
          keepMounted
          style={{ pointerEvents: 'none' }}
          anchorEl={anchorEl}
          open={isOpen}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'left',
          }}
          PaperProps={{
            elevation: 4,
            onMouseLeave: handleClose,
          }}
        >
          {menu.children?.map((item) => (
            <List key={item.title} component="div" disablePadding style={{ pointerEvents: 'auto' }}>
              <ListItem button onClick={handleNavigation}>
                {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                <ListItemText primary={item.title} />
              </ListItem>
            </List>
          ))}
        </Popover>
      )}
    </>
  );
}

function DashboardSideBar() {
  const theme = useTheme();

  const mobile = useMediaQuery(theme.breakpoints.down('md'));

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
    if (!open) {
      setAnchorEl(null);
    }
  };

  const handleMouseEnter = (event: MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMouseLeave = (event: MouseEvent<HTMLDivElement>) => {
    setAnchorEl(null);
  };

  const handleNavigation = (event: MouseEvent<HTMLDivElement>) => {};

  const menus: SideBarMenuEntry[] = [
    {
      items: [
        {
          icon: <HomeIcon />,
          title: '首页',
          children: [
            {
              title: '首页1-1',
              icon: <HomeIcon />,
            },
            {
              title: '首页1-2',
              icon: <HomeIcon />,
            },
            {
              title: '首页1-3',
              icon: <HomeIcon />,
            },
          ],
        },
      ],
    },
    {
      subHeader: '测试菜单',
      items: [
        {
          icon: <HomeIcon />,
          title: '测试菜单1',
          children: [
            {
              title: '测试菜单1-1',
              icon: <HomeIcon />,
            },
            {
              title: '测试菜单1-2',
              icon: <HomeIcon />,
            },
            {
              title: '测试菜单1-3',
              icon: <HomeIcon />,
            },
          ],
        },
        {
          icon: <HomeIcon />,
          title: '测试菜单2',
          children: [
            {
              title: '测试菜单2-1',
              icon: <HomeIcon />,
            },
            {
              title: '测试菜单2-2',
              icon: <HomeIcon />,
            },
            {
              title: '测试菜单2-3',
              icon: <HomeIcon />,
            },
          ],
        },
        {
          icon: <HomeIcon />,
          title: '测试菜单3',
        },
      ],
    },
  ];

  return (
    <>
      <IconButton edge="start" color="inherit" onClick={handleDrawerToggle}>
        <MenuIcon />
      </IconButton>
      <Drawer
        variant="temporary"
        open={open}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <Box
          sx={{
            width: '240px',
          }}
        >
          {menus.map((menu, index) => (
            <List
              key={index}
              component="nav"
              subheader={menu.subHeader ? <ListSubheader component="div">{menu.subHeader}</ListSubheader> : null}
            >
              {menu.items.map((item, index) => (
                <SideBarMenuItem
                  key={index}
                  mobile={mobile}
                  menu={item}
                  anchorEl={anchorEl}
                  handleMouseEnter={handleMouseEnter}
                  handleClose={handleMouseLeave}
                  handleNavigation={handleNavigation}
                />
              ))}
            </List>
          ))}
        </Box>
      </Drawer>
    </>
  );
}

export default DashboardSideBar;
