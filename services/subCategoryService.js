//  ===== Global Imports =====

import slugify from 'slugify';

import AsyncHandler from 'express-async-handler';

//  ===== Local Imports =====
import subCategory from '../models/subCategoryModel.js';
import ApiError from '../utils/apiError.js';

// @desc     Creates A new subCategory
// @route    POST /api/v1/categories
// @access   Private

export const createSubCategory = AsyncHandler(async (req, res) => {
  const body = await req.body;
  const category = await subCategory.create({
    name: body.name,
    image: body.image,
    slug: slugify(body.name),
  });
  res.status(201).json({ data: category });
});

// @desc     Gets All Categories
// @route    GET /api/v1/categories
// @access   Public

export const getSubCategories = AsyncHandler(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 8;
  if (limit > 32) {
    return next(new ApiError(`Maximum limit is 32 per page`, 400));
  }
  const skip = (page - 1) * limit;
  const category = await subCategory.find({}).limit(limit).skip(skip);
  const totalCategories = (await subCategory.find({})).length;
  const numberOfPages = Math.ceil(totalCategories / limit);
  res.status(200).send({
    totalCategories,
    categoriesInPage: category.length,
    numberOfPages,
    page,
    data: category,
  });
});

// @desc     Gets a specific subCategory
// @route    GET /api/v1/categories/id
// @access   Public

export const getsubCategory = AsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await subCategory.findById(id);
  if (!category) {
    return next(new ApiError(`subCategory is not found`, 404));
  }
  res.status(200).send({ category });
});

// @desc     Updates a specific subCategory
// @route    PUT /api/v1/categories/id
// @access   Private

export const updateSubCategory = AsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await subCategory.findById(id);
  if (!category) {
    return next(new ApiError(`subCategory is not found`, 404));
  }
  if (!req.body.name) {
    return next(new ApiError(`Body Is Empty | Nothing to Update`, 400));
  }

  const name = req.body.name || category.name;
  const image = req.body.image || category.image;
  const updatedsubCategory = await subCategory.findByIdAndUpdate(
    id,
    {
      name,
      image,
      slug: slugify(name),
    },
    { returnOriginal: false, runValidators: true }
  );
  res.status(200).send({ updatedsubCategory });
});

// @desc     Removes a Specific subCategory
// @route    DELETE /api/v1/categories/id
// @access   Private

export const deleteSubCategory = AsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await subCategory.findByIdAndDelete(id);
  if (!category) {
    return next(new ApiError(`subCategory is not found`, 404));
  }
  res
    .status(410)
    .json({ msg: 'subCategory Deleted Successfully', deleted: true });
});

// @desc     Removes a All Categories
// @route    DELETE /api/v1/categories/
// @access   Private

export const deleteAllSubCategories = AsyncHandler(async (req, res, next) => {
  const categories = await subCategory.find({});
  if (!categories) {
    return next(new ApiError(`No Categories In The Database.`, 404));
  }
  await subCategory.deleteMany({});
  res.status(410).json({
    msg: 'All Categories Have Been Deleted Successfully',
    deleted: true,
  });
});

// ====================== UnAuthorized ======================

// @desc     Returns Error For Unauthorized Developers
// @route    /api/v1/categories/ || /api/v1/categories/id
// @access   Public

export const unAuthForDevs = AsyncHandler(async (req, res, next) => {
  next(new ApiError(`You Don't Have Access to this method`, 401));
  return res.redirect(401, '/');
});

// @desc     Returns Error For Unauthorized Categories
// @route    /api/v1/categories/ || /api/v1/categories/id
// @access   Public

export const unAuth = AsyncHandler(async (req, res, next) =>
  next(new ApiError(`You Don't Have Access to use this API`, 401))
);
