## Hosted Project

[JWT-Based Authentication URL](https://auth-role-based-access-control.onrender.com/api/v1)

#### Setup Basic Express Server

# JWT-Based Authentication Schema Design

## User Story
This is a secure authentication and role-based access control (RBAC) system built with Node.js, Express.js, and MongoDB. It uses JWT authentication with session management to ensure secure access control.

## Requirement Analysis

### Features:
- User authentication (signup, login, logout)
- Role-based access control (RBAC) (e.g., ADMIN, SHIPPER, CARRIER)
- JWT authentication with session tracking
- Secure API with best practices (Helmet, CORS, Rate Limiting, XSS Protection, MongoDB Sanitization)
- Modular architecture with middleware for authentication and authorization

### Prerequisites:
- Before you begin, ensure you have the following installed:
- Node.js (v22 or later)
- MongoDB (Local or Cloud Instance)
- Postman (For testing API requests)

### Installation
Clone the repository: 
- git clone https://github.com/Temidayo-shittu/auth-role-based-access-control.git
- cd auth-rbac

Install dependencies:
- npm install

Set up environment variables:
- Create a .env file in the root directory and add the following:
- PORT=5000
- MONGO_URL=mongodb://localhost:27017/authRBAC
- JWT_SECRET=your_secret_key
- JWT_LIFETIME=1d

### Running the API
To start the server locally, run:
- npm run dev  # Uses nodemon for auto-reloading or npm run start(node app.js)
- The API should now be running at http://localhost:5000

### RESTful API endpoints
- Authentication Routes
- POST /api/v1/auth/user/signup (User Registration)
- POST /api/v1/auth/admin/signup (Admin Registration)
- POST /api/v1/auth/login (Login)
- POST /api/v1/auth/logout (Logout)

- User Routes (All Protected Routes)
- GET /api/v1/users/all (Get all users (Admin only))
- GET /api/v1/users/:id (Get a single user by ID)
- GET /api/v1/users/ (Get current logged-in user)

### Security Features
- JWT authentication with session validation
- Role-based access control to restrict unauthorized access
- Helmet to set secure HTTP headers
- CORS to allow controlled API access
- Rate Limiting to prevent abuse (max 60 requests per 15 min)
- XSS Clean to sanitize user input
- MongoDB Sanitization to prevent NoSQL injections

### Deployment on Render
To deploy this API on Render:
- Create a new Web Service on Render.
- Connect your GitHub repository containing this project.
- Set environment variables in the Render dashboard (same as the .env file).
- Choose the build command: npm install && npm run build
- Set the start command: npm start
- Deploy and monitor logs to ensure everything runs correctly.

### Troubleshooting
- Module not found error? Ensure you have installed all dependencies with npm install.
- MongoDB connection issues? Check if your MONGO_URL in .env is correct and MongoDB is running.
- Server not starting? Check the logs for errors using: npm run dev

### Postman Link:
https://galactic-resonance-793427.postman.co/workspace/TINKTEQ~d4473f16-880b-4a7f-8abf-e7b53be2711a/collection/26636754-b7ee598b-88c1-40a6-accd-d80805df7dcf?action=share&creator=26636754

### Server Link:
https://auth-role-based-access-control.onrender.com/api/v1

