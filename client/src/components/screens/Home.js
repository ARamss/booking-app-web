import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Card, Text, Button, Grid } from '@nextui-org/react';

 const Home = ()=>{
       const list = [
         {
           title: 'Orange',
           img: '/images/fruit-1.jpeg',
           price: '$5.50'
         },
         {
           title: 'Tangerine',
           img: '/images/fruit-2.jpeg',
           price: '$3.00'
         },
         {
           title: 'Raspberry',
           img: '/images/fruit-3.jpeg',
           price: '$10.00'
         },
         {
           title: 'Lemon',
           img: '/images/fruit-4.jpeg',
           price: '$5.30'
         },
         {
           title: 'Advocato',
           img: '/images/fruit-5.jpeg',
           price: '$15.70'
         },
         {
           title: 'Lemon 2',
           img: '/images/fruit-6.jpeg',
           price: '$8.00'
         },
         {
           title: 'Banana',
           img: '/images/fruit-7.jpeg',
           price: '$7.50'
         },
         {
           title: 'Watermelon',
           img: '/images/fruit-8.jpeg',
           price: '$12.20'
         }
     ];

    return(
        <div>
        <h2>Instalaciones</h2>
        <Col sm>
            <div style={{backgroundColor:'#FFF'}}>
                  <Grid.Container gap={1} justify="flex-start">
                      {list.map((item, index) => (
                          <Grid xs={6} sm={3} key={index}>
                              <Card hoverable clickable width="100%">
                                  <Card.Body noPadding>
                                      <Card.Image
                                          objectFit="cover"
                                          autoResize={false}
                                          src={item.img}
                                          width='100%'
                                          height={140}
                                          alt={item.title}
                                      />
                                  </Card.Body>
                                  <Card.Footer justify="flex-start">
                                      <Row justify="space-between">
                                          <Text b>
                                              {item.title}
                                          </Text>
                                          <Text weight={500} style={{ opacity: 0.6 }}>
                                              {item.price}
                                          </Text>
                                      </Row>
                                  </Card.Footer>
                              </Card>
                          </Grid>
                      ))}
                  </Grid.Container>
            </div>
        </Col>
        </div>
    )
 }

 export default Home
