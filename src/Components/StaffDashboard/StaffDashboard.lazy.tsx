import React, { lazy, Suspense } from 'react';

const LazyStaffDashboard = lazy(() => import('./StaffDashboard'));

const StaffDashboard = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyStaffDashboard {...props} />
  </Suspense>
);

export default StaffDashboard;
