# 🎓 Edux

<img width="980" height="1280" alt="screencapture-localhost-5173-2026-01-10-10_13_44" src="https://github.com/user-attachments/assets/6de73d84-d275-4dfa-9901-a2f4d3b632e1" />
<img width="780" height="960" alt="screencapture-localhost-5173-login-2026-01-10-10_13_20" src="https://github.com/user-attachments/assets/d7ece27f-dc5f-4da6-b4e1-bc480ec01abb" />


Edux is a university-focused web platform designed to help students share, request, and access academic resources in an organized and collaborative way.

The platform encourages peer-to-peer knowledge sharing while solving common problems such as expensive learning materials, scattered resources, and limited collaboration.

---

## 🚀 Features

- User authentication using JWT
- Upload and share academic resources:
  - Books
  - Slides
  - Videos
  - Exams
- Two resource access modes:
  - Downloadable resources
  - Request-based resources (ownership after approval)
- Real-time study rooms and chat using Socket.IO
- Resource reviews and ratings
- AI-powered resource suggestions
- User profiles and favorites
- Responsive and clean UI

---

## 🧠 AI Features

- Automatic resource categorization
- Related resource recommendations based on user activity

---

## 🛠 Tech Stack

### Frontend
- React.js
- Tailwind CSS
- JavaScript

### Backend
- Node.js
- Express.js
- MongoDB

### Other Technologies
- Socket.IO (real-time communication)
- JWT (authentication & authorization)
- Agile Development Methodology

---

## 📐 System Architecture

- RESTful API for backend services
- JWT-based authentication
- Real-time communication layer using Socket.IO
- Modular and scalable architecture

---

## 🗄 Database Design

Main entities:
- Users
- Resources
- Reviews
- Favorites
- Resource Requests
- Rooms
- Messages
- Notifications

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js
- MongoDB
- npm

### Clone the Repository
```bash
git clone https://github.com/amrfoqha/Edux.git
cd Edux

Backend Setup
cd server
npm install
npm run dev

Frontend Setup
cd client
npm install
npm run dev

🌐 Environment Variables

Create a .env file in the server directory:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

