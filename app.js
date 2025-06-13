import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from "connect-mongo";
import bcrypt from 'bcrypt';
import path from 'path';
import dotenv from 'dotenv';
import flash from 'connect-flash';
import { fileURLToPath } from 'url';

import User from "./models/User.js";
import Post from "./models/Post.js";

dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(flash());

app.set("view engine","ejs");

app.use(
    session({
        secret:"mysecretkey",
        resave: false,
        saveUninitialized : false,
        store: MongoStore.create({mongoUrl: process.env.MONGO_URL}),
        cookie: {
            maxAge: 1000 * 60 * 60
        }
    }));

mongoose
    .connect(process.env.MONGO_URL)
    .then(()=>console.log("✅ MongoDB Connected"))
    .catch((err)=>console.log("❌ MongoDB Error:",err));

app.use((req, res, next) => {
    res.locals.messages = {
        success: req.flash('success'),
        error: req.flash('error')
    };
    res.locals.user = req.session.userId ? { id: req.session.userId } : null;
    next();
});

app.get('/',(req,res)=>{
    res.render("home");
});

app.get("/signup",(req,res)=>{
    res.render('signup');
});

app.post('/signup',async(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    try{
        const hashedPassword = await bcrypt.hash(password,10);
        const newuser = new User({username,password: hashedPassword});
        await newuser.save();
        req.flash('success', '✅ Signup successful! Please login.');
        res.redirect('/login');
    } catch(err){
        console.log(err);
        req.flash('error','❌ Signup failed. Try another username.')
        res.redirect('/signup');
    }
});

app.get('/login',(req,res)=>{
    res.render('login');
});

app.post('/login',async(req,res)=>{
    const {username,password} = req.body;
    const user = await User.findOne({username});
    if(!user){
        req.flash('error','❌ No user found with that username');
        return res.send('No user found Try with another Username');
    }
    const isMatch = await bcrypt.compare(password,user.password);

    if(isMatch){
        req.session.userId = user._id;
        req.session.username = user.username;
        req.flash('success', '✅ Logged in successfully');
        res.redirect('/dashboard');
    } else {
        req.flash('error', '❌ Incorrect password');
        res.redirect('/login');
    }
});

app.get('/dashboard',async(req,res)=>{
    if(!req.session.userId){
        req.flash('error','🔒 Please login first');
        return res.redirect('/login');
    }
    try{
        const posts = await Post.find({user:req.session.userId}).populate('user');
        res.render('dashboard',{posts,username: req.session.username});
    }catch(err){
        console.error('Error fetching details:',err);
        req.flash('error','Something went wrong');
        res.redirect('/');
    }
});

app.get('/logout', (req, res) => {
    req.flash('success', '👋 You have logged out');
    req.session.destroy((err) => {
        if (err) {
            console.log("Logout error:", err);
            return res.redirect('/dashboard');
        }
        res.clearCookie('connect.sid');
        res.redirect('/login');
    });
});


app.get("/posts/new",(req,res)=>{
    if(!req.session.userId){
        return res.redirect('/login');
    }

    res.render("newpost");
});

app.post('/posts',async(req,res)=>{
    if(!req.session.userId){
        return res.redirect('/login');
    }

    const {title,content} = req.body;

    try{
        await Post.create({
            title,
            content,
            user: req.session.userId,
        });

        res.redirect('/dashboard');
    }catch(err){
        console.error("Error creating post: ",err);
        res.send('Something went wrong while creating the post');
    }
});

app.get('/posts',async(req,res)=>{
    const posts = await Post.find().populate('user');
    res.render('allposts',{posts});
})

app.get('/posts/:id/edit',async(req,res)=>{
    const {id} = req.params;
    const post = await Post.findById(id);

    if(!req.session.userId || post.user.toString() !== req.session.userId){
        return res.send('Unauthorized');
    }

    res.render('editpost',{post});
});

app.post('/posts/:id/edit',async(req,res)=>{
    const {id} = req.params;
    const {title,content} = req.body

    const post = await Post.findById(id);

    if(!req.session.userId || post.user.toString() !== req.session.userId){
        return res.send("Unauthorized");
    }

    post.title = title;
    post.content = content;

    await post.save();

    res.redirect('/dashboard');
});

app.post('/posts/:id/delete',async(req,res)=>{
    const{id} = req.params;
    const post = await Post.findById(id);
    if(!req.session.userId || post.user.toString() !== req.session.userId){
        return res.send("unauthorized");
    }
    await Post.findByIdAndDelete(id);
    res.redirect('/dashboard');
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`🚀 Server running on http://localhost:${PORT}`));