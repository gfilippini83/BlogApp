import React, { Component } from 'react';
import { Jumbotron, Button, Container } from 'react-bootstrap';
import './Home.css';

const Stories = (props) => {
    const { elem }  = props; 
    return(
        <div>{elem.content}</div>
    );
}

export default class Home extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const arr = [
            {
                imgs: [],
                content: 'test123123'
            },
            {
                imgs: [],
                content: 'Test New Story'
            },
            {
                imgs: [],
                content: 'Tesadasd'
            },
            {
                imgs: [],
                content: 'gas'
            },
        ];
        return (
            <Container fluid>
                <Jumbotron className="Jumbo">
                    <h1>This is a simple hero unit, a simple jumbotron-style component for calling
                    extra attention to featured content or information.</h1>
                    <div className="Buttons">
                    <Button variant="primary" className="Left">Login</Button>
                    <Button variant="primary">Sign Up</Button>
                    </div>
                </Jumbotron>
                {arr.map((elem,index) => (<Stories key={index} elem={elem}/>))}
          </Container>
        );
    }
}