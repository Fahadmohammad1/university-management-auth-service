import express from 'express'
import { FacultyController } from './faculty.controller'

const router = express.Router()

router.get('/:id', FacultyController.getSingleFaculty)
router.get('/', FacultyController.getAllFaculties)

// router.patch('/:id',
//   validateRequest( FacultyController.updateFacultyZodSchema),
//   FacultyController.updateFaculty
// );

export const FacultyRoutes = router
