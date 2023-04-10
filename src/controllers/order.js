import Order from "../models/order.js";
import Product from "../models/product.js";
import { errorResponse, successResponse } from "../response.js";
import mongoose from "mongoose";

export const createOrder = async (req, res) => {
  const { restaurant, customer, products } = req.body;
  try {
    // Check if all products are from the same restaurant
    let all = false;
    products.map(async (product) => {
      const actual = await Product.findOne({ _id: product });
      console.log(actual.restaurant);
      if (actual.restaurant !== restaurant) {
        all = true;
      }
    });
    if (all) {
      return errorResponse(
        req,
        res,
        "All products must be from the same restaurant",
        400
      );
    }
    const order = await Order.create({
      restaurant,
      customer,
      products,
      status: "Creado",
      active: true,
    });
    return successResponse(req, res, order, 201);
  } catch (error) {
    console.log(error.stack);
    return errorResponse(req, res, error.message, 500);
  }
};

export const getOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findOne({ _id: id, active: true });
    if (!order) {
      return errorResponse(req, res, "Order not found", 404);
    }
    return successResponse(req, res, order, 200);
  } catch (error) {
    return errorResponse(req, res, error.message, 500);
  }
};

export const getUserOrders = async (req, res) => {
  const { userid } = req.params;
  try {
    const orders = await Order.aggregate([
      {
        $match: {
          active: true,
          $or: [
            { customer: new mongoose.Types.ObjectId(userid) },
            { deliver: new mongoose.Types.ObjectId(userid) },
          ],
        },
      },
      {
        $project: {
          _id: 1,
          restaurant: 1,
          products: 1,
          status: 1,
          deliver: 1,
        },
      },
    ]);
    if (!orders) {
      return errorResponse(req, res, "Orders not found", 404);
    }
    return successResponse(req, res, orders, 200);
  } catch (error) {
    return errorResponse(req, res, error.message, 500);
  }
};

export const getNotAcceptedOrders = async (req, res) => {
  try {
    const orders = await Order.aggregate([
      {
        $match: {
          active: true,
          status: "Enviado",
        },
      },
      {
        $project: {
          _id: 1,
          restaurant: 1,
          products: 1,
          status: 1,
          deliver: 1,
        },
      },
    ]);
    if (!orders) {
      return errorResponse(req, res, "Orders not found", 404);
    }
    return successResponse(req, res, orders, 200);
  } catch (error) {
    return errorResponse(req, res, error.message, 500);
  }
};

export const acceptOrder = async (req, res) => {
  const { id } = req.params;
  const { deliver } = req.body;
  try {
    const order = await Order.findOne({ _id: id, active: true });
    if (!order) {
      return errorResponse(req, res, "Order not found", 404);
    }
    const new_order = await Order.findOneAndUpdate(
      { _id: id, active: true },
      { status: "Aceptado", deliver },
      { new: true }
    );
    if (!new_order) {
      return errorResponse(req, res, "Order not found", 404);
    }
    return successResponse(req, res, new_order, 200);
  } catch (error) {
    return errorResponse(req, res, error.message, 500);
  }
};

export const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { status, restaurant, products } = req.body;
  try {
    const order = await Order.findOne({ _id: id, active: true });
    if (order) {
      if (order.status === "Enviado") {
        return errorResponse(req, res, "Order already sent", 400);
      }
    } else {
      return errorResponse(req, res, "Order not found", 404);
    }

    const new_order = await Order.findOneAndUpdate(
      { _id: id, active: true },
      { status, restaurant, products },
      { new: true }
    );

    if (!new_order) {
      return errorResponse(req, res, "Order not found", 404);
    }
    return successResponse(req, res, new_order, 200);
  } catch (error) {
    return errorResponse(req, res, error.message, 500);
  }
};

export const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteOrder = await Order.findOneAndUpdate(
      { _id: id, active: true },
      { active: false },
      { new: true }
    );
    if (!deleteOrder) {
      return errorResponse(req, res, "Order not found", 404);
    }
    return successResponse(req, res, deleteOrder, 200);
  } catch (error) {
    return errorResponse(req, res, error.message, 500);
  }
};