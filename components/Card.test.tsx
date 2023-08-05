import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Cards from './Cards';

describe('Cards Component', () => {
  it('calls onCardClick when card is clicked', () => {
    const onClickMock = jest.fn();
    const { getByRole } = render(
      <Cards
        title="Test Title"
        description="Test Description"
        image="/test-image.jpg"
        author="Test Author"
        onClick={onClickMock}
      />,
    );

    const cardElement = getByRole('button', { name: 'Test Title' });
    fireEvent.click(cardElement);

    expect(onClickMock).toHaveBeenCalledTimes(1); // Use onClickMock here
  });

  // Add more test cases as needed
});
