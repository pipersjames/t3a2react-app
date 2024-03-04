import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import FillOutForm from '../components/FillOutForm';
import {  FormTemplateProvider } from '../contexts/FormTemplateProvider';

// Mock ApiProvider module
jest.mock('../contexts/ApiProvider', () => {
    const React = require('react');
    return {
      ApiContext: React.createContext({ apiUrl: 'mock-api-url' }),
    };
  });

// Mock the FavouritesContext
jest.mock('../contexts/FavouritesProvider', () => ({
    FavouritesContext: {
      Consumer: jest.fn(({ children }) => children({
        getFavourites: jest.fn(),
        patchFavourites: jest.fn(),
        favourites: [], // Mock favourites data
      })),
    },
  }));

// // Mock FormTemplateProvider module
// jest.mock('../contexts/FormTemplateProvider', () => ({
//     FormTemplateContext: {
//         formComponents: [], // Mock form components data
//         formTemplate: {}, // Mock form template data
//         fetchFormTemplate: jest.fn(), // Mock fetchFormTemplate function
//       },
//     }));

  // Mock fetch function
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve([{ id: 1, name: 'Favourite 1' }]), // Mock response data
  });
  
  // Mock console.error
  console.error = jest.fn();
  
  describe('FillOutForm component', () => {
    it('renders without crashing', () => {
        render(
            <FormTemplateProvider>
                <FillOutForm />
            </FormTemplateProvider>
        );
    });
  
    it('submits form successfully', async () => {
      const mockFormName = 'Mock Form';
      const mockFormDescription = 'Mock Form Description';
      const mockSetCreatingForm = jest.fn();
      const mockSetFormDescription = jest.fn();
      const mockRenderedFormComponents = [];
      const mockPreview = false;
      const mockFetchUserForms = jest.fn();
  
      const { getByText } = render(
        <FillOutForm
          formName={mockFormName}
          formDescription={mockFormDescription}
          setCreatingForm={mockSetCreatingForm}
          setFormDescription={mockSetFormDescription}
          renderedFormComponents={mockRenderedFormComponents}
          preview={mockPreview}
          fetchUserForms={mockFetchUserForms}
        />
      );
  
      const submitButton = getByText('Submit');
      fireEvent.click(submitButton);
  
      await waitFor(() => {
        expect(mockSetCreatingForm).toHaveBeenCalledWith(false);
        expect(mockSetFormDescription).toHaveBeenCalledWith('');
        expect(mockFetchUserForms).toHaveBeenCalledWith(expect.any(String)); // Ensure it's called with formTemplate._id
      });
    });
  });
  