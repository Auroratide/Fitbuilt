import * as path from 'path'
import express from 'express'
import api from './api'

const app = express()
const port = 3000

app.use('/api', api)
app.use(express.static(path.join(__dirname, 'public')))

app.listen(port, () => {
  console.log('Server is started...') // eslint-disable-line no-console
})