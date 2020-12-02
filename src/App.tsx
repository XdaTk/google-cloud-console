import { lazy, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';

import { createMuiTheme, zhCN, useMediaQuery, ThemeProvider, CssBaseline } from 'Components/Material';
import { LazyLoading } from 'Components/Screen';

import { EmptyContainer } from 'Containers/Empty';
import { DashboardContainer } from 'Containers/Dashboard';

import Store from 'Stores';

import 'Asserts/Styles/fonts.css';

const HomeScreen = lazy(() => import('Screens/Home'));

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(
    () =>
      createMuiTheme(
        {
          palette: {
            mode: prefersDarkMode ? 'dark' : 'light',
          },
        },
        zhCN,
      ),
    [prefersDarkMode],
  );

  return (
    <Provider store={Store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />·
        <Router>
          <Routes>
            <Route element={<EmptyContainer />}>
              <LazyLoading>
                <Route element={<DashboardContainer />}>
                  <Route path="/" element={<Navigate to="home" />} />
                  <Route path="home/*" element={<HomeScreen />} />
                </Route>
              </LazyLoading>
            </Route>
            <Route path="*" element={<div>404</div>} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
