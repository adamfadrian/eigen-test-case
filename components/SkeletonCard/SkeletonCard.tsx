import React, { FC } from 'react';
import { Card, Skeleton } from 'antd';

interface CardSkeletonProps {
  count: number;
  large?: boolean;
}

const SkeletonCard: FC<CardSkeletonProps> = ({ count, large = false }) => {
   return (
    <div
    className={`relative w-full col-span-1 ${large ? 'md:col-span-2' : ''} w-full p-4`}
  >
    <Card
      hoverable
      style={{ minWidth: 240,  minHeight: 480 }}
      cover={
        <Skeleton.Image
          active
          style={{ width: '100%', height: '240px', borderRadius: '8px' }}
        />
      }
    >
      <div className="flex flex-col gap-4">
        <Skeleton.Button
          active
          style={{ height: '3rem', width: '100%', marginBottom: '0.5rem' }}
        />
        <Skeleton active paragraph={{ rows: 2, width: '100%' }} />
      </div>
      <Skeleton.Button
        active
        style={{ zIndex: 20, marginTop: '1rem', alignSelf: 'flex-end' }}
      />
    </Card>
  </div>
   )

};

export default SkeletonCard;
