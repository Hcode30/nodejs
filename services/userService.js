import { User } from '../models/userModel.js';
import slugify from 'slugify';
import AsyncHandler from 'express-async-handler';
import { ApiError } from '../utils/apiError.js';

// @desc     Creates A new User
// @route    POST /api/v1/users
// @access   Private

export const createUser = AsyncHandler(async (req, res) => {
  const body = await req.body;
  const user = await User.create({
    name: body.name,
    age: body.age,
    email: body.email,
    image: body.image,
    slug: slugify(body.name),
  });
  res.status(201).json({ data: user });
});

// @desc     Gets All Users
// @route    GET /api/v1/users
// @access   Public

export const getUsers = AsyncHandler(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 8;
  if (limit > 32) {
    return next(new ApiError(`Maximum limit is 32 per page`, 400));
  }
  const skip = (page - 1) * limit;
  const users = await User.find({}).limit(limit).skip(skip);
  const totalUsers = (await User.find({})).length;
  const numberOfPages = Math.ceil(totalUsers / limit);
  res.status(200).send({
    totalUsers,
    usersInPage: users.length,
    numberOfPages,
    page,
    data: users,
  });
});

// @desc     Gets a specific User
// @route    GET /api/v1/users/id
// @access   Public

export const getUser = AsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return next(new ApiError(`User is not found`, 404));
  }
  res.status(200).send({ user });
});

// @desc     Updates a specific User
// @route    PUT /api/v1/users/id
// @access   Private

export const updateUser = AsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return next(new ApiError(`User is not found`, 404));
  }
  if (!req.body.name && !req.body.email && !req.body.age) {
    return next(new ApiError(`Body Is Empty | Nothing to Update`, 400));
  }

  const name = req.body.name || user.name;
  const email = req.body.email || user.email;
  const age = req.body.age || user.age;
  const updatedUser = await User.findByIdAndUpdate(
    id,
    {
      name,
      email,
      age,
      slug: slugify(name),
    },
    { returnOriginal: false, runValidators: true }
  );
  res.status(200).send({ updatedUser });
});

// @desc     Removes a Specific User
// @route    DELETE /api/v1/users/id
// @access   Private

export const deleteUser = AsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    return next(new ApiError(`User is not found`, 404));
  }
  res.status(410).json({ msg: 'User Deleted Successfully', deleted: true });
});

// @desc     Removes a All Users
// @route    DELETE /api/v1/users/
// @access   Private

export const deleteAllUsers = AsyncHandler(async (req, res, next) => {
  const users = await User.find({});
  if (!users) {
    return next(new ApiError(`No Users In The Database.`, 404));
  }
  await User.deleteMany({});
  res
    .status(410)
    .json({ msg: 'All Users Deleted Successfully', deleted: true });
});

// ====================== UnAuthorized ======================

// @desc     Returns Error For Unauthorized Developers
// @route    /api/v1/users/ || /api/v1/users/id
// @access   Public

export const unAuthForDevs = AsyncHandler(async (req, res, next) => {
  next(new ApiError(`You Don't Have Access to this method`, 401));
  return res.redirect(401, '/');
});

// @desc     Returns Error For Unauthorized Users
// @route    /api/v1/users/ || /api/v1/users/id
// @access   Public

export const unAuth = AsyncHandler(async (req, res, next) => {
  return next(new ApiError(`You Don't Have Access to use this API`, 401));
});
