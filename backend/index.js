const express = require('express');
const cors = require('cors');
require ('dotenv').config();

const app = express();


app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json());

const testRouter = require('./routes/test');
app.use('/api/test', testRouter);


app.get('/api/testing', (req, res) =>{
    res.json({message: 'backend working'});
});

const chatRoutes = require('./routes/chat');
app.use('/api/chat', chatRoutes);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
    console.log(`radi na portu ${PORT}`);
})



