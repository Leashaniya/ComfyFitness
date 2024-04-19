
import Footer from "../footer/Footer";
import {useState} from "react";
import * as Yup from "yup";
//import { Link } from 'react-router-dom'
import '../css/pay.css'
import axios from 'axios';
import { Link } from "react-router-dom";
//import html2canvas from 'html2canvas';
//import jsPDF from 'jspdf';


const Pay = () => {
  const [formData, setFormData] = useState({
    paymentID: "",
    paymentAmount: "",
    paymentDate:"",
    pDescription: "",
    pAddressl:"",
    pCountry: "",
  });


 // const [loader, setLoader] = useState(false);

  
  



  const [errors, setErrors] = useState({});

  const validationSchema = Yup.object({
    paymentID: Yup.string().required("First Name is Required"),
    paymentAmount: Yup.number().typeError("Amount must be a number").min(1, "Amount must be atleast 1"),
    paymentDate: Yup.date().required("Payment Date is required"),
    pDescription: Yup.string().required("Payment description is required"),
    pAddressl: Yup.string().required("Payment address is required"),
    pCountry: Yup.string().required("Payment country is required"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();



    const nonParsed = {
      paymentID: "PID1254",
      paymentAmount: "25000",
      paymentDate:"2024-02-12",
      pDescription: "Monthly fee",
      pAddressl:"Colombo",
      pCountry: "Sri lanka",
     };

    const parsedUser = validationSchema.cast(nonParsed);

    console.log(nonParsed, parsedUser);

    try {
        await validationSchema.validate(formData, { abortEarly: false });
        const response = await axios.post('/payment/add', formData);
        console.log('Form submitted:', response.data);
        // Reset errors state
        setErrors({});
      } catch (error) {
        const newErrors = {};
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      }
      
  };

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

 

  return (
    <div>
    <div className="container">
    <form className="form" onSubmit={handleSubmit}>
      <div>
        <label>paymentID:</label>
        <input
          type="text"
          name="paymentID"
          value={formData.paymentID}
          placeholder="Enter your paymentID"
          onChange={handleChange}
        />
        {errors.paymentID && <div className="error">{errors.paymentID}</div>}
      </div>

      <div>
        <label>paymentAmount:</label>
        <input
          type="Number"
          name="paymentAmount"
          value={formData.paymentAmount}
          placeholder="Enter your payment Amount"
          onChange={handleChange}
        />
        {errors.paymentAmount && <div className="error">{errors.paymentAmount}</div>}
      </div>

      <div>
        <label>paymentDate:</label>
        <input
          type="Date"
          name="paymentDate"
          value={formData.paymentDate}
          placeholder="Enter your paymentDate"
          onChange={handleChange}
        />
        {errors.paymentDate && <div className="error">{errors.paymentDate}</div>}
      </div>

      <div>
        <label> pDescription:</label>
        <input
          type="text"
          name="pDescription"
          value={formData.pDescription}
          placeholder="Enter your Payment Description"
          onChange={handleChange}
        />
        {errors.pDescription && <div className="error">{errors.pDescription}</div>}
      </div>

      <div>
        <label>pAddressl:</label>
        <input
          type="text"
          name="pAddressl"
          value={formData.pAddressl}
          placeholder="Enter your pAddressl "
          onChange={handleChange}
        />
        {errors.pAddressl && (
          <div className="error">{errors.pAddressl}</div>
        )}
      </div>

      <div>
        <label>pCountry:</label>
        <input
          type="text"
          name="pCountry"
          value={formData.pCountry}
          placeholder="Enter your pCountry"
          onChange={handleChange}
        />
        {errors.pCountry && <div className="error">{errors.pCountry}</div>}
      </div>

     
        
     
      
      

      
      
      <button type="submit">Submit</button>
    </form>

<Link to="/card">card</Link>

    </div>
    <Footer />   
   </div>
  

  );
};

export default Pay;





    