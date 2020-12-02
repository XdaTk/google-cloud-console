import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { makeStyles, useTheme, useMediaQuery, AppBar, ToolBar, Typography } from 'Components/Material';

import { RootState } from 'Stores/reducers';

import DashboardAppSideBar from './DashboardSideBar';
import DashboardSearch from './DashboardSearch';
import { DashboardDesktopSelectProject, DashboardSelectProjectModal } from './DashboardSelectProject';
import DashboardMenu from './DashboardMenu';

export const useStyles = makeStyles((theme) => ({
  root: {},
  toolbar: {
    padding: theme.spacing(0),
    margin: theme.spacing(0, 3, 0, 3),
  },
  project: {
    margin: theme.spacing(0, 2, 0, 2),
  },
  grow: {
    flexGrow: 1,
  },
  main: {
    marginTop: theme.spacing(6),
  },
}));

function DashboardContainer() {
  const classes = useStyles();

  const theme = useTheme();

  const matches = useMediaQuery(theme.breakpoints.down('md'));

  const searchStatus = useSelector((state: RootState) => state.ContainerDashboardSearchReducer.status);

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <ToolBar variant="dense" className={classes.toolbar}>
          {matches && searchStatus !== 'close' && <DashboardSearch />}
          {!(matches && searchStatus !== 'close') && (
            <>
              <DashboardAppSideBar />
              <Typography variant="h5">Tenon</Typography>
              {!matches && <DashboardDesktopSelectProject />}
              <div className={classes.grow} />
              {!matches && <DashboardSearch />}
              <div className={classes.grow} />
              <DashboardMenu />
            </>
          )}
          <DashboardSelectProjectModal />
        </ToolBar>
      </AppBar>
      <main className={classes.main}>
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardContainer;
