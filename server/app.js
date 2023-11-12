import express, { json, urlencoded, static as expressStatic } from 'express'
import { join, resolve } from 'path'
// import { getGlobals } from 'common-es'
// const { __dirname } = getGlobals(import.meta.url)
import cors from 'cors'
import dotenv from 'dotenv'
import user from './routes/user.js'

const app = express()

if (process.env.NODE_ENV !== 'production') dotenv.config({ path: './config/config.env' })

app.use(cors())

app.use('/api/user', user)


export default app
// cd /d "D:/webd/React Projects/Chat/server"