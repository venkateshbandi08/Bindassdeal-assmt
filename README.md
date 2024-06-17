# IPL Player's Club

### Deployed link : https://bindaasdeal-v08.vercel.app/
### Demo video : https://www.loom.com/share/74fe2a5641ba49088c8737d8b731228f?sid=3fe6802d-cb7b-4b54-8a18-580c5a47f977

## Project Overview
This project is a web application designed to manage an IPL player's club. It allows users to perform CRUD operations on player data, search for players, filter players by team, and manage sessions using JWT for authentication. The project includes both a backend and a frontend, implemented using modern technologies.

## Technologies Used
- **Frontend:** React, React Bootstrap, Styled Components
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Styling:** React Bootstrap, Styled Components

## Features
- **CRUD Operations:** Create, read, update, and delete player data.
- **Search Functionality:** Search for players by name.
- **Filter Players:** Filter players by team.
- **Sort Players:** Sort players by age.
- **Session Management:** Use JWT for user authentication and session management.
- **Modals:** Add and edit players using modal dialogs.
- **Toasts:** Display success and error messages using toast notifications.

## Setup Instructions

### Backend
1. **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd <your-repo-directory>
    ```

2. **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

3. **Install dependencies:**
    ```bash
    npm install
    ```

4. **Set up environment variables:**
    Create a `.env` file in the backend directory and add the following:
    ```env
    PORT=5000
    MONGODB_URI=<your-mongodb-uri>
    JWT_SECRET=<your-jwt-secret>
    ```

5. **Run the backend server:**
    ```bash
    npm start
    ```

### Frontend
1. **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Set up environment variables:**
    Create a `.env` file in the frontend directory and add the following:
    ```env
    REACT_APP_API_URL=http://localhost:5000
    ```

4. **Run the frontend server:**
    ```bash
    npm start
    ```

### Usage
1. **Access the application:**
    Open your browser and navigate to `http://localhost:3000`.

2. **Login:**
    If you don't have an account, you need to register first. After registration, login to access the main features of the application.

3. **Add a Player:**
    Click on the "Add Player" button to open the modal dialog and fill in the player details.

4. **Edit a Player:**
    Click on the "Edit" button on a player's card to open the modal dialog and update the player details.

5. **Delete a Player:**
    Click on the "Delete" button on a player's card to open the confirmation popup. Confirm the deletion to remove the player.

6. **Search for Players:**
    Use the search input to filter players by name.

7. **Filter by Team:**
    Use the dropdown to filter players by team.

8. **Sort by Age:**
    Use the dropdown to sort players by age.

## Project Structure

### Backend
- **server.js:** Entry point of the backend application.
- **routes:** Contains route files for different entities.
- **controllers:** Contains controller files for handling business logic.
- **models:** Contains Mongoose schema definitions.
- **middleware:** Contains middleware functions, including JWT authentication.

### Frontend
- **src/components:** Contains React components.
- **src/pages:** Contains main pages of the application.
- **src/utils:** Contains utility files such as API routes.
- **src/styles:** Contains styled-components definitions.
- **src/App.js:** Entry point of the frontend application.

## Contributing
1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push the branch to your fork.
4. Create a pull request to the main repository.

