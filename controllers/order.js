const Order = require('../models/Order')
const errorHandler = require('../utilits/errorHandler')
//(get)localhost:5000/api/order?offset=2&limit=5
module.exports.getAll = async function (req, res) {
  const query = {
    user: req.user.id
  }

  //date start
  if (req.query.start) {
    query.date = {
      $gte: req.query.start// >=
    }
  }

  if (req.query.end) {

    if (!query.date) {
      query.date = {}
    }
    query.date['$lte'] = req.query.end//
  }

  if (req.query.order) {
    query.order = +req.query.order
  }

  try {
    const orders = await Order
      .find(query)
      .sort({date: -1})// порядок убывания
      .skip(+req.query.offset)
      .limit(+req.query.limit)//need toreformto  number

    res.status(200).json(orders)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.create = async function (req, res) {
  try {
    const lastOrder = await Order
      .findOne({user: req.user.id})
      .sort({date: -1}) //1 order - newest date
    //the last order from bd, sort by date (last order = last date)

    const maxOrder = lastOrder ? lastOrder.order : 0
    const order = await new Order({
      order: maxOrder + 1,
      list: req.body.list,
      user: req.user.id
    }).save()
    res.status(201).json(order)
  } catch (e) {
    errorHandler(res, e)
  }
}

