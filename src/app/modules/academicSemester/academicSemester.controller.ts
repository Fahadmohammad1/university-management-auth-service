import { Request, Response } from 'express'
import { AcademicSemesterService } from './academicSemester.service'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { IAcademicSemester } from './academicSemester.interface'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../constants/pagination'

export const createSemester = catchAsync(
  async (req: Request, res: Response) => {
    const { ...academicSemesterData } = req.body
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    )

    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semester created successfully!',
      meta: {
        page: 1,
        limit: 1,
        total: 5,
      },
      data: result,
    })
  }
)

const getAllSemesters = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields)
  const result = await AcademicSemesterService.getAllSemesters(
    paginationOptions
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester retrieved successfully !',
    meta: result.meta,
    data: result.data,
  })
})
export const AcademicSemesterController = {
  createSemester,
  getAllSemesters,
}
