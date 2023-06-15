import { Model, Types } from 'mongoose'
import { IManagementDepartment } from '../managementDepartment/managementDepartment.interface'

export type AdminName = {
  firstName: string
  lastName: string
  middleName: string
}

export type IAdmin = {
  id: string
  name: AdminName //embedded object
  dateOfBirth: string
  gender: 'male' | 'female'
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  email: string
  contactNo: string
  emergencyContactNo: string
  presentAddress: string
  permanentAddress: string
  designation: string
  managementDepartment: Types.ObjectId | IManagementDepartment
  profileImage?: string
}

export type AdminModel = Model<IAdmin, Record<string, unknown>>

export type IAdminFilters = {
  searchTerm?: string
  id?: string
  bloodGroup?: string
  email?: string
  contactNo?: string
  emergencyContactNo?: string
}
