import express, { Application } from 'express'
import cors from 'cors'
import userRoutes from './app/modules/users/user.route'
import globalErrorHandler from './app/middleware/globalErrorHandler'
const app: Application = express()

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   // res.send('Working Successfully!')
//   throw new Error('wow errrrrrrrrrrrrroooooooorrrrrrrrrr')
//   // next('wow very dengerous')
// })

app.use('/api/v1/user', userRoutes)

// global error handler
app.use(globalErrorHandler)

export default app
