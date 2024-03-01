import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DateTimeInput from '/Users/jitkcheo/Documents/GitHub/t3a2react-app/src/components/formComponents/DateTimeInput';


describe('DateTimeInput component', () => {
  test('renders with correct value and handles input change', () => {
    // Define mock props
    const edit = false;
    const index = 0;
    const handleInputChange = jest.fn();
    const formData = ['2024-02-29T12:00']; // Sample form data
    const submittedFormData = '2024-02-29T12:00'; // Sample submitted form data
    const action = false;

    // Render the component
    const { getByLabelText, getByDisplayValue } = render(
      <DateTimeInput
        edit={edit}
        index={index}
        handleInputChange={handleInputChange}
        formData={formData}
        submittedFormData={submittedFormData}
        action={action}
      />
    );

    // Assert that the input field is rendered with the correct value
    const inputElement = getByDisplayValue('2024-02-29T12:00');

    // Assert that the value is correctly derived from the formData prop
    expect(inputElement).toBeInTheDocument();

    // Simulate user input by changing the value
    fireEvent.change(inputElement, { target: { value: '2024-03-01T12:00' } });

    // Assert that the handleDateTimeChange function is called with the correct parameters
    expect(handleInputChange).toHaveBeenCalledWith(0, '2024-03-01T12:00');
  });

  // Add more tests as needed to cover other use cases and edge cases
});
