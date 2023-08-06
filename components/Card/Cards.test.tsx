import { render, screen } from '@testing-library/react';
import Cards from './Cards';

describe('Cards', () => {
  it('renders correctly', () => {
    render(<Cards image="/images/test-image.jpg" title="Test Title" description="Test Description" author={'Test Author'} />);
    const titleElement = screen.getByText('Test Title');
    const descriptionElement = screen.getByText('Test Description');
    const authorElement = screen.getByText('Test Author')
    expect(titleElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
    expect(authorElement).toBeInTheDocument();
  });
});
