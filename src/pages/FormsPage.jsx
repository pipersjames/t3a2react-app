import React, { useState, useEffect, useContext } from "react";
import { Table, Button, Modal } from "antd";
import { ApiContext } from "../contexts/ApiProvider";
import FillOutForm from "../components/FillOutForm";
import Cookies from "js-cookie";
import moment from 'moment'
import {useNavigate, useParams, NavLink} from 'react-router-dom'


export default function FormPage() {
  
  const jwt = Cookies.get('jwt')
  const navigate = useNavigate()
  //contexts
  const { apiUrl } = useContext(ApiContext);
  //useParams
  const { fav } = useParams()
  //useStates
  const [formTemplates, setFormTemplates] = useState([]);
  const [selectedForm, setSelectedForm] = useState(fav || null);
  const [formDescription, setFormDescription] = useState("");
  const [creatingForm, setCreatingForm] = useState(false); // New state
  const [userForms, setUserForms] = useState([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false); // State for delete confirmation modal visibility
  const [deleteClicked, setDeleteClicked] = useState(false);



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

  const fetchFormTemplates = async () => {
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
      setFormTemplates(data.result);
    } catch (error) {
      console.error("Error fetching form template data:", error);
    }
  };

  //useEffects
  useEffect(() => {
    
    fetchFormTemplates()
    //fetchSelectedFormName()
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
      console.log(formTemplates, selectedForm)
    } else {
      alert("Please enter a form description.");
    }
  };

  const handleFormRowSelect = () => {
    window.alert('its working')
  }


  const handleCloseDeleteModal = () => {
    setDeleteModalVisible(false);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${apiUrl}/formTemplates/${selectedForm}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to delete form template');
      }
      const data = await response.json();
      console.log(data.message); // Log success message
      handleCloseDeleteModal(); // Close the delete modal
      setDeleteClicked(true); // Set deleteClicked state to true
      // You may also want to refresh the form templates list after deletion
      fetchFormTemplates();
    } catch (error) {
      console.error("Error deleting form template:", error);
    }
  };
  


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
            dataSource={formTemplates} 
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
          {selectedForm && !creatingForm && !deleteClicked && (
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
                <div className="col d-flex flex-column align-items-center">
                  <Button className="btn btn-primary mb-2" style={{ display: 'flex', alignItems: 'center' }} onClick={handleCreateForm}>
                    <span style={{ margin: 'auto' }}>Create Form</span>
                  </Button>
                  {/* Add Edit button */}
                  <Button className="btn btn-primary mb-2" style={{ display: 'flex', alignItems: 'center' }}>
                    <NavLink to={`/formbuilder?formName=${selectedForm}`}style={{ textDecoration: 'none' }}>
                      <span style={{ margin: 'auto' }}>Edit</span>
                    </NavLink>
                  </Button>
                    {/* Add Delete button */}
                  <Button className="btn btn-primary mb-2" style={{ display: 'flex', alignItems: 'center' }} onClick={handleDelete}>
                    <span style={{ margin: 'auto' }}>Delete</span>
                  </Button>
                </div>
                </div>
              </div>
            </div>
          )}
          {deleteClicked && (
          <p className="text-center">No form selected after deletion.</p>
          )}
          {selectedForm && creatingForm &&(
            <FillOutForm
              setCreatingForm= {setCreatingForm} 
              formName={selectedForm}
              formDescription={formDescription}
              setFormDescription={setFormDescription}
              fetchUserForms={fetchUserForms}
            />
          )}
          {!creatingForm && userForms.length > 0 && formTemplates.find(template => template.formName === selectedForm) && (
            <Table 
            dataSource={userForms} 
            columns={formColumns} 
            rowClassName='hoverPointer'
            rowKey='_id'
            onRow={() => ({
                onClick: handleFormRowSelect
            })}
        />)}
          {/* Delete confirmation modal */}
          <Modal
            title="Confirm Delete"
            open={deleteModalVisible}
            onOk={handleDelete}
            onCancel={handleCloseDeleteModal}
          >
            <p>Are you sure you want to delete this form template and all associated forms?</p>
          </Modal>
        </div>
      </div>
    </div>
  );
};

