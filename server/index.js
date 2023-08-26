import express from 'express';
const app = express();
import db from './db/connect';
import dotenv from 'dotenv'
dotenv.config();
import cors from cors
import notFound from './middleware/not-found'
import errorHandlerMiddleware from './middleware/error-handler'

// routes
import tasks from './routes/tasks'
app.use('/api/v1/tasks', tasks)
app.use(notFound)
app.use(errorHandlerMiddleware)


// middleware


app.use(express.json());

// Assigning port value
const port = process.env.PORT || 3001