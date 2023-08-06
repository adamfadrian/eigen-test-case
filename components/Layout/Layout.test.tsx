import React from 'react';
import { render, screen } from '@testing-library/react';
import Layout from './Layout';

// Mock the useScroll module
jest.mock('@/hooks/use-scroll', () => () => false);

describe('Layout', () => {
  it('renders children', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );

    const childContent = screen.getByText('Test Content');
    expect(childContent).toBeInTheDocument();
  });

  it('displays the correct header', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );
    const logoText = screen.getByText((content, element) => {
      return content === 'Eigen' && element?.tagName.toLowerCase() === 'span';
    }) as HTMLElement;
    expect(logoText).toBeInTheDocument();

    const gradientBackground = screen.getByTestId('gradient-bg');
    expect(gradientBackground).toBeInTheDocument();
  });
});
