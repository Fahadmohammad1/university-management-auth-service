import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { ManagementDepartmentValidation } from './managementDepartment.validation'
import { ManagementDepartmentController } from './managementDepartment.controller'

const router = express.Router()

router.post(
  '/create-management',
  validateRequest(
    ManagementDepartmentValidation.createManagementDepartmentZodSchema
  ),
  ManagementDepartmentController.createManagementDepartment
)

router.get('/', ManagementDepartmentController.getAllManagementDepartments)

router.get('/:id', ManagementDepartmentController.getSingleManagementDepartment)

router.patch(
  '/:id',
  validateRequest(
    ManagementDepartmentValidation.updateManagementDepartmentZodSchema
  ),
  ManagementDepartmentController.updateManagementDepartment
)

export const ManagementDepartmentRoutes = router
