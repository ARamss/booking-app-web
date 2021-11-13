import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Card, Text, Button, Grid, Checkbox } from '@nextui-org/react';
import DateTimePicker from 'react-datetime-picker';

 const AgendarCita = ()=>{

   const [value, onChange] = useState(new Date());

    return(
      <div style={{ backgroundColor:'#F2F6F9', height: '100vh'}}>
        <Container fluid>
          <h1>Reservar</h1>
          <Row>
              <h3>Escoge una instalacion</h3>
              <Checkbox checked={true} size="large">large</Checkbox>
              <Checkbox checked={true} size="large">large</Checkbox>
              <Checkbox checked={true} size="large">large</Checkbox>
              <Checkbox checked={true} size="large">large</Checkbox>
              <DateTimePicker
              onChange={onChange}
              value={value}/>

          </Row>
        </Container>
      </div>
    )
 }

 export default AgendarCita
