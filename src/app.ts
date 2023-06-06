import express, { Application } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middleware/globalErrorHandler'
import routes from './app/routes'

const app: Application = express()

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1', routes)

// Testing
// app.get('/', (req, res) => {
//   res.send('helllo')
// })

// global error handler
app.use(globalErrorHandler)

export default app
