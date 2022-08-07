const { isEmpty, reportError } = require("../helpers/utlity");
const Product = require("../models/product.model");
const Store = require("../models/store.model");

exports.createProduct = async (req, res) => {
  try {
    const { _id } = req.storeowner;
    const { name, description, category_id, price } = req.body;
    let errs = {};
    if (!name || name.length < 3) {
      errs = {
        ...errs,
        name: "Product name is required and must be atleast 3 characters long",
      };
    }
    if (!category_id) {
      errs = {
        ...errs,
        category_id: "Category id is required",
      };
    }
    if (!price || price < 1) {
      errs = {
        ...errs,
        price: "Product price is required and cannot be less than 1",
      };
    }

    if (!isEmpty(errs)) {
      return res.status(400).json({
        success: false,
        errors: {
          ...errs,
        },
      });
    }

    const store = await Store.findOne({ creator_id: _id });
    if (!store) {
      return res.status(400).json({
        success: false,
        error: "You need to have a store to create products",
      });
    }

    const product = await Product.create({
      name,
      description,
      category_id,
      price,
      image: req?.file?.filename,
      creator_id: _id,
      store_id: store._id,
    });

    await product.populate([{ path: "category", select: "name" }]);

    return res.status(200).json({
      success: true,
      data: {
        product,
      },
    });
  } catch (err) {
    reportError(err, "createProduct err");
    return res.status(500).json({
      success: false,
      error: "Could not process your request at this time please try again",
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, description, price, hidden } = req.body;
    let errs = {};

    const product = await Product.findOne({ _id: productId });
    if (!product) {
      return res.status(404).json({
        success: false,
        error: `Product with id ${productId} not found`,
      });
    }

    product.name = name || product.name;
    product.price = price || product.price;
    product.image = req?.file?.filename || product.image;
    product.description = description || product.description;
    product.hidden = hidden || product.hidden;

    await product.save();
    await product.populate([{ path: "category", select: "name" }]);

    return res.status(200).json({
      success: true,
      data: {
        product,
      },
    });
  } catch (err) {
    reportError(err, "updateProduct err");
    return res.status(500).json({
      success: false,
      error: "Could not process your request at this time please try again",
    });
  }
};

exports.getAStoresProduct = async (req, res) => {
  try {
    const { storeId } = req.params;
    const { cat } = req.query;
    let searchparam = {
      store_id: storeId,
    };

    if (!isEmpty(cat)) {
      searchparam = { ...searchparam, category_id: cat };
    }

    const products = await Product.find(searchparam)
      .sort({ createdAt: -1 })
      .populate([{ path: "category", select: "name" }]);

    return res.status(200).json({
      success: true,
      data: {
        products,
      },
    });
  } catch (err) {
    reportError(err, "getAStoresProduct err");
    return res.status(500).json({
      success: false,
      error: "Could not process your request at this time please try again",
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findOne({
      _id: productId,
    }).populate([{ path: "category", select: "name" }]);

    if (!product) {
      return res.status(404).json({
        success: false,
        error: `Product with id ${productId} not found`,
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        product,
      },
    });
  } catch (err) {
    reportError(err, "getProduct err");
    return res.status(500).json({
      success: false,
      error: "Could not process your request at this time please try again",
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { _id } = req.storeowner;

    const deleted = await Product.deleteOne({
      creator_id: _id,
      _id: productId,
    });

    if (deleted.deletedCount < 1) {
      return res.status(400).json({
        success: false,
        error: "Failed to delete",
      });
    }

    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    reportError(err, "deleteProduct err");
    return res.status(500).json({
      success: false,
      error: "Could not process your request at this time please try again",
    });
  }
};
