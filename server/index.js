import express from 'express';
const app = express();
import connectDB from './db/connect.js';
import dotenv from 'dotenv'
dotenv.config();
import cors from 'cors'
import notFound from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'

// routes
import tasks from './routes/tasks.js'
app.use('/api/v1/tasks', tasks)
app.use(notFound)
app.use(errorHandlerMiddleware)

// middleware
// Enable CORS for all origins
app.use(cors());

app.use(express.json());

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

start()
