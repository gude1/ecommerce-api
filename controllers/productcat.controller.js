const { reportError } = require("../helpers/utlity");
const ProductCat = require("../models/productcat.model");

exports.createProductCat = async (req, res) => {
  try {
    const { name } = req.body;
    const { _id } = req.storeowner;

    if (!name || name.length < 3) {
      return res.status(400).json({
        success: false,
        error:
          "Product category name is required and must be atleast  3 characters long",
      });
    }
    const productcat = await ProductCat.create({
      name,
      creator_id: _id,
    });

    return res.status(200).json({
      success: true,
      data: {
        productcat,
      },
    });
  } catch (err) {
    reportError(err, "createProductCat Err");
    return res.status(500).json({
      success: false,
      error: "Could not process your request at this time please try again",
    });
  }
};

exports.updateProductCat = async (req, res) => {
  try {
    const { name } = req.body;
    const { productCatId } = req.params;
    const { _id } = req.storeowner;

    if (!name || name.length < 3) {
      return res.status(400).json({
        success: false,
        error:
          "Product category name is required and must be atleast  3 characters long",
      });
    }

    const productcat = await ProductCat.findOne({
      creator_id: _id,
      _id: productCatId,
    });

    if (!productcat) {
      return res.status(404).json({
        success: false,
        error: `Product category with id of ${productCatId} not found`,
      });
    }

    productcat.name = name;

    await productcat.save();

    return res.status(200).json({
      success: true,
      data: {
        productcat,
      },
    });
  } catch (err) {
    reportError(err, "updateProductCat Err");
    return res.status(500).json({
      success: false,
      error: "Could not process your request at this time please try again",
    });
  }
};

exports.deleteProductCat = async (req, res) => {
  try {
    const { productCatId } = req.params;
    const { _id } = req.storeowner;

    await ProductCat.deleteOne({
      _id: productCatId,
      creator_id: _id,
    });

    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    reportError(err, "deleteProductCat Err");
    return res.status(500).json({
      success: false,
      error: "Could not process your request at this time please try again",
    });
  }
};

exports.getProductCat = async (req, res) => {
  try {
    const { productCatId } = req.params;

    const productcat = await ProductCat.findOne({
      _id: productCatId,
    });

    if (!productcat) {
      return res.status(404).json({
        success: false,
        error: `Product category with id of ${productCatId} not found`,
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        productcat,
      },
    });
  } catch (err) {
    reportError(err, "getProductCat Err");
    return res.status(500).json({
      success: false,
      error: "Could not process your request at this time please try again",
    });
  }
};

exports.getStoreOwnerProductCats = async (req, res) => {
  try {
    const { productCatId } = req.params;
    const { _id } = req.storeowner;

    const productcats = await ProductCat.find({
      creator_id: _id,
    });

    return res.status(200).json({
      success: true,
      data: {
        productcats,
      },
    });
  } catch (err) {
    reportError(err, "getStoreOwnerProductCats Err");
    return res.status(500).json({
      success: false,
      error: "Could not process your request at this time please try again",
    });
  }
};
