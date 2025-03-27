RESTful API with Authentication (Node.js, Express, MongoDB, JWT)
🚀 A simple and secure RESTful API with user authentication using Node.js, Express, MongoDB, and JWT (JSON Web Token).

📌 Features
✅ User registration & login
✅ Secure JWT authentication
✅ MongoDB database connection
✅ Protected routes
✅ Environment variable support (.env)
✅ Scalable project structure

🚀 Installation & Setup
1️⃣ Clone the Repository
sh
Copy
Edit
git clone https://github.com/your-username/restful-api-auth.git
cd restful-api-auth
2️⃣ Install Dependencies
sh
Copy
Edit
npm install
3️⃣ Configure Environment Variables
Create a .env file:

ini
Copy
Edit
MONGO_URI=mongodb://0.0.0.0/auth
PORT=5005
JWT_SECRET=your-strong-secret-key
4️⃣ Start the Server
sh
Copy
Edit
npm start
Or use nodemon for automatic restarts:

sh
Copy
Edit
npm install -g nodemon
nodemon server.js
🔗 API Endpoints
Method Endpoint Description Auth Required
POST /api/auth/register Register new user ❌
POST /api/auth/login Login & get token ❌
GET /api/users/profile Get logged-in user profile ✅
🔐 Authentication
After login, a JWT token is returned.

Send the token in the Authorization header to access protected routes:

makefile
Copy
Edit
Authorization: Bearer YOUR_TOKEN_HERE
📌 Example Requests
Register User
sh
Copy
Edit
curl -X POST http://localhost:5005/api/auth/register \
 -H "Content-Type: application/json" \
 -d '{"username": "testuser", "email": "test@example.com", "password": "password123"}'
Login User
sh
Copy
Edit
curl -X POST http://localhost:5005/api/auth/login \
 -H "Content-Type: application/json" \
 -d '{"email": "test@example.com", "password": "password123"}'
Get User Profile (Protected)
sh
Copy
Edit
curl -X GET http://localhost:5005/api/users/profile \
 -H "Authorization: Bearer YOUR_TOKEN_HERE"
🛠 Tech Stack
Backend: Node.js, Express.js

Database: MongoDB (Mongoose)

Authentication: JWT, bcrypt.js

Environment Config: dotenv

🛡 Security Best Practices
✅ Use HTTPS in production
✅ Store secrets in environment variables
✅ Implement refresh tokens
✅ Use rate limiting to prevent abuse

📜 License
This project is licensed under the ISC License.
