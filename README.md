# Online Voting System

## Overview

The Online Voting System is a secure web-based application that allows users to register, authenticate, and vote in elections. It ensures voter authentication, prevents duplicate votes, records votes in a database, and displays real-time election results.

## Features

- **User Registration & Authentication**: Users must register before casting a vote.

- **Secure Voting Process**: Ensures that each voter can only vote once.

- **Real-time Results**: Displays dynamic election results.

- **Contact Form**: Allows users to submit inquiries.

- **Mobile Responsive Design**: Works seamlessly on different screen sizes.

## Project Structure

```
voting-system/
│── public/
│   ├── index.html (Home page)
│   ├── about.html (About page)
│   ├── contact.html (Contact form page)
│   ├── vote.html (Voting page)
│   ├── results.html (Results page)
│   ├── css/
│   │   ├── style.css (Main styles)
│── models/
│   ├── contact.js (Schema for contact form submissions)
│   ├── vote.js (Schema for storing votes securely)
│── server.js (Main server file)
│── package.json (Dependencies and scripts)

```

## Installation & Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v12 or later)
- [MongoDB](https://www.mongodb.com/) (Local or cloud-based)

### Steps

1. Clone this repository:
   ```sh
   git clone https://github.com/your-repo/voting-system.git
   cd voting-system
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start MongoDB (if running locally):
   ```sh
   mongod
   ```
4. Run the server:
   ```sh
   node server.js
   ```
5. Open your browser and visit:
   ```
   http://localhost:3000
   ```

## API Endpoints

- **POST /api/register**: Register a new voter and submit a vote.
- **POST /api/contact**: Submit a contact form message.
- **GET /api/results**: Retrieve election results.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: bcrypt.js for password hashing

## Future Enhancements

- Admin dashboard for managing votes and users.
- Email verification for voter registration.
- More advanced security measures for authentication.

## License

This project is open-source and available under the [MIT License](LICENSE).

