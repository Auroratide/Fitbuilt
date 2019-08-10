import * as path from 'path'
import express from 'express'
import api from './api'

const server = express()

server.use('/api', api)
server.use(express.static(path.join(__dirname, 'public')))

export default server
