import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LongQA from '../../components/formComponents/LongQA';

describe('LongQA component', () => {
  test('renders input field correctly', () => {
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

    // Assert that the input field for title is rendered
    const titleInputElement = getByPlaceholderText('Enter Question Here');
    expect(titleInputElement).toBeInTheDocument();

    // Simulate user input by changing the title value
    fireEvent.change(titleInputElement, { target: { value: 'New Question' } });

    // Assert that the handleInputChange function has been called at least once

    const calls = handleInputChange.mock.calls;
    const callWithCorrectParams = calls.some(call => call[0] === index && call[1] === 'New Question');
    expect(callWithCorrectParams).toBe(true, 'handleInputChange should have been called with the correct parameters at least once');
});
});





  test('renders submitted form data when action is true', () => {
    // Define mock props with action set to true
    const setQuestionHeaders = jest.fn();
    const edit = false;
    const fill = false;
    const index = 0;
    const handleInputChange = jest.fn();
    const formData = ['Sample answer']; // Sample form data
    const questionHeader = 'Sample question'; // Sample question header
    const submittedFormData = 'Sample submitted data'; // Sample submitted form data
    const action = true;

    // Render the component
    const { getByText } = render(
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

    // Assert that the submitted form data is rendered
    const submittedDataElement = getByText('Sample submitted data');
    expect(submittedDataElement).toBeInTheDocument();
  });
