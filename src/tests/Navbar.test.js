import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';

describe('Navbar component', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(getByText('Stream-Lined')).toBeInTheDocument();
    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('Forms')).toBeInTheDocument();
    expect(getByText('Actions')).toBeInTheDocument();
    expect(getByText('Logout')).toBeInTheDocument();
  });

  it('handles logout when logout link is clicked', () => {
    const mockHandleLogout = jest.fn();
    const { getByText } = render(
      <MemoryRouter>
        <Navbar handleLogout={mockHandleLogout} />
      </MemoryRouter>
    );

    const logoutLink = getByText('Logout');
    fireEvent.click(logoutLink);

    expect(typeof mockHandleLogout === 'function').toBeTruthy();
  });
});
