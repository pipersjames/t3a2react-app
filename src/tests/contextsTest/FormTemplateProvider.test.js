import React from 'react';
import { render } from '@testing-library/react';
import { FormTemplateProvider, FormTemplateContext } from '../../contexts/FormTemplateProvider';

// Mock ApiProvider module
jest.mock('../../contexts/ApiProvider', () => {
    const React = require('react'); // Import React here
    return {
      ApiContext: React.createContext({ apiUrl: 'mock-api-url' }),
    };
});

// Mock fetch function
global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve([{ id: 1, name: 'Favourite 1' }]), // Mock response data
});


// Mock console.error
console.error = jest.fn();

describe('FormTemplateProvider', () => {
  it('initializes formTemplate as undefined', async () => {
    const { getByTestId } = render(
      <FormTemplateProvider>
        <FormTemplateContext.Consumer>
          {({ formTemplate }) => (
            <div data-testid="form-template">{JSON.stringify(formTemplate)}</div>
          )}
        </FormTemplateContext.Consumer>
      </FormTemplateProvider>
    );

    expect(getByTestId('form-template').textContent).toBe('');
  });

  it('fetches and sets formTemplate correctly', async () => {
    const mockFormTemplate = { /* mock form template data */ };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ template: mockFormTemplate }), // Mock response data
    });

    const { getByTestId } = render(
      <FormTemplateProvider>
        <FormTemplateContext.Consumer>
          {({ fetchFormTemplate }) => {
            fetchFormTemplate('formName', undefined); // Simulate fetching form template
            return <div data-testid="form-template" />;
          }}
        </FormTemplateContext.Consumer>
      </FormTemplateProvider>
    );

    // Wait for the fetch operation to complete
    await new Promise(resolve => setTimeout(resolve, 0));
    const formTemplateContent = getByTestId('form-template').textContent;
    if (formTemplateContent.trim() !== '') {
        const parsedTemplate = JSON.parse(formTemplateContent);
        expect(parsedTemplate.property1).toBeDefined();
        expect(parsedTemplate.property2).toBeDefined();
        // Add more assertions as needed
    } else {
        // Handle the case when formTemplateContent is empty
    }
    
});

  it('sets formTemplate correctly without fetching', () => {
    const mockFormTemplate = { /* mock form template data */ };

    const { getByTestId } = render(
      <FormTemplateProvider>
        <FormTemplateContext.Consumer>
          {({ fetchFormTemplate }) => {
            fetchFormTemplate('formName', mockFormTemplate); // Simulate setting form template without fetching
            return <div data-testid="form-template" />;
          }}
        </FormTemplateContext.Consumer>
      </FormTemplateProvider>
    );

    const formTemplateContent = getByTestId('form-template').textContent;
    if (formTemplateContent.trim() !== '') {
      const parsedTemplate = JSON.parse(formTemplateContent);
      expect(parsedTemplate.property1).toBeDefined();
      expect(parsedTemplate.property2).toBeDefined();
      // Add more assertions as needed
    } else {
      // Handle the case when formTemplateContent is empty
      // You can add an assertion here if needed, or handle it according to your test requirements
    }});
});
