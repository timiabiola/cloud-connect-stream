
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const HomeLoading = () => {
  return (
    <div className="p-4 pt-8 space-y-6">
      <Skeleton className="h-10 w-3/4" />
      <Skeleton className="h-6 w-1/2" />
      <Skeleton className="h-32 w-full rounded-xl" />
      <div className="grid grid-cols-3 gap-3">
        <Skeleton className="h-20 w-full rounded-xl" />
        <Skeleton className="h-20 w-full rounded-xl" />
        <Skeleton className="h-20 w-full rounded-xl" />
      </div>
      <Skeleton className="h-48 w-full rounded-xl" />
      <Skeleton className="h-24 w-full rounded-xl" />
    </div>
  );
};

export default HomeLoading;
