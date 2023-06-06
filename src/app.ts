import express, { Application } from 'express'
import cors from 'cors'

import globalErrorHandler from './app/middleware/globalErrorHandler'
import { UserRoutes } from './app/modules/user/user.route'
// import ApiError from './errors/ApiError'

const app: Application = express()

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/user', UserRoutes)

// Testing
// app.get('/', (req, res) => {
//   res.send('helllo')
// })

// global error handler
app.use(globalErrorHandler)

export default app
