import { useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { createMuiTheme, zhCN, useMediaQuery, ThemeProvider, CssBaseline } from 'Components/Material';
import { LazyImport, LazyLoading } from 'Components/Screen';

import { EmptyContainer } from 'Containers/Empty';
import { DashboardContainer } from 'Containers/Dashboard';

import 'Asserts/Styles/fonts.css';

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
    <ThemeProvider theme={theme}>
      <CssBaseline />·
      <Router>
        <Routes>
          <Route element={<EmptyContainer />}>
            <LazyLoading>
              <Route element={<DashboardContainer />}>
                <Route path="/" element={<Navigate to="home" />} />
                <Route path="home/*" element={<LazyImport fileName="Screens/Home" />} />
              </Route>
            </LazyLoading>
          </Route>
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
