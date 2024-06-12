import React, { useState } from "react";
import axios from "axios";
import { Button, Modal, Form } from "react-bootstrap";
import { addPlayerRoute } from "../utils/apiRoutes";

export default function AddPlayerModal({
  showModal,
  setShowModal,
  setFetchTrigger,
  onShowToasts,
}) {
  const [newPlayer, setNewPlayer] = useState({
    name: "",
    age: "",
    team: "",
    role: "",
    imageUrl: "",
  });

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPlayer({ ...newPlayer, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post(addPlayerRoute, newPlayer, {
        headers: {
          "x-token": localStorage.getItem("jwt-token"),
        },
      });
      if (data.status === true) {
        setFetchTrigger((prev) => prev + 1);
        setShowModal(false);
        onShowToasts(data.msg, true);
        setNewPlayer({
          name: "",
          age: "",
          team: "",
          role: "",
          imageUrl: "",
        });
      } else {
        onShowToasts(data.msg, false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Player</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Name*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              name="name"
              value={newPlayer.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Age*</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter age"
              name="age"
              value={newPlayer.age}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Team*</Form.Label>
            <Form.Select
              name="team"
              value={newPlayer.team}
              onChange={handleChange}
            >
              <option value="">Select team</option>
              <option value="bengaluru">Bengaluru</option>
              <option value="chennai">Chennai</option>
              <option value="mumbai">Mumbai</option>
              <option value="kolkata">Kolkata</option>
              <option value="gujarat">Gujarat</option>
              <option value="rajasthan">Rajasthan</option>
              <option value="delhi">Delhi</option>
              <option value="lucknow">Lucknow</option>
              <option value="hyderabad">Hyderabad</option>
              <option value="punjab">Punjab</option>
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Role*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter role"
              name="role"
              value={newPlayer.role}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter image URL"
              name="imageUrl"
              value={newPlayer.imageUrl}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Add Player
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
