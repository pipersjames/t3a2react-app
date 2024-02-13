import { render, screen } from '@testing-library/react';
import App from '../App';
import { MemoryRouter } from 'react-router';
import { ApiProvider } from '../contexts/ApiProvider';

test('renders login form when the path is "/"', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <ApiProvider>
          <App />
        </ApiProvider> 
      </MemoryRouter>
    );
    const loginFormElement = screen.getByTestId('login-form'); // Assuming you set a data-testid for the LoginForm component
    expect(loginFormElement).toBeInTheDocument();
  });