import React, { useState, useEffect, useContext } from "react";
import { Table } from "antd"; // Import Table component from Ant Design
import LongQA from "../components/formComponents/LongQA";
import ShortQA from "../components/formComponents/ShortQA";
import EmailInput from "../components/formComponents/EmailInput";
import FullNameInput from "../components/formComponents/FullNameInput";
import { ApiContext } from "../contexts/ApiProvider";

export default function FormsPage() {
  const [forms, setForms] = useState([]);
  const { apiUrl } = useContext(ApiContext);

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await fetch(`${apiUrl}/formTemplates/forms`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch form data');
        }
        const data = await response.json();
        setForms(data.result);
      } catch (error) {
        console.error("Error fetching form data:", error);
      }
    };
    
    fetchFormData();
  }, [apiUrl]);

  // Define columns for the Ant Design table
  const columns = [
    {
      title: 'Form Name',
      dataIndex: 'name',
      key: 'name',
    }
  ];

  return (
    <div>
      <h1>Rendering Tests</h1>
      {/* Render table with form names */}
      <Table dataSource={forms} columns={columns} pagination={false} />
      
      {/* Render form components */}
      {forms.map((form) => {
        switch (form.type) {
          case "longQA":
            return <LongQA key={form._id} formData={form} />;
          case "shortQA":
            return <ShortQA key={form._id} formData={form} />;
          case "emailInput":
            return <EmailInput key={form._id} formData={form} />;
          case "fullNameInput":
            return <FullNameInput key={form._id} formData={form} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
