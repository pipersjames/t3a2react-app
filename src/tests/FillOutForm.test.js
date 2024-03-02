// import React, { useContext, useEffect } from 'react';
// import { render, waitFor } from '@testing-library/react';
// import FillOutForm from '../components/FillOutForm';
// import { ApiContext } from '../contexts/ApiProvider';
// import { FormTemplateContext } from '../contexts/FormTemplateProvider';
// import { FavouritesContext } from '../contexts/FavouritesProvider';


// // Mock the useEffect hook
// jest.mock('react', () => ({
//     ...jest.requireActual('react'),
//     useEffect: jest.fn(), // Mock useEffect as a spy function
//     useContext: jest.fn(), // Mock useContext to return the context values
//   }));
  
// // Mock the ApiContext
// jest.mock('../contexts/ApiProvider', () => ({
//     ApiContext: {
//       apiUrl: 'mock-api-url', // Provide a mock apiUrl value
//     },
//   }));
  

//   // Mock the useContext hook for context providers
//   jest.mock('react', () => ({
//     ...jest.requireActual('react'),
//     useContext: jest.fn(),
//   }));
  
//   describe('FillOutForm component', () => {
//     beforeEach(() => {
//       jest.clearAllMocks();
//     });
  
//     it('fetches data on component mount', async () => {
//         const getFavourites = jest.fn().mockResolvedValueOnce({ favourites: ['fav1', 'fav2'] });
//         const fetchFormTemplate = jest.fn().mockResolvedValueOnce({ formTemplateData: 'mockData' });
//         const setFavourites = jest.fn();
      
//     // Mock useContext to return the context values
//     useContext
//         .mockReturnValueOnce({ apiUrl: 'mock-api-url' }) // Mock ApiContext
//         .mockReturnValueOnce({ formComponents: {}, formTemplate: {}, fetchFormTemplate }) // Mock FormTemplateContext
//         .mockReturnValueOnce({ getFavourites, setFavourites, favourites: [] }); // Mock FavouritesContext

//     // Render the component
//     const { queryByTestId } = render(<FillOutForm />);
  
//     // Wait for the component to finish rendering
//     await waitFor(() => {
//       // Check if the element rendered by useEffect is present
//       expect(queryByTestId('fill-out-form-container')).toBeInTheDocument();
      
//       // Verify other expected behaviors
//     });
//   });
      

//   it("handles form submission", async () => {
//     window.fetch = jest.fn(() => Promise.resolve({ ok: true }));

//     const { getByText } = render(
//       <FillOutForm
//         formName="MockForm"
//         formDescription="Mock Description"
//         setCreatingForm={() => {}}
//         setFormDescription={() => {}}
//         renderedFormComponents={[]}
//         preview={false}
//         fetchUserForms={() => {}}
//       />
//     );

//     const submitButton = getByText("Submit");

//     fireEvent.click(submitButton);

//     await waitFor(() => {
//       expect(fetch).toHaveBeenCalledTimes(1);
//       expect(fetch).toHaveBeenCalledWith(
//         "http://example.com/api/forms/submit",
//         expect.objectContaining({
//           method: "POST",
//           headers: expect.objectContaining({
//             "Content-Type": "application/json",
//             jwt: "mockJWT",
//           }),
//         })
//       );
//     });
//   });
// });
