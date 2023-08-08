import React from 'react';
import { render } from '@testing-library/react';
import SkeletonCard from './SkeletonCard';

describe('SkeletonCard component', () => {
  it('renders the correct number of skeletons', () => {
    const { container } = render(<SkeletonCard count={3} />);
    const skeletons = container.querySelectorAll('.ant-card');

    expect(skeletons.length).toBe(3);
  });

  it('renders large skeletons when "large" prop is true', () => {
    const { container } = render(<SkeletonCard count={2} large />);
    const largeSkeletons = container.querySelectorAll('.md\\:col-span-2');

    expect(largeSkeletons.length).toBe(2);
  });

  it('renders default-sized skeletons when "large" prop is false', () => {
    const { container } = render(<SkeletonCard count={3} />);
    const defaultSkeletons = container.querySelectorAll('.col-span-1');

    expect(defaultSkeletons.length).toBe(3);
  });

  it('renders skeleton images and content', () => {
    const { container } = render(<SkeletonCard count={1} />);
    const skeletonImage = container.querySelector('.ant-skeleton-image');
    const skeletonTitle = container.querySelector('.ant-skeleton-title');
    const skeletonParagraph = container.querySelector('.ant-skeleton-paragraph');

    expect(skeletonImage).toBeInTheDocument();
    expect(skeletonTitle).toBeInTheDocument();
    expect(skeletonParagraph).toBeInTheDocument();
  });
});
