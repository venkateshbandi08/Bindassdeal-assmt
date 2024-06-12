import React from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function WelcomePage() {
  return (
    <Container>
      <img
        src="https://png.pngitem.com/pimgs/s/127-1270088_ipl-10-logo-png-vivo-ipl-2019-logo.png"
        alt="pic"
        className="wp-image"
      />
      <h3> Welcome to </h3>
      <h1> IPL Player's Club </h1>
      <div className="buttons-container">
        <Link to="/register">
          <Button variant="success"> Register </Button>
        </Link>
        <Link to="/login">
          <Button variant="success"> Login </Button>
        </Link>
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #afdde5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  img {
    width: 10%;
  }
  h3 {
    margin-bottom: -1.5rem;
  }
  .buttons-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 2rem;
  }
`;
