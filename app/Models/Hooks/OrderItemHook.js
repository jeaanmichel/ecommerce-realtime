'use strict'

const OrderItemHook = exports = module.exports = {}
const Product = use('app/Models/Product')

OrderItemHook.updateSubTotal = async (model) => {
    let product = await Product.find(model.product_id)
    model.subtotal = model.quantity * product.price
}
