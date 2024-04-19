import React from 'react'
import NavbarA from '../components/Navbar/NavbarA'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Subscription = () => {
  return (
    <div>
        <NavbarA/>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>GOLD</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">BUY NOW</Button>
      </Card.Body>
    </Card>
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>SILVER</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">BUY NOW</Button>
      </Card.Body>
    </Card>
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>BRONZE</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">BUY NOW</Button>
      </Card.Body>
    </Card>
    </div>
    </div>
  )
}

export default Subscription
