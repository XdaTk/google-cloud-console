import { useState, MouseEvent } from 'react';
import { useDispatch } from 'react-redux';

import { setStatus as setSearchStatus } from './DashboardSearchSlice';

import {
  makeStyles,
  IconButton,
  Avatar,
  Badge,
  Menu,
  MenuItem,
  Divider,
  Popover,
  useMediaQuery,
  useTheme,
} from 'Components/Material';
import { HelpIcon, NotificationsIcon, MoreVertIcon, SearchIcon, OpenInNewIcon } from 'Components/Icons';

const useStyles = makeStyles((theme) => ({
  icon: {
    width: '0.7em',
    height: '0.7em',
  },
}));

function DashboardMenu() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const theme = useTheme();

  const matches = useMediaQuery(theme.breakpoints.down('md'));

  const [helpAnchorEl, setHelpAnchorEl] = useState<null | HTMLElement>(null);

  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState<null | HTMLElement>(null);

  const [moreAnchorEl, setMoreAnchorEl] = useState<null | HTMLElement>(null);

  const [userAnchorEl, setUserAnchorEl] = useState<null | HTMLElement>(null);

  const handleHelpMenuClick = (event: MouseEvent<HTMLButtonElement>) => {
    setHelpAnchorEl(event.currentTarget);
  };

  const handleHelpMenuClose = () => {
    setHelpAnchorEl(null);
  };

  const handleNotificationsMenuClick = (event: MouseEvent<HTMLButtonElement>) => {
    setNotificationsAnchorEl(event.currentTarget);
  };

  const handleNotificationsMenuClose = () => {
    setNotificationsAnchorEl(null);
  };

  const handleMoreMenuClick = (event: MouseEvent<HTMLButtonElement>) => {
    setMoreAnchorEl(event.currentTarget);
  };

  const handleMoreMenuClose = () => {
    setMoreAnchorEl(null);
  };

  const handleUserMenuClick = (event: MouseEvent<HTMLButtonElement>) => {
    setUserAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserAnchorEl(null);
  };

  const handleSearchStatus = () => {
    dispatch(setSearchStatus('open'));
  };

  const helpMenu = (
    <Menu
      keepMounted
      anchorEl={helpAnchorEl}
      open={Boolean(helpAnchorEl)}
      onClose={handleHelpMenuClose}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      <MenuItem>
        文档 <OpenInNewIcon className={classes.icon} />
      </MenuItem>
      <MenuItem>开始学习教程</MenuItem>
      <MenuItem>获取帮助</MenuItem>
      <MenuItem>帮助</MenuItem>
      <Divider />
      <MenuItem>键盘快捷键</MenuItem>
      <Divider />
      <MenuItem>发送反馈</MenuItem>
    </Menu>
  );

  const notificationsMenu = (
    <Popover
      keepMounted
      anchorEl={notificationsAnchorEl}
      open={Boolean(notificationsAnchorEl)}
      onClose={handleNotificationsMenuClose}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      消息组件
    </Popover>
  );

  const moreMenu = (
    <Menu
      keepMounted
      anchorEl={moreAnchorEl}
      open={Boolean(moreAnchorEl)}
      onClose={handleMoreMenuClose}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      <MenuItem>偏好设置</MenuItem>
      <Divider />
      <MenuItem>
        下载 <OpenInNewIcon className={classes.icon} />
      </MenuItem>
      <MenuItem>
        合作伙伴 <OpenInNewIcon className={classes.icon} />
      </MenuItem>
      <Divider />
      <MenuItem>服务条款</MenuItem>
      <MenuItem>
        隐私权 <OpenInNewIcon className={classes.icon} />
      </MenuItem>
    </Menu>
  );

  const userMenu = (
    <Popover
      keepMounted
      anchorEl={userAnchorEl}
      open={Boolean(userAnchorEl)}
      onClose={handleUserMenuClose}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      个人设置面板
    </Popover>
  );

  return (
    <>
      {matches && (
        <IconButton color="inherit" onClick={handleSearchStatus}>
          <SearchIcon className={classes.icon} />
        </IconButton>
      )}
      {!matches && (
        <IconButton color="inherit" onClick={handleHelpMenuClick}>
          <HelpIcon className={classes.icon} />
        </IconButton>
      )}
      <IconButton color="inherit" onClick={handleNotificationsMenuClick}>
        <Badge badgeContent={4} color="secondary">
          <NotificationsIcon className={classes.icon} />
        </Badge>
      </IconButton>
      <IconButton color="inherit" onClick={handleMoreMenuClick}>
        <MoreVertIcon className={classes.icon} />
      </IconButton>
      {!matches && (
        <IconButton size="small" color="inherit" onClick={handleUserMenuClick}>
          <Avatar alt="avatar" src={process.env.PUBLIC_URL + '/static/images/user/avatar.jpg'} />
        </IconButton>
      )}
      {helpMenu}
      {notificationsMenu}
      {moreMenu}
      {userMenu}
    </>
  );
}

export default DashboardMenu;
