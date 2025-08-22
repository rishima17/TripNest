🏕️ TripNest

A full-stack travel & stay listing web application where users can create, view, edit, and delete listings — with image uploads, reviews, favourites, and category filters.

🔗 Live Project: https://wanderlust-p0jp.onrender.com/

📸 Screenshots
🔹 Home Page
<img src="./screenshots/Home.png" alt="Home Page" width="600"/>
🔹 Create Listing Form
<img src="./screenshots/CreateListing.png" alt="Create Form" width="600"/>
🔹 View Listing
<img src="./screenshots/showListing.png" alt="Show Listing" width="600"/>
🚀 Features

🔐 User Authentication (Login/SignUp)

🏕️ Create, Read, Update, Delete (CRUD) for Listings

🖼️ Image Uploads via Multer + Cloudinary

❤️ Add/Remove favourites

💬 Post and delete reviews

🔎 Search and filter listings by category

📱 Fully responsive design for mobile & desktop

⚠️ Input validation and error handling

🛠️ Tech Stack
Category	Technology
Frontend	HTML, CSS, Bootstrap, EJS
Backend	Node.js, Express.js
Database	MongoDB, Mongoose
Auth	Passport.js (Local Strategy)
Uploads	Multer + Cloudinary
Validation	Joi, Express Error Middleware
Deployment	Render / Vercel / Netlify
📂 Folder Structure
tripnest/
├── models/
├── routes/
├── public/
├── views/
├── middleware/
├── utils/
├── app.js
└── README.md

🧪 Setup Instructions

Clone the repo:

git clone https://github.com/rishima17/TripNest.git
cd tripnest


Install dependencies:

npm install


Set up environment variables
Create a .env file in the project root:

DB_URL=your_mongodb_url
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret
SESSION_SECRET=your_random_secret


Run the app:

npm start

📄 License

This project is licensed under the MIT License.
