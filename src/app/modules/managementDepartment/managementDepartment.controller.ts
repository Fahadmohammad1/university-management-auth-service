import { Request, Response } from 'express'
import httpStatus from 'http-status'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../constants/pagination'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { ManagementDepartmentService } from './managementDepartment.service'
import { IManagementDepartment } from './managementDepartment.interface'
import { ManagementDepartmentFilterableFields } from './managementDepartment.constant'

const createManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { ...academicDepartmentData } = req.body
    const result = await ManagementDepartmentService.createManagementDepartment(
      academicDepartmentData
    )

    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management Department created successfully',
      data: result,
    })
  }
)

const getAllManagementDepartments = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, ManagementDepartmentFilterableFields)
    const paginationOptions = pick(req.query, paginationFields)

    const result =
      await ManagementDepartmentService.getAllManagementDepartments(
        filters,
        paginationOptions
      )

    sendResponse<IManagementDepartment[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management departments fetched successfully',
      meta: result.meta,
      data: result.data,
    })
  }
)

const getSingleManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result =
      await ManagementDepartmentService.getSingleManagementDepartment(id)

    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management Department fetched successfully',
      data: result,
    })
  }
)

const updateManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await ManagementDepartmentService.updateManagementDepartment(
      id,
      req.body
    )

    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management Department updated successfully',
      data: result,
    })
  }
)

const deleteManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await ManagementDepartmentService.deleteManagementDepartment(
      id
    )

    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management Department deleted successfully',
      data: result,
    })
  }
)

export const ManagementDepartmentController = {
  createManagementDepartment,
  getAllManagementDepartments,
  getSingleManagementDepartment,
  updateManagementDepartment,
  deleteManagementDepartment,
}
