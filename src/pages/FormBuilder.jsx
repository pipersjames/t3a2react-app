import React from 'react';
import Layout from '../components/layouts/Layout'; 
import AccordionTable from '../components/AccordionTable';

const FormBuilder = () => {
  const accordionItems = [
    'Full Name',
    'Email',
    'Short answer',
    'Long answer',
    'Single choice',
    'Multiple choice',
    'File upload',
    'Date/Time'
  ];

  return (
    <Layout>
      <h2>Form Builder</h2>
      <AccordionTable items={accordionItems} />
    </Layout>
  );
};

export default FormBuilder;
