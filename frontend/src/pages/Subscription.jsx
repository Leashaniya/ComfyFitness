// import React from 'react'
// import NavbarA from '../components/Navbar/NavbarA'
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';
// import { useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const Subscription = () => {
//   const [subscriptions, setSubscriptions] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const navigate = useNavigate();


//   useEffect(() => {
//     const fetchSubscriptions = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:7505/subscription/"
//         );
//         setSubscriptions(response.data);
        
//       } catch (error) {
//         console.error("Error:", error.response.data.error);
//       }
//     };
//     fetchSubscriptions();
//   }, []);

//   const filteredSubscriptions = subscriptions.filter((subscription) =>
//     Object.values(subscription).some(
//       (value) =>
//         typeof value === "string" &&
//         value.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//   );


//   return (
//     <div>
//         <NavbarA/>
//         {/* <div style={{ display: 'flex', justifyContent: 'space-around' }}>
//         <Card style={{ width: '18rem' }}> */}
//       {/* <Card.Img variant="top" src="holder.js/100px180" />
//       <Card.Body>
//         <Card.Title>GOLD</Card.Title>
//         <Card.Text>
//           Some quick example text to build on the card title and make up the
//           bulk of the card's content.
//         </Card.Text>
//         <Button variant="primary">BUY NOW</Button>
//       </Card.Body>
//     </Card>
//     </div>
//     <div style={{ display: 'flex', justifyContent: 'space-around' }}>
//         <Card style={{ width: '18rem' }}>
//       <Card.Img variant="top" src="holder.js/100px180" />
//       <Card.Body>
//         <Card.Title>SILVER</Card.Title>
//         <Card.Text>
//           Some quick example text to build on the card title and make up the
//           bulk of the card's content.
//         </Card.Text>
//         <Button variant="primary">BUY NOW</Button>
//       </Card.Body>
//     </Card>
//     </div>
//     <div style={{ display: 'flex', justifyContent: 'space-around' }}>
//         <Card style={{ width: '18rem' }}>
//       <Card.Img variant="top" src="holder.js/100px180" />
//       <Card.Body>
//         <Card.Title>BRONZE</Card.Title>
//         <Card.Text>
//           Some quick example text to build on the card title and make up the
//           bulk of the card's content.
//         </Card.Text>
//         <Button variant="primary">BUY NOW</Button>
//       </Card.Body>
//     </Card>
//     </div>
//     </div> */}



//  {filteredSubscriptions.map((subscription) => (
//             <tr key={subscription.Id}>
            
//               <td>{subscription.packageName}</td>
//               <td>{subscription.duration}</td>
//               <td>{subscription.description}</td>
//               <td>{subscription.category}</td>

//               <button ><Link to={"/payment/pay"}></Link>Buy now</button>{" "}
            
//             </tr>
//           ))}
//     </div>
//   )
// }

// export default Subscription


import React, { useState, useEffect } from 'react';
import NavbarA from '../components/Navbar/NavbarA';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Subscription = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await axios.get('http://localhost:7505/subscription/');
        setSubscriptions(response.data);
      } catch (error) {
        console.error('Error:', error.response.data.error);
      }
    };
    fetchSubscriptions();
  }, []);

  const filteredSubscriptions = subscriptions.filter((subscription) =>
    Object.values(subscription).some(
      (value) =>
        typeof value === 'string' &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div>
      <NavbarA />
      <div className="subscription-list">
        {filteredSubscriptions.map((subscription) => (
          <div key={subscription.Id} className="subscription-item">
            <h3>{subscription.packageName}</h3>
            <p><strong>Duration:</strong> {subscription.duration}</p>
            <p><strong>Description:</strong> {subscription.description}</p>
            <p><strong>Category:</strong> {subscription.category}</p>
            <button>
              <Link to="/payment/pay">Buy now</Link>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscription;
