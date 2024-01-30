import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/form.css';
import '../css/styles.css';
import '../css/Admin.css';  


function Admin() {
    const [action, setAction] = useState(null);

    const handleActionChange = (selectedAction) => {
        setAction(selectedAction);
    };

    return (
        <div className="form-container">
            <div>
                <label>
                    Choose Action:
                    <select
                        className="select-action"  
                        value={action}
                        onChange={(e) => handleActionChange(e.target.value)}
                    >
                        <option value="insert">Insert</option>
                        <option value="updateDelete">Update/Delete</option>
                    </select>
                </label>
            </div>
    
            {action === 'insert' && <InsertForm />}
            {action === 'updateDelete' && <UpdateDeleteForm />}
        </div>
    );
}

const InsertForm = () => {
    const [formData, setFormData] = useState({
        country: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleInsert = async () => {
        try {
            // Ensure the required 'name' field is included in the data
            await axios.post('http://127.0.0.1:8000/api/countries', { name: formData.country });
            console.log('Inserting data:', formData);
            setFormData({
                country: '',
            });
        } catch (error) {
            console.error('Error inserting data:', error.response?.data || error.message);
            // Display error message to the user or handle it appropriately
        }
    };

    return (
        <div className="form-container">
            <h2>Insert Form</h2>
            <div>
                <label>Country:</label>
                <input type="text" name="country" value={formData.country} onChange={handleInputChange} />
            </div>

            <div className="button-container">
                <button onClick={handleInsert}>Insert Data</button>
            </div>
        </div>
    );
};

const UpdateDeleteForm = () => {
    const [selectedCountry, setSelectedCountry] = useState('');
    const [dataForSelectedCountry, setDataForSelectedCountry] = useState(null);
    const [newCountryName, setNewCountryName] = useState('');
    const [countryOptions, setCountryOptions] = useState([]);

    useEffect(() => {
        // Fetch country options when the component mounts
        const fetchCountryOptions = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/countries');
                setCountryOptions(response.data);
            } catch (error) {
                console.error('Error fetching country options:', error.response?.data || error.message);
            }
        };

        fetchCountryOptions();
    }, []);

    const handleCountryChange = async (e) => {
        const selectedCountryId = e.target.value;

        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/countries/${selectedCountryId}`);
            setDataForSelectedCountry(response.data);
        } catch (error) {
            console.error('Error fetching data for selected country:', error.response?.data || error.message);
        }

        setSelectedCountry(selectedCountryId);
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`http://127.0.0.1:8000/api/countries/${selectedCountry}`, { name: newCountryName });
            console.log('Updating data:', { id: selectedCountry, name: newCountryName });
            // Optionally, update the local data to reflect the change
            setDataForSelectedCountry((prevData) => ({ ...prevData, country: newCountryName }));
            // Clear the input field
            setNewCountryName('');
        } catch (error) {
            console.error('Error updating data:', error.response?.data || error.message);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/countries/${selectedCountry}`);
            console.log('Deleting data:', dataForSelectedCountry);
            // Optionally, clear the selected country and its data after deletion
            setSelectedCountry('');
            setDataForSelectedCountry(null);
        } catch (error) {
            console.error('Error deleting data:', error.response?.data || error.message);
        }
    };

    return (
        <div className="form-container">
            <h2>Update/Delete Form</h2>
            <div>
                <label>Select Country:</label>
                <select value={selectedCountry} onChange={handleCountryChange}>
                    <option value="">Select a Country</option>
                    {countryOptions.map((country) => (
                        <option key={country.id} value={country.id}>
                            {country.name}
                        </option>
                    ))}
                </select>
            </div>

            {dataForSelectedCountry && (
    <div>
       

        <div>
            <label>Novo ime:</label>
            <input
                type="text"
                name="newCountryName"
                value={newCountryName}
                onChange={(e) => setNewCountryName(e.target.value)}
            />
        </div>
        <div className="button-container">
            <button onClick={handleUpdate}>Update </button>
            <button onClick={handleDelete}>Delete </button>
        </div>
    </div>
)}
        </div>
    );
};
export default Admin;
