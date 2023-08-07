import React from 'react';
import { render, screen } from '@testing-library/react';
import Cards from './Cards';

// Mock the 'next/image' component
jest.mock('next/image', () => ({ src, alt }: { src: string, alt: string }) => <img src={src} alt={alt} />);

describe('Cards Component', () => {
  const mockProps = {
    title: 'Test Title',
    description: 'Test Description',
    image: 'test-image.jpg', // Provide a valid image URL here
    author: 'Test Author',
    large: false,
    isLoading: false,
    onClick: jest.fn(),
    onCardClick: jest.fn(),
  };

  it('renders card with provided props', () => {
    render(<Cards {...mockProps} />);

  });

});
