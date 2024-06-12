import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import styled from "styled-components";
import EditPlayerModal from "./EditPlayerModal";
import { deletePlayerRoute } from "../utils/apiRoutes";
import axios from "axios";

export default function PlayerCard({ details, setFetchTrigger, onShowToasts }) {
  const [showEditPlayerModal, setShowEditPlayerModal] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const onHandleShowEditPlayerModal = () => {
    setShowEditPlayerModal(true);
  };

  const onHandleDeletePlayer = async () => {
    try {
      const id = details._id;
      const { data } = await axios.delete(`${deletePlayerRoute}/${id}`, {
        headers: {
          "x-token": localStorage.getItem("jwt-token"),
        },
      });
      if (data.status === true) {
        onShowToasts(data.msg, true);
        setFetchTrigger((prev) => prev + 1);
      } else {
        onShowToasts(data.msg, false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = () => {
    onHandleDeletePlayer();
    setShowDeleteConfirmation(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  return (
    <Container className="player-card">
      <img src={details.imageUrl} alt="profile" />
      <p>
        name : <span> {details.name} </span>
      </p>
      <p>
        age : <span> {details.age} </span>
      </p>
      <p>
        Role : <span> {details.role} </span>
      </p>
      <p>
        Team : <span> {details.team} </span>
      </p>
      <div className="buttons-container">
        <Button variant="dark" onClick={onHandleShowEditPlayerModal}>
          Edit
        </Button>
        <Button variant="danger" onClick={handleDeleteClick}>
          Delete
        </Button>
      </div>
      <EditPlayerModal
        showEditPlayerModal={showEditPlayerModal}
        setShowEditPlayerModal={setShowEditPlayerModal}
        details={details}
        setFetchTrigger={setFetchTrigger}
        onShowToasts={onShowToasts}
      />
      <Modal show={showDeleteConfirmation} onHide={handleCancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this player?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
            No
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

const Container = styled.div`
  background-color: #afdde5;
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 0.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  height: 22rem;
  width: 16rem;
  @media (orientation: portrait) {
    height: 17rem;
    width: 10rem;
    font-size: 0.7rem;
  }
  &:hover {
    background-color: lightgreen;
    transition: 0.4s ease-in-out;
  }
  img {
    height: 6rem;
    width: 6rem;
    padding-bottom: 1rem;
    @media (orientation: portrait) {
      height: 3rem;
      width: 3rem;
    }
  }
  p {
  }
  span {
    font-weight: bold;
  }
  .buttons-container {
    display: flex;
    align-items: center;
    gap: 1rem;
    Button {
      font-size: 0.7rem;
    }
  }
`;
