import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LongQA from '../../components/formComponents/LongQA';

describe('LongQA component', () => {
  test('calls handleEditClick when pencil icon is clicked', () => {
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

    // Mock the setEditMode function
    const setEditMode = jest.fn();

    // Render the component
    const { getByTestId } = render(
      <LongQA
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

    // Simulate click on the pencil icon
    const pencilIcon = getByTestId('edit-icon');
    fireEvent.click(pencilIcon);

       
    // Check if the title input field becomes enabled after clicking the pencil icon
    const titleInputElement = document.querySelector('input[placeholder="Enter Question Here"]');
    expect(titleInputElement).not.toHaveAttribute('disabled');
  });
});


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
      <LongQA
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


  test('calls handleEditClick when pencil icon is clicked', () => {
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
    const { getByTestId, container } = render(
      <LongQA
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

    // Simulate click on the pencil icon
    const pencilIcon = getByTestId('edit-icon');
    fireEvent.click(pencilIcon);

    // Check if the input field becomes enabled after clicking the pencil icon
    const titleInputElement = container.querySelector('input[placeholder="Enter Question Here"]');
    expect(titleInputElement.disabled).toBe(false);
  });



