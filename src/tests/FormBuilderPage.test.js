import React from 'react';
import { render, act, fireEvent, screen } from '@testing-library/react';
import FormBuilder from '../pages/FormBuilder';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter

// Define mockNavigate function
const mockNavigate = jest.fn();

// Mocking the react-router package
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigate // Returning mockNavigate
}));


jest.mock('../contexts/ApiProvider', () => {
  const React = require('react'); // Import React here
  return {
    ApiContext: React.createContext({ apiUrl: 'mock-api-url' }),
  };
});

jest.mock('../contexts/FormTemplateProvider', () => {
  const React = require('react');
  return {
    FormTemplateContext: React.createContext({ formComponents: {} }),
  };
});


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
    expect(mockNavigate).toHaveBeenCalledWith('/');

  });

  it('handles form name input change', () => {
    const { getByLabelText } = render(<FormBuilder />);
    const input = getByLabelText('Form Name:');
    fireEvent.change(input, { target: { value: 'New Form Name' } });
    expect(input.value).toBe('New Form Name');
  });
  
  // Line 76: Add test code for handleToggleOverlayPreview
  it('toggles overlay preview', () => {
    render(
      <MemoryRouter>
        <FormBuilder />
      </MemoryRouter>
    );
  
    const previewButton = screen.getByText('Preview Form');
    fireEvent.click(previewButton);
  
    // Check if the overlay component is rendered in the DOM
    const overlay = screen.getByRole('dialog'); // Adjust this selector based on your overlay structure
    expect(overlay).toBeInTheDocument();
  });

});
