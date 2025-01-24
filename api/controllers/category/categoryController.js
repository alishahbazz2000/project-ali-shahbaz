import { categoryModel } from "../../models/category/Category";
import { validateMongodbID } from "../../utils/validateMongodbID";

// create category
export const createCategoryController = async (req, res) => {
  try {
    const { title, description } = req.body;  // دریافت description از body
    const category = await categoryModel.create({
      user: req.user.id,
      title,
      description,  // اضافه کردن description به مدل
    });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// get all category
export const getAllCategoriesController = async (req, res) => {
  try {
    const categories = await categoryModel
      .find({})
      .populate("user")
      .sort("-createdAt");
    res.json(categories);
  } catch (error) {
    res.json(error);
  }
};

// get single category
export const getSingleCategoryController = async (req, res) => {
  const { id } = req.params;
  validateMongodbID(id);
  try {
    const category = await categoryModel.findById(id).populate("user");
    res.json(category);
  } catch (error) {
    res.json(error);
  }
};

// update category
export const updateCategoryController = async (req, res) => {
  const { id } = req.params;
  validateMongodbID(id);
  try {
    const category = await categoryModel.findByIdAndUpdate(
      id,
      {
        ...req.body,
      },
      { new: true }
    );
    res.json(category);
  } catch (error) {
    res.json(error);
  }
};

// delete category
export const deleteCategoryController = async (req, res) => {
  const { id } = req.params;
  validateMongodbID(id);
  try {
    const category = await categoryModel.findByIdAndDelete(id);
    res.json(category);
  } catch (error) {
    res.json(error);
  }
};
