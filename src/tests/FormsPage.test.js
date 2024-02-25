import React from 'react';
import FormPage from '../pages/FormsPage';
import { ApiContext } from '../contexts/ApiProvider';

describe('FormPage component', () => {
  test('fetches form data on component mount', async () => {
    // Mock the API URL
    const apiUrl = 'https://stream-linedd-8391d4c8cf39.herokuapp.com/';

    // Mock the response data
    const mockFormData = [
      { _id: '1', formName: 'Form 1' },
      { _id: '2', formName: 'Form 2' },
    ];

    // Mock the fetch function
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ result: mockFormData }),
      })
    );

      <ApiContext.Provider value={{ apiUrl }}>
        <FormPage />
      </ApiContext.Provider>
    });
  });

  
