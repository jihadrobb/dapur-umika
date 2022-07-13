import { Request, Response } from 'express'
import { User } from '../models'
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'

export default class Controller {
  static async registerUser(req: Request, res: Response) {
    const error = validationResult(req)
    if (!error.isEmpty()) {
      return res.status(400).json(error)
    }
    const { username, isAdmin } = req.body
    try {
      const salt = bcrypt.genSaltSync(10)
      const hashedPass = bcrypt.hashSync(req.body.password, salt)
      const id = uuidv4()
      const generateRefreshToken = jwt.sign({ id }, process.env.JWT_KEY!)
      const data = await User.create({
        id,
        username,
        password: hashedPass,
        refreshToken: generateRefreshToken,
        isAdmin: isAdmin || false
      })
      const { password, refreshToken, isAdmin: admin, ...payload } = data.get()
      return res.json({ message: 'Successfully register user', payload })
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  static async loginUser(req: Request, res: Response) {
    const error = validationResult(req)
    if (!error.isEmpty()) {
      return res.status(400).json(error)
    }
    const { username } = req.body
    try {
      const data = await User.findOne({ where: { username } })
      const token = jwt.sign(
        {
          id: data!.getDataValue('id'),
          username: data!.getDataValue('username')
        },
        process.env.JWT_KEY!,
        { expiresIn: '1h' }
      )
      const refreshToken = data!.getDataValue('refreshToken')
      return res.json({
        message: 'Successfully logged in',
        payload: { token, refreshToken }
      })
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  static async getUserInformation(req: Request, res: Response) {
    const { id } = res.locals.user
    if (!id) res.status(400).json('Login to continue')
    try {
      const data = await User.findOne({ where: { id } })
      const { password, refreshToken, isAdmin, ...payload } = data!.get()
      return res.json({ message: 'Success', payload })
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  static async editUser(req: Request, res: Response) {
    const { id } = res.locals.user
    if (!id) return res.status(400).json('Login to continue')
    const error = validationResult(req)
    if (!error.isEmpty()) {
      return res.status(400).json(error)
    }
    const { username, isAdmin } = req.body
    try {
      const data = await User.findOne({
        where: { username: req.body.username }
      })
      if (data && data.getDataValue('id') != id) {
        return res
          .status(403)
          .json({ message: 'username is already registered' })
      } else {
        const editedData = await User.update(
          { username, isAdmin },
          { where: { id }, returning: true }
        )
        const { password, refreshToken, ...payload } = editedData[1][0].get()
        return res.json({
          message: 'Successfully edit user',
          payload: payload
        })
      }
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  static async deleteUser(req: Request, res: Response) {
    const { id } = res.locals.user
    if (!id) return res.status(400).json('Login to continue')
    try {
      const data = await User.findOne({ where: { id } })
      if (!data) {
        return res.status(404).json({ message: 'User Not Found' })
      }
      await User.destroy({ where: { id } })
      return res.json({ message: 'Successfully delete user' })
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  static async changePasswordUser(req: Request, res: Response) {
    const { id } = res.locals.user
    const { oldPassword, newPassword } = req.body
    if (!id) return res.status(400).json('Login to continue')
    const error = validationResult(req)
    if (!error.isEmpty()) {
      return res.status(400).json(error)
    }
    try {
      const data = await User.findOne({ where: { id } })
      if (
        data &&
        !bcrypt.compareSync(oldPassword, data.getDataValue('password'))
      ) {
        return res.status(400).json({ message: 'Wrong password' })
      }
      const editedData = await User.update(
        { password: newPassword },
        { where: { id }, returning: true }
      )
      const { password, refreshToken, ...payload } = editedData[1][0].get()
      return res.json({
        message: 'Successfully change password',
        payload: payload
      })
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  static async refreshToken(req: Request, res: Response) {
    const { id } = res.locals.user
    try {
      const data = await User.findOne({ where: { id } })
      if (!data) return res.status(404).json({ message: 'User not found' })
      else if (data.getDataValue('refreshToken') != res.locals.token)
        return res.status(401).json({ message: 'Invalid or expired token' })
      const token = jwt.sign(
        {
          id: data!.getDataValue('id'),
          username: data!.getDataValue('username')
        },
        process.env.JWT_KEY!,
        { expiresIn: '1h' }
      )

      const refreshToken = jwt.sign({ id }, process.env.JWT_KEY!)
      await User.update({ refreshToken }, { where: { id } })
      return res.json({
        message: 'Successfully refresh token',
        payload: { token, refreshToken }
      })
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  static async loginAdmin(req: Request, res: Response) {
    const error = validationResult(req)
    if (!error.isEmpty()) {
      return res.status(400).json(error)
    }
    const { username } = req.body
    try {
      const data = await User.findOne({ where: { username } })
      if (data && !data.getDataValue('isAdmin'))
        return res
          .status(403)
          .json({ message: 'Please login using admin credentials' })
      const token = jwt.sign(
        {
          id: data!.getDataValue('id'),
          username: data!.getDataValue('username')
        },
        process.env.JWT_KEY!,
        { expiresIn: '1h' }
      )
      const refreshToken = data!.getDataValue('refreshToken')
      return res.json({
        message: 'Successfully logged in as admin',
        payload: { token, refreshToken }
      })
    } catch (error) {
      return res.status(500).json(error)
    }
  }
}
