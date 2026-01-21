const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); 
const app = express();

const PORT = process.env.PORT || 3000;


let forumPosts = [];

app.use(express.static(path.join(__dirname)));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 

app.get('/api/posts', (req, res) => {
   
    res.json(forumPosts.sort((a, b) => b.timestamp - a.timestamp));
});

app.post('/api/posts', (req, res) => {
    const content = req.body.content; 
    if (!content || content.trim() === '') {
        return res.status(400).json({ success: false, message: 'Konten tidak boleh kosong.' });
    }

    const newPost = {
        id: Date.now(), 
        content: content,
        author: 'Pengguna Anonim', 
        timestamp: Date.now() 
    };

    forumPosts.push(newPost); 
    console.log('Postingan baru ditambahkan:', newPost);

    // Kirim respons sukses
    res.json({ success: true, post: newPost });
});

app.get('/forum', (req, res) => {
    res.sendFile(path.join(__dirname, 'forum.html'));
});

app.get('/', (req, res) => {
    res.send('Aplikasi Beranda Berjalan. Akses Forum di /forum');
});



app.listen(PORT, () => {
    console.log(`Server Forum Lokal berjalan di port ${PORT}.`);
    console.log(`Akses Forum: http://localhost:${PORT}/forum`);
});