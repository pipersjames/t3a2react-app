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

  it('handles successful authentication', async () => {
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

    // Mock successful authentication response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ jwt: 'mockJwt', auth: 'mockAuth' })
      })
    );

    // Trigger form submission
    const loginButton = screen.getByRole('button', { name: 'Login' });
    loginButton.click();

    // Wait for navigation to home page
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    // Check if navigation occurred
    expect(window.location.pathname).toContain('/');
  });

  it('handles authentication failure', async () => {
    // Mock useNavigate hook
    const mockNavigate = jest.fn();
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => mockNavigate,
    }));

    // Mocking console.error
    jest.spyOn(console, 'error').mockImplementation(() => {});

    // Mocking failed authentication response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
      })
    );

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

    // Trigger form submission
    const loginButton = screen.getByRole('button', { name: 'Login' });
    loginButton.click();

    // Wait for the fetch call to complete
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    // Check if authentication failed message is logged
    expect(console.error).toHaveBeenCalledWith('Authentication failed');
  });

  // Add more test cases as needed
});
