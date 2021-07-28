const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors') 
const postRoutes = require('./routes/posts.js');
const userRoutes = require('./routes/user.js');
const repoRoutes = require('./routes/repo');
const channelRoutes = require('./routes/channel');

const app = express();
const dotenv = require('dotenv');
dotenv.config();
app.use(cors());
app.use(express.json({limit: '50mb',extended: true,parameterLimit: 50000}));
app.use(express.json());
app.use('/posts', postRoutes);
app.use('/users', userRoutes);
app.use('/repos', repoRoutes);
app.use('/channel', channelRoutes);

app.use('/', (req, res) => {
    res.send('Hello to insights application')
})

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.CONNECTION_URL, { useUnifiedTopology: true, useNewUrlParser: true,useFindAndModify:false })
    .then(() => app.listen(PORT, () => console.log(`Server o port ${PORT}`))).catch((e) => console.log(e.message))
