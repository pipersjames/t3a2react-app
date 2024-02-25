import React, { useState, useEffect, useContext } from "react";
import { Table } from "antd";
import { ApiContext } from "../contexts/ApiProvider";
import FillOutForm from "../components/FillOutForm";
import moment from 'moment'
import Cookies from "js-cookie";
import {useNavigate, useParams} from 'react-router-dom'

export default function FormPage() {
  
  const jwt = Cookies.get('jwt')
  const navigate = useNavigate()
  //contexts
  const { apiUrl } = useContext(ApiContext);
  //useParams
  const { fav } = useParams()
  //useStates
  const [formNames, setFormNames] = useState([]);
  const [selectedForm, setSelectedForm] = useState(fav || null);
  const [formDescription, setFormDescription] = useState("");
  const [creatingForm, setCreatingForm] = useState(false); // New state
  const [userForms, setUserForms] = useState([])

  //API call functions
  const fetchUserForms = async (formId) => {
      try {
        const response = await fetch(`${apiUrl}/forms/currentUser`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'jwt': jwt,
            'formid': formId
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch form data');
        }
        const data = await response.json();
        setUserForms(data.result)
      } catch (error) {
        console.error("Error fetching form data:", error);
      }
  }

  const fetchFormNames = async () => {
    try {
      const response = await fetch(`${apiUrl}/formTemplates/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch form template data');
      }
      const data = await response.json();
      setFormNames(data.result);
    } catch (error) {
      console.error("Error fetching form template data:", error);
    }
  };

  const fetchSelectedFormName = async () => {
    try {
      if (!selectedForm) return null
      const response = await fetch(`${apiUrl}/formTemplates/${fav}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch form template data');
      }
      const data = await response.json();
      fetchUserForms(data.template._id);
    } catch (error) {
      console.error("Error fetching form template data:", error);
    }
  };
  //useEffects
  useEffect(() => {
    
    fetchFormNames()
    fetchSelectedFormName()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //handles
  const handleFormTemplateSelect = (record) => {
    navigate(`/forms/${record.formName}`)
    setSelectedForm(record.formName); 
    setCreatingForm(false);
    setFormDescription(""); 
    fetchUserForms(record._id)
  }

  const handleDescriptionChange = (e) => {
    setFormDescription(e.target.value);
  };

  const handleCreateForm = () => {
    if (formDescription.trim() !== "") { // Check if form description is not empty
      setCreatingForm(true); // Set creatingForm state to true
    } else {
      alert("Please enter a form description.");
    }
  };

  const handleFormRowSelect = () => {
    window.alert('its working')
  }

  //table render formats
  const selectionColumns = [
    {
      title: "Form Name",
      dataIndex: "formName",
      key: "formName",
    },
  ];

  const formColumns = [
    {
      title: 'description',
      dataIndex: 'description',
      key: 'description' 
    },
    {
      title: 'submission date/time',
      dataIndex: 'timeStamp',
      key: 'timeStamp',
      render: (timeStamp) => moment(timeStamp).format('DD-MM-YYYY / hA')
    },
    {
      title: 'submitted by',
      dataIndex: 'user',
      key: 'user',
      render: (user) => {
        return `${user.fname} ${user.lname}`
      }
    },
    {
      title: 'status',
      dataIndex: 'status',
      key: 'status'
    },
    {
      title: 'assigned',
      dataIndex: 'formTemplate',
      key: 'formTemplate',
      render: (formTemplate) => {
        return formTemplate.assignedTo
      }
    },
    {
      title: 'tasked user',
      dataIndex: 'actions',
      key: 'actions',
      render: (actions) => {
        return actions ? actions.user : null
      }
    }

  ]

  return (
    <div className="container">

      <div className="row">
        <div className="col-md-3">
          <h1>Form Page</h1>
          <Table 
            dataSource={formNames} 
            columns={selectionColumns} 
            rowKey="_id"
            rowClassName='hoverPointer'
            onRow={(record) => ({
              onClick: () => handleFormTemplateSelect(record)
            })
          }
          />
        </div>
        <div className="col-md-6 d-flex flex-column align-items-center justify-content-start">
          {selectedForm && !creatingForm && (
            <div className="text-center mb-4">
              <h2>{selectedForm}</h2>
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
          {selectedForm && creatingForm &&(
            <FillOutForm 
              formName={selectedForm}
              formDescription={formDescription}
            />
          )}
          {!creatingForm && userForms.length > 0 && (
            <Table 
            dataSource={userForms} 
            columns={formColumns} 
            rowClassName='hoverPointer'
            rowKey='_id'
            onRow={() => ({
                onClick: handleFormRowSelect
            })}
        />)}
        </div>
      </div>
    </div>
  );
};

