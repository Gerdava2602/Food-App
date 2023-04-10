import Product from "../models/product.js";
import mongoose from "mongoose";
import { errorResponse, successResponse } from "../response.js";

export const createProduct = async (req, res) => {
  const { name, price, restaurant, category } = req.body;
  try {
    const new_Product = await Product.create({
      name,
      price,
      restaurant,
      category,
      active: true,
    });
    if (!new_Product) {
      return errorResponse(req, res, "Product not created", 500);
    }
    return successResponse(req, res, new_Product, 201);
  } catch (error) {
    return errorResponse(req, res, error.message, 500);
  }
};

export const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const Product = await Product.findOne({ _id: id, active: true });
    if (!Product) {
      return errorResponse(req, res, "Product not found", 404);
    }
    return successResponse(req, res, Product, 200);
  } catch (error) {
    return errorResponse(req, res, error.message, 500);
  }
};

export const getProducts = async (req, res) => {
  const { category, restaurant } = req.query;
  console.log(category, restaurant);
  try {
    const Products = await Product.aggregate([
      {
        $match: {
          active: true,
          ...(category && { category: { $in: category } }),
          ...(restaurant && {
            restaurant: new mongoose.Types.ObjectId(restaurant),
          }),
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          price: 1,
          category: 1,
          restaurant: 1,
        },
      },
    ]);
    if (!Products) {
      return errorResponse(req, res, "Products not found", 404);
    }
    return successResponse(req, res, Products, 200);
  } catch (error) {
    return errorResponse(req, res, error.message, 500);
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, restaurant, category } = req.body;
  try {
    const product = await Product.findOneAndUpdate(
      { _id: id, active: true },
      { name, price, restaurant, category },
      { new: true }
    );
    if (!product) {
      return errorResponse(req, res, "Product not found", 404);
    }
    return successResponse(req, res, product, 200);
  } catch (error) {
    return errorResponse(req, res, error.message, 500);
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findOneAndUpdate(
      { _id: id, active: true },
      { active: false },
      { new: true }
    );
    if (!product) {
      return errorResponse(req, res, "Product not found", 404);
    }
    return successResponse(req, res, product, 200);
  } catch (error) {
    return errorResponse(req, res, error.message, 500);
  }
};
