import React, { useState, useEffect, useContext } from "react";
import { Table } from "antd";
import { ApiContext } from "../contexts/ApiProvider";

const FormPage = () => {
  const [formNames, setFormNames] = useState([]);
  //Context
  const { apiUrl } = useContext(ApiContext)

  useEffect(() => {
    const fetchFormNames = async () => {

      try {
        // this apiUrl going through Heroku
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
        setFormNames(data.forms);
      } catch (error) {
        console.error("Error fetching form data:", error);
      }
    };
    
    fetchFormNames();
  }, [apiUrl]);

  const columns = [
    {
      title: "Form Name",
      dataIndex: "formName",
      key: "formName",
    },
    // Add more columns as needed
  ];

  return (
    <div>
      <h1>Form Page</h1>
      <Table dataSource={formNames} columns={columns} />
    </div>
  );
};

export default FormPage;
