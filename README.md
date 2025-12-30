# 📋 Pastebin Application

A modern **Pastebin-like web application** built using **Node.js, Express, and MongoDB**.  
It allows users to quickly store and share text content using short URLs, with optional **time-based** or **view-based expiration**.

---

## 🚀 Features

- 🔗 **Quick Text Sharing** – Instantly generate shareable links  
- ⏳ **Time-based Expiration** – Auto-delete pastes after:
  - 10 minutes  
  - 1 hour  
  - 1 day  
  - 1 week  
- 👀 **View-based Expiration** – Limit how many times a paste can be viewed  
- 🧹 **Auto Cleanup** – Background job removes expired pastes  
- 📊 **View Counter** – Track number of views  
- 🧼 **Clean UI** – Simple and responsive frontend  
- ⚙️ **REST API** – Easy integration with other tools  

---

## 🧰 Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose ODM)  
- **Frontend:** HTML, CSS, JavaScript  
- **Deployment:** Vercel / Render / Railway  

---

## 📁 Project Structure

pastebin-app/
│
├── server.js # Main server file
├── package.json # Dependencies and scripts
├── .env # Environment variables
├── .env.example # Sample environment file
├── .gitignore
├── public/
│ ├── index.html # Create paste page
│ └── view.html # View paste page
└── README.md

yaml
Copy code

---

## ⚙️ Installation

### Prerequisites
- Node.js (v18 or later)
- MongoDB (Local or MongoDB Atlas)

---

### 🔧 Setup

```bash
git clone <your-repo-url>
cd pastebin-app
npm install
Create a .env file:

env
Copy code
MONGODB_URI=mongodb://localhost:27017/pastebin
PORT=3000
For MongoDB Atlas:

env
Copy code
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/pastebin
▶️ Run the App
bash
Copy code
# Development
npm run dev

# Production
npm start
Open in browser:

arduino
Copy code
http://localhost:3000
☁️ Deployment
✅ Option 1: Vercel (Recommended)
Create a MongoDB Atlas cluster

Whitelist IP: 0.0.0.0/0

Add MONGODB_URI in Vercel Environment Variables

Deploy:

bash
Copy code
npm install -g vercel
vercel
vercel --prod
✅ Option 2: Render
Create a Web Service

Set:

Build Command: npm install

Start Command: npm start

Add MONGODB_URI as environment variable

✅ Option 3: Railway
bash
Copy code
npm install -g @railway/cli
railway login
railway init
railway up
📡 API Documentation
➕ Create Paste
POST /api/paste

json
Copy code
{
  "content": "Your text here",
  "expiryMinutes": 60,
  "maxViews": 10
}
Response:

json
Copy code
{
  "success": true,
  "shortId": "abc123",
  "url": "https://your-domain.com/abc123",
  "expiresAt": "2025-12-30T10:00:00.000Z",
  "maxViews": 10
}
📄 Get Paste
GET /api/paste/:shortId

❌ Delete Paste
DELETE /api/paste/:shortId

❤️ Health Check
GET /api/health

json
Copy code
{
  "status": "ok",
  "mongodb": "connected"
}
🧪 Usage Examples
Create a Paste
bash
Copy code
curl -X POST https://your-domain.com/api/paste \
-H "Content-Type: application/json" \
-d '{
  "content": "Hello World!",
  "expiryMinutes": 60,
  "maxViews": 5
}'
Get a Paste
bash
Copy code
curl https://your-domain.com/api/paste/abc123
🔒 Security Considerations
Max content size: 1MB

Input validation & sanitization

Mongoose protects against NoSQL injection

Rate limiting recommended for production

🧠 Future Enhancements
Syntax highlighting

Password-protected pastes

User authentication

File uploads

Custom short URLs

Analytics dashboard

🛠 Troubleshooting
MongoDB Connection Issue
Check .env file

Ensure MongoDB is running

Whitelist your IP in MongoDB Atlas

Port Already in Use
bash
Copy code
PORT=3001
Reinstall Dependencies
bash
Copy code
rm -rf node_modules package-lock.json
npm install

