import { useState, SyntheticEvent, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from 'Stores/reducers';
import { setStatus as setProjectStatus } from './DashboardProjectSlice';
import {
  makeStyles,
  useTheme,
  Tab,
  Tabs,
  InputAdornment,
  TextField,
  Box,
  Modal,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  IconButton,
  useMediaQuery,
} from 'Components/Material';
import { SearchIcon, SettingsIcon, ExpandMoreIcon } from 'Components/Icons';

const useStyles = makeStyles((theme) => ({
  sidebar: {
    margin: theme.spacing(0, 2, 0, 2),
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardRoot: {
    width: '756px',
  },
  cardContent: {
    padding: theme.spacing(0),
  },
}));

export function DashboardSelectProjectModal() {
  const classes = useStyles();

  const theme = useTheme();

  const dispatch = useDispatch();

  const projectStatus = useSelector((state: RootState) => state.ContainerDashboardProjectReducer.status);

  const [value, setValue] = useState(1);

  const handleChange = (event: SyntheticEvent, value: any) => {
    setValue(value);
  };

  const handleProjectModalClose = () => {
    dispatch(setProjectStatus(false));
  };

  return (
    <Modal keepMounted open={projectStatus} onClose={handleProjectModalClose} className={classes.modal}>
      <Card className={classes.cardRoot}>
        <CardHeader
          action={
            <>
              <IconButton>
                <SettingsIcon />
              </IconButton>
              <Button color="inherit">新建项目</Button>
            </>
          }
          title="选择项目"
        />
        <CardContent className={classes.cardContent}>
          <Box
            sx={{
              padding: theme.spacing(0, 2, 2, 2),
            }}
          >
            <TextField
              label="搜索项目和文件夹"
              fullWidth
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary">
            <Tab label="最近" value={1} />
            <Tab label="全部" value={2} />
          </Tabs>
          <Box
            sx={{
              minHeight: '200px',
            }}
          >
            {value === 1 && <div>Item One</div>}
            {value === 2 && <div>Item Two</div>}
          </Box>
        </CardContent>

        <CardActions disableSpacing>
          <Box
            sx={{
              marginLeft: 'auto',
            }}
          >
            <Button color="inherit" onClick={handleProjectModalClose}>
              取消
            </Button>
            <Button disabled>打开</Button>
          </Box>
        </CardActions>
      </Card>
    </Modal>
  );
}
export function DashboardDesktopSelectProject() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const handleProjectModalOpen = () => {
    dispatch(setProjectStatus(true));
  };

  return (
    <Button color="inherit" className={classes.sidebar} onClick={handleProjectModalOpen}>
      选择项目
      <ExpandMoreIcon />
    </Button>
  );
}
