import { createStyles, makeStyles, Theme, Container, Box, Typography } from 'Components/Material';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    welcome: {
      backgroundImage: `url(${process.env.PUBLIC_URL}/static/images/background/welcome_header.svg)`,
      backgroundPosition: 'left center',
      backgroundRepeat: 'no-repeat',
      height: theme.spacing(25),
    },
    welcomeTitle: {
      fontWeight: 900,
      padding: theme.spacing(0, 0, 1, 0),
    },
    welcomeSubTitle: {},
  }),
);

function Welcome() {
  const classes = useStyles();

  return (
    <Box
      sx={{
        borderBottom: 1,
        borderColor: 'grey.500',
        display: 'flex',
        width: '100%',
      }}
      className={classes.welcome}
    >
      <Container maxWidth="md">
        <Box sx={{ marginY: 8 }}>
          <Typography className={classes.welcomeTitle} variant="h4">
            Feng, 欢迎您
          </Typography>
          <Typography className={classes.welcomeSubTitle} variant="subtitle1">
            开始使用 Tenon Platform
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

function HomeScreen() {
  return (
    <>
      <Welcome />
      <Container maxWidth="md">
        <Box>测试</Box>
      </Container>
    </>
  );
}

export default HomeScreen;
