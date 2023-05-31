import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import userRoutes from './app/modules/users/users.route'
const app: Application = express()

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', async (req: Request, res: Response) => {
  res.send('Working Successfully!')
})

app.use('/api/v1/user', userRoutes)

export default app
