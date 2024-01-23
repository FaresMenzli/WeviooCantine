import React, { lazy, Suspense } from 'react';

const LazyAdminDashboard = lazy(() => import('./AdminDashboard'));

const AdminDashboard = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyAdminDashboard {...props} />
  </Suspense>
);

export default AdminDashboard;
