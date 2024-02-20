import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import Forms from '../pages/Forms';
import { ApiContext } from '../contexts/ApiProvider';

describe('FormPage component', () => {
  test('renders form names table', async () => {
    const apiUrl = 'https://stream-linedd-8391d4c8cf39.herokuapp.com/formTemplates/forms';
    const formNames = [
      { _id: '1', formName: 'Form 1' },
      { _id: '2', formName: 'Form 2' },
      { _id: '3', formName: 'Form 3' },
      { _id: '3', formName: 'Form 4' },
    ];

    // Mock the fetch function to return a successful response
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ result: formNames }),
    });


    // Wait for the component to fetch form names
    await waitFor(() => {
      // Check if fetch is called with the correct apiUrl
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(`${apiUrl}/formTemplates/forms`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    });

    // Check if form names are rendered in the table
    formNames.forEach(form => {
      expect(screen.getByText(form.formName)).toBeInTheDocument();
    });
  });

  test('handles fetch error', async () => {
    const apiUrl = 'https://stream-linedd-8391d4c8cf39.herokuapp.com/formTemplates/forms';

    // Mock the fetch function to return an error response
    global.fetch = jest.fn().mockRejectedValue(new Error('Failed to fetch form data'));

    render(
      <ApiContext.Provider value={{ apiUrl }}>
        <Forms />
      </ApiContext.Provider>
    );

    // Wait for the error message to be logged
    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith('Error fetching form data:', expect.any(Error));
    });


    // Check if form names are rendered in the table
    formNames.forEach(form => {
      expect(screen.getByText(form.formName)).toBeInTheDocument();
    });
  });
});


