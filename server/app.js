import express, { json, urlencoded, static as expressStatic } from 'express'
import { join, resolve } from 'path'
// import { getGlobals } from 'common-es'
// const { __dirname } = getGlobals(import.meta.url)
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import user from './routes/user.js'

const app = express()

if (process.env.NODE_ENV !== 'production') dotenv.config({ path: './config/config.env' })

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(cors())
app.use(cookieParser())

app.use('/api/user', user)


export default app
// cd /d "D:/webd/React Projects/Chat/server"