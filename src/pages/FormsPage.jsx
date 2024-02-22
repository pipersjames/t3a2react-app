import React, { useState, useEffect, useContext } from "react";
import { Table } from "antd";
import { ApiContext } from "../contexts/ApiProvider";
import { Link } from "react-router-dom";
import FillOutForm from "../components/FillOutForm"


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

  // console.log("Form names:", formNames); // Log form names
  
  const columns = [
    {
      title: "Form Name",
      dataIndex: "formName",
      key: "formName",
      render: (text) => (
        /* eslint-disable-next-line */
        <a onClick={() => handleFormClick(text)}>{text}</a>
      )
    },
    // Add more columns as needed
  ];

  const handleFormClick = (formName) => {
    setSelectedForm(formName);
  };
  

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <h1>Form Page</h1>
          <Table 
            dataSource={formNames} 
            columns={columns} 
            rowKey="_id" 
          />
        </div>
        <div className="col-md-6 d-flex flex-column align-items-center justify-content-start">
            {selectedForm && (
              <div className="text-center mb-4">
                <h2>{selectedForm}</h2>
                {/* Add description input and create form option here */}
                <div className="form-description-container">
                  <div className="row">
                    <div className="col">
                      <textarea className="mb-3 form-control" placeholder="Enter form description"></textarea>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col text-center">
                      <Link to="/formbuilder" className="btn btn-primary">Create Form</Link>
                      <FillOutForm form = {selectedForm}/>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

      </div>
    </div>
  );
};

export default FormPage;
