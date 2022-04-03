import React from 'react';
import {Carousel, Container, Image} from "react-bootstrap";

export class HomePage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }
        render () {
        return(
            <Container  style={{alignItems:"center"}}>
                    <h1 className={"the-title"}>Welcome to Sport WoW</h1>
                    <h2 style={{textAlign:"center"}}>Sport news, scores and ticket order website</h2>
                    <h6 style={{textAlign:"center"}}>Here you can see some examples of our great features</h6>
                    <Carousel variant={"dark"} fade={true} className={"center-carousal"}>
                          <Carousel.Item interval={1800}>
                            <img style={{display:"block",
                                   height: "auto",
                                   maxWidth: "100%"}}
                              className="d-block w-100 card-image"
                              src="/matches.jpg"
                              alt="First slide"
                            />
                            <Carousel.Caption>
                              <h5 style={{color:"black", backgroundColor:"whitesmoke", border:'solid 1px black',  borderRadius: '25px'}}>Leagues Tables</h5>
                              <p style={{color:"black", backgroundColor:"whitesmoke", border:'solid 1px black',  borderRadius: '25px'}} >See the current and up to dated league tables from all around the globe</p>
                            </Carousel.Caption>
                          </Carousel.Item >
                          <Carousel.Item interval={1800}>
                                <img style={{display:"block",
                                   height: "auto",
                                   maxWidth: "100%"}}
                              className="d-block w-100 card-image"
                              src="team.jpg"
                              alt="Second slide"
                            />
                            <Carousel.Caption>
                              <h5 style={{color:"black", backgroundColor:"whitesmoke", border:'solid 1px black',  borderRadius: '25px'}}>Team details</h5>
                              <p style={{color:"black", backgroundColor:"whitesmoke", border:'solid 1px black',  borderRadius: '25px'}}>Get all Needed information about your favorites teams</p>
                            </Carousel.Caption>
                          </Carousel.Item>
                          <Carousel.Item  interval={1800}>
                            <img style={{display:"block",
                                   height: "auto",
                                   maxWidth: "100%"}}
                              className="d-block w-100 card-image"
                              src="/tickets.jpg"
                              alt="Third slide"
                            />
                            <Carousel.Caption>
                              <h5 style={{color:"black", backgroundColor:"whitesmoke", border:'solid 1px black',  borderRadius: '25px'}}>
                                  Order Tickets
                              </h5>
                              <p style={{color:"black", backgroundColor:"whitesmoke", border:'solid 1px black',  borderRadius: '25px'}}>
                                 Order tickets for your wanted games with simple and safe payment and without the lines</p>
                            </Carousel.Caption>
                          </Carousel.Item>
                        <Carousel.Item  interval={1800}>
                            <img style={{display:"block",
                                   height: "auto",
                                   maxWidth: "100%"}}
                              className="d-block w-100 card-image"
                              src="/comare.jpg"
                              alt="Third slide"
                            />
                            <Carousel.Caption>
                              <h5 style={{color:"black", backgroundColor:"whitesmoke", border:'solid 1px black',  borderRadius: '25px'}}>
                                  Compare Players
                              </h5>
                              <p style={{color:"black", backgroundColor:"whitesmoke", border:'solid 1px black',  borderRadius: '25px'}}>
                                 Compare your favorite players from every league and club</p>
                            </Carousel.Caption>
                          </Carousel.Item>
                        </Carousel>
                    <h6 style={{textAlign:"center"}}> And ALOT more is waiting just for you...</h6>
            </Container>
        )
    }
}