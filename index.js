import express from 'express';
import { videoUrls, imageUrls, TextPost } from './data.js';

const app = express();
const PORT = 3000;
app.use(express.json())
// app.use(helmet())
app.set('view engine', 'ejs')
app.get('/video', (req, res) => {
    const postName = req.query.name.trim();
    const videoPost = videoUrls.find(post => post.name.trim() === postName);

    if (videoPost) {
        res.render("VideoPosts.ejs", { 'name': videoPost.name, 'url': videoPost.url })
    } else {
        res.status(404).json({ message: "Video post not found" });
    }
});

app.get('/image', (req, res) => {
    const postName = req.query.name.trim();
    const imagePost = imageUrls.find(post => post.name.trim() === postName);

    if (imagePost) {
        res.render('ImagePosts.ejs', {
            'name': imagePost.name, 'url': imagePost.url
        })
    } else {
        res.status(404).render('ErrorPosts.ejs');
    }
});

app.get('/text', (req, res) => {
    const postName = req.query.name.trim();
    console.log(`Post name is: '${postName}'`);

    const textPost = TextPost.find(post => {
        const cleanedPostName = post.name.trim();
        console.log(`post.name: '${cleanedPostName}' , postName: '${postName}', match: ${cleanedPostName === postName}`);

        return cleanedPostName === postName;
    });

    console.log(textPost);

    if (textPost) {
        res.render('TextPosts.ejs', { 'name': textPost.name, 'desc': textPost.desc })
    } else {
        res.status(404).json({ message: "Text post not found" });
    }
});
app.get('*', (req, res) => {
    res.status(404).render('InvalidPath.ejs')
})
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
