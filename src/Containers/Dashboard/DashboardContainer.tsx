import { useCallback, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { makeStyles, useTheme, useMediaQuery, AppBar, ToolBar, Typography } from 'Components/Material';

import { DashBoardSearchContext } from './DashboardContext';
import DashboardAppSideBar from './DashboardSideBar';
import DashboardSearch from './DashboardSearch';
import { DashboardSelectProject, DashboardSelectProjectModal } from './DashboardSelectProject';
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

  const [searchStatus, setSearchStatus] = useState(false);

  const [searchSettingStatus, setSearchSettingStatus] = useState(false);

  const [projectStatus, setProjectStatus] = useState(false);

  const handleSearchStatus = useCallback(() => {
    setSearchStatus((a) => !a);
    if (!searchStatus) {
      setSearchSettingStatus((a) => false);
    }
  }, []);

  const handleSearchSettingStatus = useCallback(() => {
    setSearchSettingStatus((a) => !a);
    if (!searchStatus) {
      setSearchStatus((a) => true);
    }
  }, []);

  const handleProjectStatus = () => {
    setProjectStatus(!projectStatus);
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <DashBoardSearchContext.Provider
          value={{
            status: searchStatus,
            handleStatus: handleSearchStatus,
            settingStatus: searchSettingStatus,
            handleSettingStatus: handleSearchSettingStatus,
          }}
        >
          <ToolBar variant="dense" className={classes.toolbar}>
            {matches && searchStatus && <DashboardSearch />}
            {!(matches && searchStatus) && (
              <>
                <DashboardAppSideBar />
                <Typography variant="h5">Tenon</Typography>
                <DashboardSelectProject open={projectStatus} handle={handleProjectStatus} />
                <div className={classes.grow} />
                {!matches && <DashboardSearch />}
                <div className={classes.grow} />
                <DashboardMenu />
              </>
            )}
            <DashboardSelectProjectModal open={projectStatus} handle={handleProjectStatus} />
          </ToolBar>
        </DashBoardSearchContext.Provider>
      </AppBar>
      <main className={classes.main}>
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardContainer;
