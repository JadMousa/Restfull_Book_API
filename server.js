import bookRoutes from './Routes/books.js';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import pgclient from './db.js';

const app = express();
dotenv.config();


// Middlewares
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;


app.use('/api/books', bookRoutes);


// localhost:3001/
app.get("/", (req, res) => {
    res.send('home route');
})

// localhost:3001/test
app.get('/test', (request, response) => {
    response.send('test route response');
})


app.use((req,res) => {
    res.json({ message: "route not found" });
});

pgclient.connect()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Listening on ${PORT}`);
        });
    }).catch((error)=>{
       console.log('error in connecting to pg server');    
       console.log(error);    
    })