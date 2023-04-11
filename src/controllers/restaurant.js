import Restaurant from "../models/restaurant.js";
import { errorResponse, successResponse } from "../response.js";

export const createRestaurant = async (req, res) => {
  const { category, address, name } = req.body;

  try {
    const restaurant = await Restaurant.create({
      category,
      address,
      name,
      active: true,
    });
    return successResponse(
      req,
      res,
      restaurant,
      "Restaurant created succesfully"
    );
  } catch (error) {
    return errorResponse(req, res, error.message, 404);
  }
};

export const getRestaurant = async (req, res) => {
  const { id } = req.params;

  try {
    const restaurant = await Restaurant.findOne({ _id: id, active: true });
    if (!restaurant) {
      return errorResponse(req, res, "Restaurant not found", 404);
    }
    return successResponse(req, res, restaurant, "Restaurant Found");
  } catch (error) {
    return errorResponse(req, res, error.message, error.statusCode);
  }
};

export const getRestaurants = async (req, res) => {
  const { categories, name } = req.query;
  try {
    const restaurants = await Restaurant.aggregate([
      {
        $match: {
          active: true,
          ...(categories && { category: { $in: categories } }),
          ...(name && { name: { $regex: name, $options: "i" } }),
        },
      },
      {
        $lookup: {
          from: "orders",
          localField: "_id",
          foreignField: "restaurant",
          as: "orders",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          category: 1,
          address: 1,
          popularity: {
            $size: {
              $filter: {
                input: "$orders",
                as: "order",
                cond: {
                  $and: [
                    { $eq: ["$$order.active", true] },
                    { $ne: ["$$order.status", "Creado"] },
                  ],
                },
              },
            },
          },
        },
      },
      {
        $sort: {
          popularity: -1,
        },
      },
    ]);
    return successResponse(req, res, restaurants);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const updateRestaurant = async (req, res) => {
  const { id } = req.params;
  const { category, address, name } = req.body;

  try {
    const restaurant = await Restaurant.findOneAndUpdate(
      { _id: id, active: true },
      {
        category,
        address,
        name,
      },
      { new: true }
    );
    if (!restaurant) {
      return errorResponse(req, res, "Restaurant not found", 404);
    }
    return successResponse(req, res, restaurant, "Restaurant updated");
  } catch (error) {
    return errorResponse(req, res, error.message, error.statusCode);
  }
};

export const deleteRestaurant = async (req, res) => {
  const { id } = req.params;

  try {
    const restaurant = await Restaurant.findOneAndUpdate(
      { _id: id, active: true },
      { active: false },
      { new: true }
    );
    if (!restaurant) {
      return errorResponse(req, res, "Restaurant not found", 404);
    }
    return successResponse(req, res, restaurant, "Restaurant deleted");
  } catch (error) {
    return errorResponse(req, res, error.message, error.statusCode);
  }
};
