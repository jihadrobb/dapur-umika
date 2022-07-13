import { Request, Response } from 'express'
import { Product } from '../models'
import { v4 as uuidv4 } from 'uuid'
import { validationResult } from 'express-validator'
import { Op } from 'sequelize'
import { ProductBodyInterface } from '../interfaces/product'

export default class Controller {
  static async addProduct(req: Request, res: Response) {
    const { name, description, price } = req.body
    const error = validationResult(req)
    if (!error.isEmpty()) {
      return res.status(400).json(error)
    }
    try {
      const id = uuidv4()
      const payload = await Product.create({
        id,
        name,
        description,
        price
      })
      return res.json({ message: 'Successfully add product', payload })
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  static async getProduct(req: Request, res: Response) {
    const { name, minPrice, maxPrice } = req.body
    let options: ProductBodyInterface = {}
    if (name) options.name = { [Op.iLike]: `%${name}%` }
    if (minPrice && maxPrice)
      options.price = { [Op.gte]: minPrice, [Op.lte]: maxPrice }
    else if (minPrice) options.price = { [Op.gte]: minPrice }
    else if (maxPrice) options.price = { [Op.lte]: maxPrice }

    try {
      const payload = await Product.findAll({ where: { ...options } })
      return res.status(200).json({ message: 'Success', payload })
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  static async getOneProduct(req: Request, res: Response) {
    const { id } = req.params
    const error = validationResult(req)
    if (!error.isEmpty()) {
      return res.status(404).json(error)
    }
    try {
      const payload = await Product.findOne({ where: { id } })
      return res.status(200).json({ message: 'Success nih', payload })
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  static async editProduct(req: Request, res: Response) {
    const { id } = req.params
    const { name, description, price } = req.body
    const error = validationResult(req)
    if (!error.isEmpty()) {
      return res.status(400).json(error)
    }

    try {
      const data = await Product.update(
        {
          name: name || undefined,
          description: description || undefined,
          price: price || undefined
        },
        { where: { id }, returning: true }
      )
      return res.json({
        message: 'Successfully edit product',
        payload: data[1][0]
      })
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  static async deleteProduct(req: Request, res: Response) {
    const { id } = req.params
    const error = validationResult(req)
    if (!error.isEmpty()) {
      return res.status(400).json(error)
    }
    try {
      const data = await Product.findOne({ where: { id } })

      await Product.destroy({ where: { id } })
      return res.json({ message: 'Successfully delete product' })
    } catch (error) {
      return res.status(500).json(error)
    }
  }
}
