const express = require('express');
const path = require('path');
const { videoUrls, imageUrls, TextPost } = require('./data.js');

const app = express();
const PORT = 3000;
app.use(express.json());

app.set('views', path.join(process.cwd(), 'views'));
app.set('view engine', 'ejs');

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('ErrorPosts.ejs', { message: "Internal Server Error" });
});

// Route for videos
app.get('/video', (req, res, next) => {
    try {
        const postName = req.query.name?.trim();
        if (!postName) {
            return res.status(400).json({ message: "Post name cannot be empty" });
        }

        const videoPost = videoUrls.find(post => post.name.trim() === postName);
        if (videoPost) {
            res.render("VideoPosts.ejs", { 'name': videoPost.name, 'url': videoPost.url });
        } else {
            res.status(404).json({ message: "Video post not found" });
        }
    } catch (error) {
        next(error);  // Pass error to global handler
    }
});

// Route for images
app.get('/image', (req, res, next) => {
    try {
        const postName = req.query.name?.trim();
        if (!postName) {
            return res.status(400).json({ message: "Post name cannot be empty" });
        }

        const imagePost = imageUrls.find(post => post.name.trim() === postName);
        if (imagePost) {
            res.render('ImagePosts.ejs', { 'name': imagePost.name, 'url': imagePost.url });
        } else {
            res.status(404).render('ErrorPosts.ejs');
        }
    } catch (error) {
        next(error);  // Pass error to global handler
    }
});

// Route for text posts
app.get('/text', (req, res, next) => {
    try {
        const postName = req.query.name?.trim();
        if (!postName) {
            return res.status(400).json({ message: "Post name cannot be empty" });
        }

        console.log(`Post name is: '${postName}'`);
        const textPost = TextPost.find(post => post.name.trim() === postName);

        if (textPost) {
            res.render('TextPosts.ejs', { 'name': textPost.name, 'desc': textPost.desc });
        } else {
            res.status(404).json({ message: "Text post not found" });
        }
    } catch (error) {
        next(error);
    }
});

// Catch-all route for invalid paths
app.get('*', (req, res) => {
    res.status(404).render('InvalidPath.ejs');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
