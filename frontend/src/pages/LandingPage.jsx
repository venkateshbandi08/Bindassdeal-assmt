import React, { useEffect, useState } from "react";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { playersListRoute } from "../utils/apiRoutes";
import axios from "axios";
import PlayerCard from "../components/PlayerCard";
import AddPlayerModal from "../components/AddPlayerModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LandingPage() {
  const navigate = useNavigate();
  const [playersList, setPlayersList] = useState([]);
  const [fetchTrigger, setFetchTrigger] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedSort, setSelectedSort] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("jwt-token")) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const getPlayersData = async () => {
      try {
        const { data } = await axios.get(playersListRoute, {
          headers: {
            "x-token": localStorage.getItem("jwt-token"),
          },
        });
        if (data.status === true) {
          setPlayersList(data.playersList);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getPlayersData();
  }, [fetchTrigger]);

  const toastOptions = {
    position: "top-right",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleAddPlayer = () => {
    setShowModal(true);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredPlayers = playersList
    .filter((player) => {
      const isMatchingSearch = player.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const isMatchingTeam = selectedTeam
        ? player.team.toLowerCase() === selectedTeam.toLowerCase()
        : true;
      return isMatchingSearch && isMatchingTeam;
    })
    .sort((a, b) => {
      if (selectedSort === "ascending") {
        return a.age - b.age;
      } else if (selectedSort === "descending") {
        return b.age - a.age;
      } else {
        return 0;
      }
    });

  const onShowToasts = (msg, status) => {
    if (status) {
      toast.success(msg, toastOptions);
    } else {
      toast.error(msg, toastOptions);
    }
  };

  const onHandleSelectedTeam = (eventKey) => {
    setSelectedTeam(eventKey);
  };

  const onHandleSelectedSort = (eventKey) => {
    setSelectedSort(eventKey);
  };

  const onHandleLogout = () => {
    localStorage.removeItem("jwt-token");
    navigate("/login");
  };

  return (
    <Container>
      <div className="top-section-container">
        <div className="brand-and-logout-button">
          <h1>
            <strong>IPL Player's Club</strong>
          </h1>
          <Button variant="danger" onClick={onHandleLogout}>
            {" "}
            Logout{" "}
          </Button>
        </div>
        <input
          placeholder="search player"
          value={searchQuery}
          onChange={handleSearch}
        />

        <Button onClick={handleAddPlayer}> Add Player </Button>
        <div className="add-and-sort-buttons">
          <DropdownButton
            variant="success"
            id="dropdown-basic"
            title="Filter Player's by Team"
            onSelect={onHandleSelectedTeam}
          >
            <Dropdown.Item eventKey="bengaluru">Bengaluru</Dropdown.Item>
            <Dropdown.Item eventKey="chennai">Chennai</Dropdown.Item>
            <Dropdown.Item eventKey="hyderabad">Hyderabad</Dropdown.Item>
            <Dropdown.Item eventKey="lucknow">Lucknow</Dropdown.Item>
            <Dropdown.Item eventKey="kolkata">Kolkata</Dropdown.Item>
            <Dropdown.Item eventKey="rajasthan">Rajasthan</Dropdown.Item>
            <Dropdown.Item eventKey="mumbai">Mumbai</Dropdown.Item>
            <Dropdown.Item eventKey="gujarat">Gujarat</Dropdown.Item>
            <Dropdown.Item eventKey="punjab">Punjab</Dropdown.Item>
            <Dropdown.Item eventKey="">Clear filter </Dropdown.Item>
          </DropdownButton>

          <DropdownButton
            variant="success"
            id="dropdown-basic"
            title="Sort Player's by Age"
            onSelect={onHandleSelectedSort}
          >
            <Dropdown.Item eventKey="ascending">Ascending</Dropdown.Item>
            <Dropdown.Item eventKey="descending">Descending</Dropdown.Item>
            <Dropdown.Item eventKey="">Clear sorting </Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
      <div className="all-players-container">
        {filteredPlayers.length > 0 ? (
          filteredPlayers.map((eachItem) => (
            <PlayerCard
              key={eachItem._id}
              details={eachItem}
              setFetchTrigger={setFetchTrigger}
              onShowToasts={onShowToasts}
            />
          ))
        ) : (
          <div>"No Searched Results Found"</div>
        )}
      </div>
      <AddPlayerModal
        showModal={showModal}
        setShowModal={setShowModal}
        setFetchTrigger={setFetchTrigger}
        onShowToasts={onShowToasts}
      />
      <ToastContainer />
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;

  .top-section-container {
    position: sticky;
    top: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: gray;
    z-index: 1000;
    padding: 1rem;
    width: 100vw;
    gap: 1rem;
    .brand-and-logout-button {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      button {
        margin-left: 4rem;
      }
    }
    .add-and-sort-buttons {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 1rem;
      @media (orientation: portrait) {
      }
    }
    input {
      width: 30%;
      padding: 0.5rem 2rem;
      font-weight: bold;
      border: 1px solid gray;
      outline: none;
      font-size: 1rem;
      @media (orientation: portrait) {
        width: 70%;
      }
    }
  }
  .all-players-container {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 2.5rem;
    gap: 2rem;
    @media (orientation: portrait) {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 1rem;
      gap: 2rem;
    }
  }
`;
