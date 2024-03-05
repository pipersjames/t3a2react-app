import React from 'react';
import { render, screen, act } from '@testing-library/react';
import LoginPage from '../pages/LoginPage';
import { MemoryRouter } from 'react-router-dom';
import { ApiProvider } from '../contexts/ApiProvider';

// Mocking the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ jwt: 'mockJwt', auth: 'mockAuth' })
  })
);

describe('LoginPage', () => {
  beforeEach(() => {
    // Reset Cookies mock before each test
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('renders login form when the path is "/"', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <ApiProvider>
          <LoginPage />
        </ApiProvider>
      </MemoryRouter>
    );

    // Wait for the component to finish auto login
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    // Check if the login form is rendered
    const loginForm = screen.getByTestId('login-form');
    expect(loginForm).toBeInTheDocument();
  });

  // Add more test cases as needed
});
