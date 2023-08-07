import React from 'react';
import { render, screen } from '@testing-library/react';
import Layout from './Layout'; // Adjust the path to your Layout component

describe('Layout Component', () => {
  it('renders children and header text', () => {
    render(<Layout><div>Test Children</div></Layout>);

    // Check if header text is rendered
    const headerLink = screen.getByRole('link', { name: /Eigen\s*Articles/ });
    expect(headerLink).toBeInTheDocument();

    const headerText = headerLink.textContent;
    expect(headerText).toMatch(/Eigen\s*Articles/);
  });

});
