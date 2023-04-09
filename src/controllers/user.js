import { errorResponse, successResponse } from "../response.js";
import User from "../models/user.js";

export const createUser = async (req, res) => {
  const { name, email, cellphone, address, password, role } = req.body;

  try {
    const user = await User.create({
      name,
      email,
      cellphone,
      address,
      password,
      active: true,
      role: role || "client",
    });

    return successResponse(req, res, user, "User created Successfully", 201);
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

export const getUser = async (req, res) => {
  const { id, email, password } = req.body;
  try {
    let user = null;
    if (id) {
      user = await User.findOne({ _id: id , active: true});
    } else if (email && password) {
      user = await User.findOne({ email: email, password: password , active: true});
    }
    if (!user) {
      return errorResponse(req, res, "User not found", 404);
    }
    return successResponse(req, res, user, "User found Successfully");
  } catch (error) {
    return errorResponse(req, res, error.message, 404);
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, cellphone, address, password, role } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { _id: id, active: true },
      {
        name,
        email,
        cellphone,
        address,
        password,
        role,
      },
      { new: true }
    )

    if (!user) {
      return errorResponse(req, res, "User not found", 404);
    }
    return successResponse(req, res, user, "User updated Successfully");
  } catch (error) {
    return errorResponse(req, res, error.message, 404);
  }
}

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOneAndUpdate(
      { _id: id , active: true},
      {
        active: false,
      },
      { new: true }
    )
    if (!user) {
      return errorResponse(req, res, "User not found", 404);
    }
    return successResponse(req, res, user, "User deleted Successfully");
  } catch (error) {
    return errorResponse(req, res, error.message, 404);
  }
}


