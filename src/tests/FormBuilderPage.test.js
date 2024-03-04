import React from 'react';
import { render, act } from '@testing-library/react';
import FormBuilder from '../pages/FormBuilder';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter

// Define mock function before using it
const mockUseNavigate = jest.fn();

// Mocking useNavigate from 'react-router-dom'
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: mockUseNavigate
}));

// Mocking the dependencies
jest.mock('../contexts/ApiProvider', () => ({
  ApiContext: { apiUrl: 'mock-api-url' }
}));

jest.mock('../contexts/FormTemplateProvider', () => ({
  FormTemplateContext: { formComponents: {} }
}));

// Mocking the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        result: [
          { _id: 'user_id_1', fname: 'John', lname: 'Doe' },
          { _id: 'user_id_2', fname: 'Jane', lname: 'Doe' }
        ]
      })
  })
);

describe('FormBuilder', () => {
  it('fetches usernames from the database and sets assignedOptions state', async () => {
    // Render the FormBuilder component within MemoryRouter
    const { findByLabelText } = render(
      <MemoryRouter>
        <FormBuilder />
      </MemoryRouter>
    );

    // Wait for the component to finish fetching data
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    // Check if the fetch function is called with the correct URL
    expect(fetch).toHaveBeenCalledWith('mock-api-url/users/');

  });

  // Add more tests as needed for other functionalities of the FormBuilder component
});
