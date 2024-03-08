import React from 'react';
import { render, screen } from '@testing-library/react';
import CreateAccountPage from '../pages/CreateAccountPage';
import { ApiContext } from '../contexts/ApiProvider';

// Mock ApiProvider module
jest.mock('../contexts/ApiProvider', () => {
    const React = require('react');
    return {
      ApiContext: React.createContext({ apiUrl: 'mock-api-url' }), // Provide a mock context value
    };
  });

// Define mockNavigate function
const mockNavigate = jest.fn();

// Mocking the react-router package
jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'),
    useNavigate: () => mockNavigate // Returning mockNavigate
}));

describe('CreateAccountPage component', () => {
    test("CreateAccountPage component renders without crashing", () => {
        render(<CreateAccountPage apiUrl="mock-api-url" />);
    
        // Check if the component renders without crashing
        const createAccountPage = screen.getByTestId("create-account-page");
        expect(createAccountPage).toBeInTheDocument();
      });
  test('renders form elements', () => {
    render(<CreateAccountPage />);

    // Check if the form elements are present
    const firstNameInput = screen.getByPlaceholderText('First Name');
    const lastNameInput = screen.getByPlaceholderText('Last Name');
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password');
    const submitButton = screen.getByRole('button', { name: 'Create New Account' });

    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
});
