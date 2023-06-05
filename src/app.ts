import express, { Application } from 'express'
import cors from 'cors'

import globalErrorHandler from './app/middleware/globalErrorHandler'
import { UserRoutes } from './app/modules/users/user.route'
// import ApiError from './errors/ApiError'

const app: Application = express()

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/user', UserRoutes)

// Testing
app.get('/', async () => {
  throw new Error('Testing error logger')
})

// global error handler
app.use(globalErrorHandler)

export default app
