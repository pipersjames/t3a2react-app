import React, {useState, useEffect} from 'react';

function SavedProgress() {
  // State to hold saved data and selected item id
  const [savedData, setSavedData] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);


  // Dummy data for saved progress
  useEffect(() => {
    const dummySavedData = [
    { id: 1, title: 'Saved Item 1' },
    { id: 2, title: 'Saved Item 2' },
    { id: 3, title: 'Saved Item 3' },
    // Add more saved items as needed
  ];
  
    // Simulate fetching data from a database using useEffect
        setSavedData(dummySavedData);
      }, []); // Empty dependency array = effect runs only on moount
    
      // Function to handle item selection
      const handleItemClick = (itemId) => {
        setSelectedItemId(itemId);
      };

      
    return (
    <div>
        <h2>Saved In Progress</h2>
        <ul>
        {savedData.map(item => (
            <li key={item.id} onClick={() => handleItemClick(item.id)} style={{ cursor: 'pointer', fontWeight: selectedItemId === item.id ? 'bold' : 'normal' }}>
            {item.title}
            </li>
        ))}
        </ul>
    </div>
    );
}

export default SavedProgress;
