import { lazy } from 'react';

interface LazyImportProps {
  fileName: string;
}

function LazyImport(props: LazyImportProps) {
  const { fileName } = props;

  const updatedFileName = fileName.replace(/[^\w]*/, '');
  const Screen = lazy(() => import(`../../${updatedFileName}`));

  return <Screen />;
}

export default LazyImport;
