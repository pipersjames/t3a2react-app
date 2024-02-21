import React, { useState, useEffect, useContext } from "react";
import { Table } from "antd";
import { ApiContext } from "../contexts/ApiProvider";

const FormPage = () => {
  const [formNames, setFormNames] = useState([]);
  const [selectedForm, setSelectedForm] = useState(null);
  const { apiUrl } = useContext(ApiContext);

  useEffect(() => {
    const fetchFormNames = async () => {
      try {
        const response = await fetch(`${apiUrl}/formTemplates/formspage`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch form data');
        }
        const data = await response.json();
        console.log("Fetched form data:", data.result); // Log fetched form data
        setFormNames(data.result);
      } catch (error) {
        console.error("Error fetching form data:", error);
      }
    };
    
    fetchFormNames();
  }, [apiUrl]);

  console.log("Form names:", formNames); // Log form names
  
  const columns = [
    {
      title: "Form Name",
      dataIndex: "formName",
      key: "formName",
      render: (text) => (
        <a onClick={() => handleFormClick(text)}>{text}</a>
      )
    },
    // Add more columns as needed
  ];

  const handleFormClick = (formName) => {
    setSelectedForm(formName);
  };

  return (
    <div>
      <h1>Form Page</h1>
      <Table 
        dataSource={formNames} 
        columns={columns} 
        rowKey="_id" // Specify the unique identifier for each row
      />
    </div>
  );
};

export default FormPage;
