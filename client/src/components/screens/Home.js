import React,{useState,useEffect,useContext} from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { Card, Text, Button, Grid } from '@nextui-org/react';
import {UserContext} from '../../App'
import {Link} from 'react-router-dom'

 const Home = ()=>{
    const [data,setData] = useState([])
    const {state,dispatch} = useContext(UserContext)
    useEffect(()=>{
      fetch('/todas-las-instalaciones',{
          headers:{
              "Authorization":"Bearer "+localStorage.getItem("jwt")
          }
      }).then(res=>res.json())
      .then(result=>{
          console.log(result)
          setData(result.instalaciones)
      })
    },[])

    return(
        <div>
        <h2>Instalaciones</h2>
        <Col sm>
            <div style={{backgroundColor:'#FFF'}}>
                  <Grid.Container gap={1} justify="flex-start">
                      {
                        data.map(item => (
                          <Grid xs={6} sm={3}>
                              <Card hoverable clickable width="100%" key={item._id}>
                                  <Card.Body noPadding>
                                      <Card.Image
                                          objectFit="cover"
                                          autoResize={false}
                                          src={item.photo}
                                          width='100%'
                                          height={140}
                                          alt={item.name}
                                      />
                                  </Card.Body>
                                  <Card.Footer justify="flex-start">
                                      <Row justify="space-between">
                                          <Text b>
                                              {item.name}
                                          </Text>
                                      </Row>
                                  </Card.Footer>
                              </Card>
                          </Grid>
                      ))
                    }
                  </Grid.Container>
            </div>
        </Col>
        </div>
    )
 }

 export default Home
