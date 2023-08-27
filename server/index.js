import express from 'express';
import connectDB from './db/connect.js';
import dotenv from 'dotenv';
import cors from 'cors'
import notFound from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'

dotenv.config();
const app = express();
app.use(express.json());

// middleware
// Enable CORS for all origins
app.use(cors());

// routes
import tasks from './routes/tasks.js'
app.use('/api/v1/tasks', tasks)
app.use(notFound)
app.use(errorHandlerMiddleware)

// Assigning port value
const port = process.env.PORT || 4000

// Try and catch for listening to server
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`Server is listening on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}

// Code written by Goodness Igunma

start()