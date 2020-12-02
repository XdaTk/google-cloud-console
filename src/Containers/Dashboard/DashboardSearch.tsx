import { useContext } from 'react';
import clsx from 'clsx';

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

import { DashBoardSearchContext } from './DashboardContext';

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
      width: '100%',
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
    paddingLeft: `calc(${theme.spacing(6)})`,
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

  const { status, handleStatus, settingStatus, handleSettingStatus } = useContext(DashBoardSearchContext);

  return (
    <div className={clsx(classes.root, status && classes.rootSelected)}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="搜索"
        type="text"
        fullWidth={true}
        onFocus={handleStatus}
        classes={{
          input: clsx(classes.inputInput, status && classes.componentSelected),
        }}
      />
      <div className={classes.settingIcon}>
        <IconButton size="small" color="inherit" className={clsx(status && classes.componentSelected)}>
          <ClearIcon />
        </IconButton>
        <IconButton
          size="small"
          color="inherit"
          className={clsx(status && classes.componentSelected)}
          onClick={handleSettingStatus}
        >
          {settingStatus ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </div>
    </div>
  );
}

export function DashboardSearchCollapse() {
  const classes = useStyles();

  const { settingStatus, handleSettingStatus } = useContext(DashBoardSearchContext);

  return (
    <Collapse in={settingStatus} timeout="auto">
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

  const { status, handleStatus } = useContext(DashBoardSearchContext);

  const handleSearchClose = () => {
    if (status) {
      handleStatus!();
    }
  };

  return (
    <ClickAwayListener onClickAway={handleSearchClose}>
      <div className={classes.container}>
        <DashboardSearchInput />
        <DashboardSearchCollapse />
      </div>
    </ClickAwayListener>
  );
}

export default DashboardSearch;
