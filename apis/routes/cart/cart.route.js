'use strict'

const express = require('express')
const cartRoute = express.Router()

const verifyToken = require('../../middlewares/verifyToken')
const cartController = require('../../../controllers/cart/cart.controller')

// Api to add product to cart or create new cart
cartRoute.post('/', verifyToken, async (req, res, next) => {
    try {
        const userId = req.userId
        const {productId, quantity} = req.body

        const result = await cartController.cart(userId, productId, quantity)
        return res.status(200).json(result)
    } catch (error) {
        if (error.status && error.message) {
            return res.status(error.status).json({message: error.message})
        }
        return res.status(500).json(error)
    }
})

cartRoute.put('/', verifyToken, async (req, res, next) => {
    try {
        const userId = req.userId
        const {items, total} = req.body

        const result = await cartController.updateCart(userId, items, total)
        return res.status(200).json(result)
    } catch (error) {
        if (error.status && error.message) {
            return res.status(error.status).json({message: error.message})
        }
        return res.status(500).json(error)
    }
})

cartRoute.get('/', verifyToken, async (req, res, next) => {
    try {
        const userId = req.userId

        const result = await cartController.getCartInfo(userId)
        return res.status(200).json(result)
    } catch (error) {
        if (error.status && error.message) {
            return res.status(error.status).json({message: error.message})
        }
        return res.status(500).json(error)
    }
})

module.exports = cartRoute
