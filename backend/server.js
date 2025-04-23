import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import { connectDB } from './config/db.js';
import productrouter from './router/product.router.js'  

dotenv.config()

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve(); // to get the current directory

app.use(express.json()) // to parse JSON data from request body

  

app.use("/api/products", productrouter);

// console.log("NODE_ENV:", process.env.NODE_ENV);
// console.log("PORT:", process.env.PORT);
// console.log("MONGODB_URI:", process.env.MONGO_URL);


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/dist')));
    
    // Serve the static files from the React app
    // app.get('/*', (req, res) => {
    //   res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
    // });
  } else {
    app.get('/', (req, res) => {
      res.send("API is running...");
    });
  }
  

app.listen(PORT,()=>{
    connectDB();
    console.log("server started at http://localhost:"+PORT);
    console.log("MongoDB connected successfully")
});

