import express from 'express'
import { UserController } from './user.controller'
import validateRequest from '../../middleware/validateRequest'
import { UserValidation } from './user.validation'
import { FacultyValidation } from '../faculty/faculty.validation'

const router = express.Router()

router.post(
  '/create-student',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createStudent
)

// faculty route
router.post(
  '/create-faculty',
  validateRequest(FacultyValidation.createFacultyZodSchema),
  UserController.createFaculty
)

export const UserRoutes = router
