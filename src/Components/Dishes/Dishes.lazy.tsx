import React, { lazy, Suspense } from 'react';

const LazyDishes = lazy(() => import('./Dishes'));

const Dishes = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyDishes {...props} />
  </Suspense>
);

export default Dishes;
