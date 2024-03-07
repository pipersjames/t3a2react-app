import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import CompletedForm from '../pages/ActionsPage';

// Mock ApiProvider module
jest.mock('../contexts/ApiProvider', () => {
    const React = require('react');
    return {
      ApiContext: React.createContext({ apiUrl: 'mock-api-url' }),
    };
  });

// Mock the FormTemplateContext
jest.mock('../contexts/FormTemplateProvider', () => {
    const React = require('react');
    return {
      FormTemplateContext: React.createContext({ formComponents: {} }),
    };
  });

  // Define mockNavigate function
const mockNavigate = jest.fn();

// Mocking the react-router package
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigate // Returning mockNavigate
}));


// Mock the fetch function
global.fetch = jest.fn().mockResolvedValueOnce({
  ok: true,
  json: () => Promise.resolve({ result: mockFormData }) // Provide a mock response with JSON method
});


describe('CompletedForm component', () => {
  test('renders form data and allows actions', async () => {
    // Mock form data
    const mockFormData = {
      formTemplate: {
        formName: 'Form Name',
        formDescription: 'Form Description',
      },
      formData: {}, // Mock form data here
      actions: [], // Mock actions array
      status: 'open', // Mock form status
    };

    // Mock API calls
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ result: mockFormData }),
    });

    // Render the component
    const { getByText, getByLabelText } = render(<CompletedForm />);

    // Wait for form data to load
    await waitFor(() => expect(getByText('Form Name')).toBeInTheDocument());

    // Mock user interaction
    fireEvent.change(getByLabelText('Add Comment Here'), { target: { value: 'Test comment' } });
    fireEvent.change(getByLabelText('Request action from:'), { target: { value: 'mock-user-id' } });

    // Click on buttons
    fireEvent.click(getByText('Re-assign'));
    fireEvent.click(getByText('Close Form'));

    // Add assertions for expected behavior
    // Add more assertions as needed
  });
});
