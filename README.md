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
├── models/
│ ├── User.js
│ └── Post.js
├── public/
│ └── style.css
├── views/
│ ├── partials/
│ ├── signup.ejs
│ ├── login.ejs
│ ├── dashboard.ejs
│ ├──
│ ├──
│ ├──
│ └───
├── .env
├── app.js
└── README.md

```bash
git clone https://github.com/ArunJeevan29/blog-app.git
cd blog-app

🙋‍♂️ Author
Arun Jeevan SY
GitHub: @ArunJeevan29
