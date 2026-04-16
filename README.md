# 🚀 Backend File Management & Authentication System

A backend-focused project built with **Node.js, Express, and MongoDB** to learn and implement secure authentication, file uploads, and cloud storage using **Cloudinary**.

---

## 🎯 Purpose of the Project

This project is designed to:

* Learn **secure authentication (JWT-based)**
* Handle **file uploads efficiently**
* Store files on **Cloudinary (cloud storage)**
* Manage database records using **MongoDB**
* Understand **temporary local storage handling**

---

## ⚙️ Tech Stack

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* Multer (File Upload)
* Cloudinary (Cloud Storage)
* bcrypt (Password Hashing)

---

## 🔐 Features

* 🔑 **User Authentication**

  * Secure login & registration using JWT
  * Password hashing with bcrypt

* 📁 **File Upload System**

  * Upload files using Multer
  * Store files temporarily in local storage

* ☁️ **Cloudinary Integration**

  * Upload files to Cloudinary
  * Store file URL in MongoDB

* 🧹 **Auto Cleanup**

  * Delete file from local storage after upload to Cloudinary

* 🗄️ **Database Management**

  * Store user data and file metadata in MongoDB

---

## 🔄 File Upload Flow

1. User uploads file
2. File stored temporarily in local storage
3. File uploaded to Cloudinary
4. Cloudinary returns file URL
5. URL saved in MongoDB
6. Local file deleted automatically

---

## 📂 Project Structure

```bash
server/
├── config/        # DB & Cloudinary config
├── controllers/   # Business logic
├── models/        # Mongoose schemas
├── routes/        # API routes
├── middleware/    # Auth & upload middleware
├── utils/         # Helper functions (file delete, etc.)
└── server.js      # Entry point
```

---

## ⚙️ Environment Variables

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 🚀 Installation & Setup

```bash
git clone https://github.com/your-username/your-repo.git
cd server
npm install
npm run dev
```

---

## 📌 API Highlights

* `POST /api/auth/register` → Register user
* `POST /api/auth/login` → Login user
* `POST /api/upload` → Upload file
* `GET /api/files` → Get uploaded files

---

## 🎯 Learning Outcomes

* Hands-on experience with **secure backend development**
* Understanding of **file handling lifecycle**
* Integration of **third-party cloud services (Cloudinary)**
* Managing **scalable and clean backend architecture**

---

## 💡 Future Improvements

* Add file type validation
* Implement rate limiting
* Add role-based access control
* Optimize file upload performance

---

## 👨‍💻 Author

**Dayanand Kumar Gupta**
💻 Backend & Full Stack Developer

---

⭐ *This project is built for learning and mastering backend concepts.*
