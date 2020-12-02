import { MouseEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';

import { RootState } from 'Stores/reducers';
import { setStatus as setSearchStatus } from './DashboardSearchSlice';

import {
  makeStyles,
  alpha,
  Box,
  InputBase,
  Collapse,
  TextField,
  MenuItem,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  IconButton,
  ClickAwayListener,
} from 'Components/Material';
import { ExpandMoreIcon, ClearIcon, SearchIcon, CloseIcon, ExpandLessIcon } from 'Components/Icons';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '40%',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  collapseContainer: {
    width: '40%',
    [theme.breakpoints.down('md')]: {
      width: '40%',
    },
    position: 'absolute',
  },
  root: {
    position: 'static',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'baseline',
    color: 'inherit',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.background.paper, 0.2),
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: theme.spacing(6),
  },
  settingIcon: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingSelect: {
    marginBottom: theme.spacing(3),
  },
  rootSelected: {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.paper,
  },
  componentSelected: {
    color: theme.palette.text.primary,
  },
}));

export function DashboardSearchInput() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const searchStatus = useSelector((state: RootState) => state.ContainerDashboardSearchReducer.status);

  const handleSettingStatus = () => {
    if (searchStatus === 'setting') {
      dispatch(setSearchStatus('close'));
    }

    if (searchStatus === 'open') {
      dispatch(setSearchStatus('setting'));
    }

    if (searchStatus === 'close') {
      dispatch(setSearchStatus('setting'));
    }
  };

  const handleFocusStatus = () => {
    dispatch(setSearchStatus('open'));
  };

  const isSearchClose = searchStatus !== 'close';

  return (
    <div className={clsx(classes.root, isSearchClose && classes.rootSelected)}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="搜索"
        type="text"
        fullWidth={true}
        onFocus={handleFocusStatus}
        classes={{
          input: clsx(classes.inputInput, isSearchClose && classes.componentSelected),
        }}
      />
      <div className={classes.settingIcon}>
        <IconButton size="small" color="inherit" className={clsx(isSearchClose && classes.componentSelected)}>
          <ClearIcon />
        </IconButton>
        <IconButton
          size="small"
          color="inherit"
          className={clsx(isSearchClose && classes.componentSelected)}
          onClick={handleSettingStatus}
        >
          {searchStatus === 'setting' ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </div>
    </div>
  );
}

export function DashboardSearchCollapse() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const searchStatus = useSelector((state: RootState) => state.ContainerDashboardSearchReducer.status);

  const handleSettingStatus = () => {
    if (searchStatus === 'setting') {
      dispatch(setSearchStatus('close'));
    }

    if (searchStatus === 'open') {
      dispatch(setSearchStatus('setting'));
    }

    if (searchStatus === 'close') {
      dispatch(setSearchStatus('setting'));
    }
  };

  return (
    <Collapse in={searchStatus === 'setting'} timeout="auto">
      <div className={clsx(classes.collapseContainer)}>
        <Card>
          <CardHeader
            action={
              <IconButton onClick={handleSettingStatus}>
                <CloseIcon />
              </IconButton>
            }
            title="过滤条件"
          />
          <CardContent>
            <TextField select label="项目" fullWidth size="small" className={classes.settingSelect}>
              <MenuItem>项目</MenuItem>
            </TextField>
            <TextField select label="类型" fullWidth size="small" className={classes.settingSelect}>
              <MenuItem>类型</MenuItem>
            </TextField>
          </CardContent>
          <CardActions disableSpacing>
            <Box
              sx={{
                marginLeft: 'auto',
              }}
            >
              <Button color="inherit">重置</Button>
              <Button color="primary">搜索</Button>
            </Box>
          </CardActions>
        </Card>
      </div>
    </Collapse>
  );
}

function DashboardSearch() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const searchStatus = useSelector((state: RootState) => state.ContainerDashboardSearchReducer.status);

  const handleSearchClose = (event: MouseEvent<Document>) => {
    if (searchStatus !== 'close') {
      dispatch(setSearchStatus('close'));
    }
  };

  return (
    <div className={classes.container}>
      <ClickAwayListener onClickAway={handleSearchClose}>
        <>
          <DashboardSearchInput />
          <DashboardSearchCollapse />
        </>
      </ClickAwayListener>
    </div>
  );
}

export default DashboardSearch;
