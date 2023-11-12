import express from "express";
import cors from 'cors'
import dotenv from 'dotenv'

const app = express()

app.use(cors())

if (process.env.NODE_ENV !== 'production') dotenv.config({ path: './config/config.env' })

export default app
// cd /d "D:/webd/React Projects/Chat/server"