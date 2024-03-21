import React, { lazy, Suspense } from 'react';
import { Dish } from '../../Models/Dish';

const LazyDishDetails = lazy(() => import('./DishDetails'));

const DishDetails = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyDishDetails  {...props} />
  </Suspense>
);

export default DishDetails;
