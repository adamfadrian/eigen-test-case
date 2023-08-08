import React, { FC } from 'react';
import { Card, Skeleton } from 'antd';

interface CardSkeletonProps {
  count: number;
  large?: boolean;
}

const SkeletonCard: FC<CardSkeletonProps> = ({ count, large = false }) => {
  const skeletons = Array.from({ length: count }, (_, index) => (
    <div
      key={index}
      className={`relative col-span-1 ${large ? 'md:col-span-2' : ''} w-full p-4`}
    >
      <Card
        hoverable
        style={{ minWidth: 240, maxWidth: 320, minHeight: 480 }}
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
  ));

  return <div className="flex flex-wrap">{skeletons}</div>;
};

export default SkeletonCard;
