import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import '../index.css'

function MembershipList  ()  {
    const [memberships, setMemberships] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchMemberships= async () => {
        try {
          const response = await axios.get(
            "http://localhost:7505/membership/"
          );
          setMemberships(response.data);
        } catch (error) {
          console.error("Error:", error.response.data.error);
        }
      };
      fetchMemberships();
    }, []);
  
  
    const handleEdit = (id) => {
      navigate(`/membership/update/${id}`);
    };
  
    const handleCreate = (id) => {
      navigate(`/membership/add`);
    };
  
    const handleDelete = async (id) => {
      try {
        await axios.delete(`http://localhost:7505/membership/delete/${id}`);
        setMemberships(memberships.filter((membership) => membership.Id !== id));
        console.log("membership deleted successfully!");
        alert("membership deleted successfully!");
      } catch (error) {
        console.error("Error:", error.response.data.error);
      }
    };
  
    const handleSearch = (e) => {
      setSearchTerm(e.target.value);
    };
    const filteredMemberships= memberships.filter((membership) =>
      Object.values(membership).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  
    // const generateCSVReport = () => {
    //   const csvData = "Package ID, Package Name, Duration, Description, Category, Start Date, End Date\n";
    //   const rows = subscriptions.map((subscription) => (
    //     `${subscription.Id},${subscription.packageName},${subscription.duration},${subscription.description},${subscription.category},${subscription.startDate},${subscription.endDate}\n`
    //   ));
    //   const csvContent = csvData + rows.join("");
    //   const encodedUri = encodeURI(csvContent);
    //   const link = document.createElement("a");
    //   link.setAttribute("href", "data:text/csv;charset=utf-8," + encodedUri);
    //   link.setAttribute("download", "subscription_report.csv");
    //   document.body.appendChild(link);
    //   link.click();
    // };
    // const generatePDFReport = () => {
    //   const input = document.getElementById("subscription-table");
    //   html2canvas(input)
    //     .then((canvas) => {
    //       const imgData = canvas.toDataURL("image/png");
  
    //       // Calculate the scale factor to fit the content inside the PDF
    //       const scaleFactor = 0.5; // Adjust this value as needed
    //       const width = canvas.width * scaleFactor;
    //       const height = canvas.height * scaleFactor;
  
    //       const pdf = new jsPDF("p", "mm", "a1");
    //       pdf.addImage(imgData, "PNG", 0, 0, width, height);
    //       pdf.save("subscription_report.pdf");
    //     });
    // };
  
    return (
      <div className="subscription-list-container">
        <h2 className="subscription-list-header">Membership List</h2>
        <input
          className="search-input"
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <button className="create-button" onClick={() => handleCreate()}>
          Create a new membership
        </button>
        <table className="subscription-table" id="subscription-table">
          <thead>
            <tr>
              <th>Membership ID</th>
              <th>email</th>
              <th>membershipType</th>
              <th>expirationDate</th>
            </tr>
          </thead>
          <tbody>
            {filteredMemberships.map((membership) => (
              <tr key={membership.Id}>
                <td>{membership.Id}</td>
                <td>{membership.email}</td>
                <td>{membership.membershipType}</td>
                <td>{membership.expirationDate}</td>
                <td className="action-buttons">
                  <button onClick={() => handleEdit(membership.Id)}>Edit</button>{" "}
                  <button onClick={() => handleDelete(membership.Id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <div className="report-buttons">
          <button onClick={generateCSVReport}>Download CSV Report</button>
          <button onClick={generatePDFReport}>Download PDF Report</button>
        </div> */}
      </div>
    );
  }

export default MembershipList
