import React, { useState, useEffect, useContext } from "react";
import { Table } from "antd";
import { ApiContext } from "../contexts/ApiProvider";
import FillOutForm from "../components/FillOutForm";

const FormPage = () => {
  const [formNames, setFormNames] = useState([]);
  const [selectedForm, setSelectedForm] = useState(null);
  const [formDescription, setFormDescription] = useState("");
  const [creatingForm, setCreatingForm] = useState(false); // New state
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
        setFormNames(data.result);
      } catch (error) {
        console.error("Error fetching form data:", error);
      }
    };
    
    fetchFormNames();
  }, [apiUrl]);

  const handleFormClick = (formName) => {
    setSelectedForm({ formName: formName }); // Pass form name as an object
    setCreatingForm(false); // Reset creatingForm state to false
    setFormDescription(""); // Reset formDescription
    console.log('Selected Form:', formName);    
  };
  

  const handleDescriptionChange = (e) => {
    setFormDescription(e.target.value);
  };

  const handleCreateForm = () => {
    setCreatingForm(true); // Set creatingForm state to true
  };

  const columns = [
    {
      title: "Form Name",
      dataIndex: "formName",
      key: "formName",
      render: (text) => (
        // eslint-disable-next-line
        <a onClick={() => handleFormClick(text)}>{text}</a> 
      )
    },
    // Add more columns as needed
  ];

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
          {selectedForm && !creatingForm && (
            <div className="text-center mb-4">
              <h2>{selectedForm.formName}</h2>
              <div className="form-description-container">
                <div className="row">
                  <div className="col">
                    <textarea 
                      className="mb-3 form-control" 
                      placeholder="Enter form description" 
                      onChange={handleDescriptionChange}
                      value={formDescription}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col text-center">
                    <button className="btn btn-primary" onClick={handleCreateForm}>Create Form</button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {selectedForm && creatingForm && (
            <FillOutForm formName={selectedForm.formName} />
          )}
        </div>
      </div>
    </div>
  );
};

export default FormPage;
