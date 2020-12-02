import { Suspense, ReactNode } from 'react';

import { Backdrop, CircularProgress } from 'Components/Material';

interface LazyLoadingProps {
  children: ReactNode;
}

function LazyLoading(props: LazyLoadingProps) {
  const { children } = props;

  const loading = (
    <Backdrop open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );

  return <Suspense fallback={loading}>{children}</Suspense>;
}

export default LazyLoading;
