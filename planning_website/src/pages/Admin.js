import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/form.css';
import '../css/styles.css';

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
        city: '',
        attraction: '',
        attractionAddress: '',
        hotel: '',
        hotelAddress: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleInsert = async () => {
        try {
            await axios.post('/api/attractions', formData);
            console.log('Inserting data:', formData);
            setFormData({
                country: '',
                city: '',
                attraction: '',
                attractionAddress: '',
                hotel: '',
                hotelAddress: '',
            });
        } catch (error) {
            console.error('Error inserting data:', error);
        }
    };

    return (
        <div className="form-container">
            <h2>Insert Form</h2>
            <div>
                <label>Country:</label>
                <input type="text" name="country" value={formData.country} onChange={handleInputChange} />
            </div>

            {/* Add similar divs for other fields */}

            <div className="button-container">
                <button onClick={handleInsert}>Insert Data</button>
            </div>
        </div>
    );
};

const UpdateDeleteForm = () => {
    const [selectedCountry, setSelectedCountry] = useState('');
    const [dataForSelectedCountry, setDataForSelectedCountry] = useState(null);

    const handleCountryChange = async (e) => {
        const selectedCountryId = e.target.value;

        try {
            const response = await axios.get(`/api/countries/${selectedCountryId}`);
            setDataForSelectedCountry(response.data);
        } catch (error) {
            console.error('Error fetching data for selected country:', error);
        }

        setSelectedCountry(selectedCountryId);
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`/api/countries/${selectedCountry}`, dataForSelectedCountry);
            console.log('Updating data:', dataForSelectedCountry);
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/countries/${selectedCountry}`);
            console.log('Deleting data:', dataForSelectedCountry);
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    return (
        <div className="form-container">
            <h2>Update/Delete Form</h2>
            <div>
                <label>Select Country:</label>
                <select value={selectedCountry} onChange={handleCountryChange}>
                    <option value="country1">Country 1</option>
                    <option value="country2">Country 2</option>
                    {/* Add options for other countries */}
                </select>
            </div>

            {dataForSelectedCountry && (
                <div>
                    <p>Country: {dataForSelectedCountry.country}</p>
                    {/* Render other fields similarly */}

                    <div className="button-container">
                        <button onClick={handleUpdate}>Update Data</button>
                        <button onClick={handleDelete}>Delete Data</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admin;
