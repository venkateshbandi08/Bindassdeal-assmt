import React, { useState } from "react";
import axios from "axios";
import { Button, Modal, Form } from "react-bootstrap";
import { editPlayerRoute } from "../utils/apiRoutes";

export default function EditPlayerModal({
  showEditPlayerModal,
  setShowEditPlayerModal,
  details,
  setFetchTrigger,
  onShowToasts,
}) {
  const [editedPlayerDetails, setEditedPlayerDetails] = useState({
    name: details.name,
    age: details.age,
    team: details.team,
    role: details.role,
    imageUrl: details.imageUrl,
  });

  const handleCloseModal = () => {
    setShowEditPlayerModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedPlayerDetails({ ...editedPlayerDetails, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const id = details._id;
      const { data } = await axios.put(
        `${editPlayerRoute}${id}`,
        editedPlayerDetails,
        {
          headers: {
            "x-token": localStorage.getItem("jwt-token"),
          },
        }
      );
      if (data.status === true) {
        onShowToasts(data.msg, true);
        setFetchTrigger((prev) => prev + 1);
        setShowEditPlayerModal(false);
      } else {
        onShowToasts(data.msg, false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal show={showEditPlayerModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Player</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Name*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              name="name"
              value={editedPlayerDetails.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Age*</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter age"
              name="age"
              value={editedPlayerDetails.age}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Team*</Form.Label>
            <Form.Select
              name="team"
              value={editedPlayerDetails.team}
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
              value={editedPlayerDetails.role}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter image URL"
              name="imageUrl"
              value={editedPlayerDetails.imageUrl}
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
