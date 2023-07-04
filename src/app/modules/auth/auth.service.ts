import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { User } from '../user/user.model'
import {
  IChangePassword,
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface'
import { JwtPayload, Secret } from 'jsonwebtoken'
import config from '../../../config'
import { jwtHelpers } from '../../../helpers/jwtHelpers'
import bcrypt from 'bcrypt'

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload

  const isUserExist = await User.isUserExist(id)

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist !')
  }

  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect')
  }

  // create jwt
  const { id: userId, role, needsPasswordChange } = isUserExist
  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  )

  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  )

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  }
}

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    )
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token')
  }

  // checking deleted user's refresh token
  const { userId } = verifiedToken

  const isUserExist = await User.isUserExist(userId)
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }
  // genereate new token

  const newAccessToken = jwtHelpers.createToken(
    {
      id: isUserExist.id,
      role: isUserExist.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  )

  return {
    accessToken: newAccessToken,
  }
}

const changePassword = async (
  user: JwtPayload,
  payload: IChangePassword
): Promise<void> => {
  const { oldPassword, newPassword } = payload

  const isUserExist = await User.isUserExist(user?.userId)

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }

  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(oldPassword, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Old password is incorrect')
  }

  // hash password before saving
  const newHashedPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_rounds)
  )

  const query = { id: user?.userId }
  const updatedData = {
    password: newHashedPassword,
    needsPasswordChange: false,
    passwordChangedAt: new Date(),
  }

  await User.findOneAndUpdate(query, updatedData)
}

export const AuthService = {
  loginUser,
  refreshToken,
  changePassword,
}
