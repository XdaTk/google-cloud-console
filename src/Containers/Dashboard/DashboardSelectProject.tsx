import { useState, SyntheticEvent, ChangeEvent } from 'react';

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
  Hidden,
  Button,
  IconButton,
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

interface DashboardSelectProjectModal {
  open: boolean;
  handle: () => void;
}

export function DashboardSelectProjectModal(props: DashboardSelectProjectModal) {
  const classes = useStyles();

  const theme = useTheme();

  const { open, handle } = props;

  const [value, setValue] = useState(1);

  const [search, setSearch] = useState('');

  const handleChange = (event: SyntheticEvent, value: any) => {
    setValue(value);
  };

  const handleSearchValue = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <Modal keepMounted open={open} onClose={handle} className={classes.modal}>
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
              value={search}
              label="搜索项目和文件夹"
              onChange={handleSearchValue}
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
            <Button color="inherit" onClick={handle}>
              取消
            </Button>
            <Button disabled>打开</Button>
          </Box>
        </CardActions>
      </Card>
    </Modal>
  );
}

interface DashboardSelectProject {
  open: boolean;
  handle: () => void;
}

export function DashboardSelectProject(props: DashboardSelectProject) {
  const classes = useStyles();

  const { open, handle } = props;

  return (
    <Hidden mdDown>
      <Button color="inherit" className={classes.sidebar} onClick={handle}>
        选择项目
        <ExpandMoreIcon />
      </Button>
    </Hidden>
  );
}
