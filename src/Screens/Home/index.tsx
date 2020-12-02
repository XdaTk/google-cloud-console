import { Routes, Route } from 'react-router-dom';

import { EmptyContainer } from 'Containers/Empty';
import HomeScreen from './HomeScreen';

function HomeRoutes() {
  return (
    <Routes>
      <Route path="*" element={<EmptyContainer />}>
        <Route path="/" element={<HomeScreen />} />
        <Route path="me" element={<div>me</div>} />
      </Route>
    </Routes>
  );
}

export default HomeRoutes;
