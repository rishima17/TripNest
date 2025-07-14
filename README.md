<<<<<<< HEAD
# 🏕️ Wanderlust

> A full-stack campground listing web application where users can create, view, edit, and delete campgrounds — complete with image uploads, location maps, and user reviews.

---
Project-link:https://wanderlust-p0jp.onrender.com

## 🚀 Features

- 🔐 User Authentication (Login/SignUp)
- 🏕️ Create, Read, Update, Delete (CRUD) for Listings
- 🖼️ Upload Listings images (Cloudinary)
- 💬 Post and delete reviews
- 🔎 Search for Listings
- 🌐 Responsive EJS frontend with Bootstrap styling
- ⚠️ Input validation and error handling

---

## 🛠️ Tech Stack

| Category       | Technology                           |
| -------------- | ------------------------------------ |
| Frontend       | HTML, CSS, Bootstrap, EJS            |
| Backend        | Node.js, Express.js                  |
| Database       | MongoDB, Mongoose                    |
| Authentication | Passport.js (Local Strategy)         |
| File Uploads   | Multer + Cloudinary                  |
| Validation     | Joi, Express Error Middleware        |
| Deployment     | (Optional) Render / Vercel / Netifly |

---

## 📂 Folder Structure

```
wanderlust/
├── models/
├── routes/
├── public/
├── views/
├── middleware/
├── utils/
├── app.js
└── README.md
```

---

## 🧪 Setup Instructions

1. **Clone the repo:**

```bash
git clone https://github.com/your-username/wanderlust.git
cd wanderlust
```

2. **Install dependencies:**

```bash
npm install
```

3. **Set up environment variables:**  
   Create a `.env` file:

```env
DB_URL=your_mongodb_url
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret
SESSION_SECRET=your_random_secret
```

4. **Run the app:**

```bash
npm start
```

---

## 📄 License

This project is licensed under the MIT License.

---



