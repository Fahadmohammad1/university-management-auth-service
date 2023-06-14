import { Model, Types } from 'mongoose'
import { IAcademicDepartment } from '../academicDepartment/academicDepartment.interfaces'
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interfaces'

export type FacultyName = {
  firstName: string
  lastName: string
  middleName: string
}

export type IFaculty = {
  id: string
  name: FacultyName //embedded object
  dateOfBirth: string
  gender: 'male' | 'female'
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  email: string
  contactNo: string
  emergencyContactNo: string
  presentAddress: string
  permanentAddress: string
  designation: string
  academicDepartment: Types.ObjectId | IAcademicDepartment
  academicFaculty: Types.ObjectId | IAcademicFaculty
  profileImage?: string
}

export type FacultyModel = Model<IFaculty, Record<string, unknown>>

export type IFacultyFilters = {
  searchTerm?: string
  id?: string
  bloodGroup?: string
  email?: string
  contactNo?: string
  emergencyContactNo?: string
}
