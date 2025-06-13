# 📝 Blog App

A modern full-stack Blog Application built with **Node.js**, **Express.js**, **MongoDB**, and **EJS**. It supports full authentication, post management (Create, Edit, Delete), and real-time user feedback using flash messages.

---

## 🚀 Features

- 🔐 User Signup & Login (with password encryption using `bcrypt`)
- 🧠 Session-based Authentication with `express-session`
- 📚 Create, Edit, Delete Blog Posts (Only by the post owner)
- 📄 View all public blog posts
- 💬 Flash Messages for real-time success & error feedback
- 🖥️ Clean UI with partial templates using EJS

---

## 🛠️ Tech Stack

| Technology        | Purpose                          |
|-------------------|----------------------------------|
| Node.js           | JavaScript runtime               |
| Express.js        | Backend web framework            |
| MongoDB + Mongoose| Database & ODM for data models   |
| EJS               | Template engine for UI rendering |
| bcrypt            | Password hashing & security      |
| express-session   | Session management               |
| connect-mongo     | Stores sessions in MongoDB       |
| connect-flash     | Flash messages for feedback      |

---

## 📂 Project Structure

blog-app/
│
├── app.js                   # Main Express server
├── .env                     # Environment variables (not pushed to GitHub)
├── package.json             # Project metadata and dependencies
├── package-lock.json        # Dependency lock file
├── public/                  # Public assets (CSS, images)
│   ├── style.css            # Custom frontend styling
│   └── images/              # Blog post images and design assets
├── views/                   # EJS templates
│   ├── partials/            # Header, footer, and reusable components
│   ├── dashboard.ejs        # User dashboard
│   ├── login.ejs            # Login page
│   ├── signup.ejs           # Signup page
│   ├── newpost.ejs          # Post creation page
│   ├── allposts.ejs         # Public all-posts view
│   └── editpost.ejs         # Edit post page
├── routes/                  # Express route files
│   ├── auth.js              # Authentication routes
│   └── post.js              # Post management routes
├── models/                  # Mongoose schemas
│   ├── User.js              # User schema
│   └── Post.js              # Blog post schema
└── README.md                # Project documentation (this file)


```bash
git clone https://github.com/ArunJeevan29/blog-app.git
cd blog-app

🙋‍♂️ Author
Arun Jeevan SY
GitHub: @ArunJeevan29
