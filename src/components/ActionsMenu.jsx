import React, { useContext, useEffect, useState } from 'react';
import { UnorderedListOutlined  } from '@ant-design/icons';
import { Menu } from 'antd';
import Cookies from 'js-cookie';
import { ApiContext } from '../contexts/ApiProvider';
import { useNavigate } from 'react-router-dom';



function getItem(label, key, icon, children, type) {

  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

export default function ActionsMenu({setFormId}) {

    const navigate = useNavigate()
    const {apiUrl} = useContext(ApiContext)

    const jwt = Cookies.get('jwt')

   const [assigned, setAssigned] = useState([])
   const [tasked, setTasked] = useState([])

   const fetchActions = async () => {
    try {
      const response = await fetch(`${apiUrl}/forms/actions`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'jwt': jwt
        }
      })
  
      if (!response.ok) {
        throw new Error('Failed to fetch actions')
      }
  
      const data = await response.json()
      setAssigned(data.assignments)
      setTasked(data.tasks)
    } catch (error) {
      console.error('Error fetching actions:', error.message)
    }
  }

    useEffect(() => {
        fetchActions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const items = [];

    if (tasked && tasked.length > 0) {
        items.push(
            getItem(
                'tasked',
                'sub1',
                <UnorderedListOutlined />,
                tasked.map((action) => getItem(`${action.description}`, action._id)),
                'sub-menu'
            )
        );
    }
    
    if (assigned && assigned.length > 0 && assigned.status !== 'closed') {
        items.push(
            getItem(
                'assigned',
                'sub2',
                <UnorderedListOutlined />,
                assigned.map((action) => getItem(`${action.description}`, action._id)),
                'sub-menu'
            )
        );
    }

      const onClick = (e) => {
        const key = e.key;
        const clickedItem = tasked.find(item => item._id === key) || assigned.find(item => item._id === key);
        if (clickedItem) {
          setFormId(clickedItem._id);
          navigate(`/actions/${clickedItem._id}`);
        }
      };
  return (
    <>
      <h1 className="text-center">Actions</h1>
      <Menu
        onClick={onClick}
        className=''
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        items={items}
      />
    </>
  );
};
