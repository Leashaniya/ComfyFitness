import React, { useState, useEffect } from 'react';
import NavbarA from '../components/Navbar/NavbarA';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Pay.css';
import bgPckg from '../assets/bgPckg.png';

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
    <div className="par" style={{ backgroundImage: `url(${bgPckg})` }}>
      <NavbarA />
      <div className="secSub">
        <div className="mySubs">
          {filteredSubscriptions.map((subscription) => (
            <div key={subscription.Id} className="subsItem">
              <div className="pckgTopic">{subscription.packageName}</div>
              <p><strong>Duration:</strong> {subscription.duration}</p>
              <p><strong>Description:</strong> {subscription.description}</p>
              <p><strong>Category:</strong> {subscription.category}</p>
              <div>
                <button className="btnStyle">
                  <Link to="/payment/add">Buy now</Link>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subscription;


