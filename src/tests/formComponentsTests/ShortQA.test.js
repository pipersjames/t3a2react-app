import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ShortQA from '../../components/formComponents/ShortQA';

describe('ShortQA component', () => {
  test('calls handleTitleChange when title input changes', () => {
    // Define mock props
    const setQuestionHeaders = jest.fn();
    const edit = false;
    const fill = false;
    const index = 0;
    const handleInputChange = jest.fn();
    const formData = ['Sample answer']; // Sample form data
    const questionHeader = 'Sample question'; // Sample question header
    const submittedFormData = 'Sample submitted data'; // Sample submitted form data
    const action = false;

    // Render the component
    const { getByPlaceholderText } = render(
      <ShortQA
        setQuestionHeaders={setQuestionHeaders}
        edit={edit}
        fill={fill}
        index={index}
        handleInputChange={handleInputChange}
        formData={formData}
        questionHeader={questionHeader}
        submittedFormData={submittedFormData}
        action={action}
      />
    );

    // Simulate user input by changing the title value
    const titleInputElement = getByPlaceholderText('Enter Question Here');
    fireEvent.change(titleInputElement, { target: { value: 'New Question' } });

    // Assert that handleTitleChange has been called with the correct parameters
    expect(handleInputChange).toHaveBeenCalledWith(index, 'New Question');
  });

  test('truncates description if it exceeds the character limit', () => {
    // Define mock props
    const setQuestionHeaders = jest.fn();
    const edit = false;
    const fill = false;
    const index = 0;
    const handleInputChange = jest.fn();
    const formData = ['Sample answer']; // Sample form data
    const questionHeader = 'Sample question'; // Sample question header
    const submittedFormData = 'Sample submitted data'; // Sample submitted form data
    const action = false;

    // Render the component
    const { getByPlaceholderText } = render(
      <ShortQA
        setQuestionHeaders={setQuestionHeaders}
        edit={edit}
        fill={fill}
        index={index}
        handleInputChange={handleInputChange}
        formData={formData}
        questionHeader={questionHeader}
        submittedFormData={submittedFormData}
        action={action}
      />
    );

    // Simulate user input by typing a description exceeding the character limit
    const descriptionInputElement = getByPlaceholderText('Answer');
    fireEvent.change(descriptionInputElement, { target: { value: 'This is a description exceeding the character limit' } });

    // Assert that handleInputChange has been called with the truncated description
    expect(handleInputChange).toHaveBeenCalledWith(index, 'This is a description exceed');
  });
});
