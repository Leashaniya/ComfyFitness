// export default EditCustomer;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditSubscription() {
  const { Id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    packageName: "", // Edit this field as needed
    price: "", // Edit this field as needed
    duration: "", // Edit this field as needed
    description: "", // Edit this field as needed
    category: "", 
    startDate: "", 
    endDate: "", // Edit this field as needed
  });

  useEffect(() => {
    const fetchSubscription= async () => {
      try {
        const response = await axios.get(
          `http://localhost:7505/subscription/get/${Id}`
        );
        const subscriptionData = response.data;
        setFormData(subscriptionData);
      } catch (error) {
        console.error("Error:", error.response.data.error);
      }
    };
    fetchSubscription();
  }, [Id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:7505/subscription/update/${Id}`,
        formData
      );
      console.log("subscription details updated successfully!");
      alert("subscription details updated successfully!");
      navigate("/subscription/");
      // Optionally, you can redirect the user or display a success message
    } catch (error) {
      console.error("Error:", error.response.data.error);
      // Optionally, you can display an error message to the user
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
    <div>
      <h2>Edit Subscription</h2>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>packageName:</td>
              <td>
                <input
                  type="text"
                  name="packageName"
                  value={formData.packageName}
                  onChange={handleChange}
                  style={{ width: "300px" }} // Adjust the width as needed
                  required
                />
              </td>
            </tr>
            <tr>
              <td>price:</td>
              <td>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  style={{ width: "300px" }} // Adjust the width as needed
                  required
                />
              </td>
            </tr>
            <tr>
              <td>duration:</td>
              <td>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  style={{ width: "300px" }} // Adjust the width as needed
                  required
                />
              </td>
            </tr>
            <tr>
              <td>description:</td>
              <td>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  style={{ width: "300px" }} // Adjust the width as needed
                  required
                />
              </td>
            </tr>
            <tr>
              <td>category:</td>
              <td>
              <label>
          Category Type:
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select category Type</option>
            <option value="Special">Special</option>
            <option value="Normal">Normal</option>
          </select>
        </label>
              </td>
            </tr>
            <tr>
              <td>startDate:</td>
              <td>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  style={{ width: "300px" }} // Adjust the width as needed
                  required
                />
              </td>
            </tr>
            <tr>
              <td>endDate:</td>
              <td>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  style={{ width: "300px" }} // Adjust the width as needed
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit">Update</button>
      </form>
    </div>
  </div>
  

  );
}

export default EditSubscription;
