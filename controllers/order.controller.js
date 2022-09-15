const {
  reportError,
  isEmpty,
  validateEmail,
  returnDefaultErr,
} = require("../helpers/utlity");
const Order = require("../models/order.model");
const Store = require("../models/store.model");

exports.createAOrder = async (req, res) => {
  try {
    const { items, amount_paid, store_id, customer_name, customer_email } =
      req.body;
    const STATUSES = ["pending", "dispatched", "delivered"];
    let input_errs = {};

    if (!Array.isArray(items) || items?.length < 1) {
      input_errs = {
        ...input_errs,
        items: "Items must be an array and cannot be empty",
      };
    }

    if (isEmpty(amount_paid) || amount_paid < 100) {
      input_errs = {
        ...input_errs,
        amount_paid: "Amount paid is required and cannot be less than 100",
      };
    }

    if (isEmpty(store_id) || store_id?.length < 32) {
      input_errs = {
        ...input_errs,
        store_id: `Store Id is required and must be atleast 32 characters`,
      };
    }

    if (isEmpty(customer_name) || customer_name?.length < 3) {
      input_errs = {
        ...input_errs,
        customer_name: `Customer Name is required and must be atleast 3 characters`,
      };
    }

    if (!validateEmail(customer_email)) {
      input_errs = {
        ...input_errs,
        customer_email: `Invalid email format`,
      };
    }

    if (!isEmpty(input_errs)) {
      return res.status(400).json({
        success: false,
        errors: {
          ...input_errs,
        },
      });
    }

    const order = await Order.create({
      items,
      amount_paid,
      store_id,
      customer_email,
      customer_name,
    });

    await order.populate([
      {
        path: "ordered_products",
        populate: {
          path: "category",
          select: "name",
        },
      },
    ]);

    return res.status(201).json({
      success: true,
      data: {
        order: {
          store_id: order?.store_id,
          customer_name: order?.customer_name,
          customer_email: order?.customer_email,
          amount_paid: order?.amount_paid,
          status: order?.status,
          paystack_ref: order?.paystack_ref,
          _id: order?._id,
          ordered_products: order?.ordered_products,
        },
      },
    });
  } catch (err) {
    reportError(err, "createAOrder");
    returnDefaultErr(res);
  }
};

exports.updateAOrder = async (req, res) => {
  try {
    const { status } = req.body;
    const { _id } = req.storeowner;
    const { orderId } = req.params;
    const STATUSES = ["dispatched", "delivered"];
    let errs = {};

    if (!STATUSES.includes(status)) {
      errs = {
        ...errs,
        status: `Status is required and must be one of ${STATUSES}`,
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

    let store = await Store.findOne({ storeownerid: _id });
    order = await Order.findOne({ _id: orderId, store_id: store?._id });

    if (isEmpty(order)) {
      return res.status(404).json({
        success: false,
        error: "Order not found",
      });
    }

    order.status = status;
    await order.save();
    await order.populate([
      {
        path: "ordered_products",
        populate: {
          path: "category",
          select: "name",
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      data: {
        order: {
          store_id: order?.store_id,
          customer_name: order?.customer_name,
          customer_email: order?.customer_email,
          amount_paid: order?.amount_paid,
          status: order?.status,
          paystack_ref: order?.paystack_ref,
          _id: order?._id,
          ordered_products: order?.ordered_products,
        },
      },
    });
  } catch (err) {
    reportError(err, "updateAOrder");
    returnDefaultErr(res);
  }
};

exports.fetchAOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    let order = await Order.findOne({ _id: orderId });

    if (isEmpty(order)) {
      return res.status(404).json({
        success: false,
        error: "Order not found",
      });
    }

    await order.populate([
      {
        path: "ordered_products",
        populate: {
          path: "category",
          select: "name",
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      data: {
        order: {
          store_id: order?.store_id,
          customer_name: order?.customer_name,
          customer_email: order?.customer_email,
          amount_paid: order?.amount_paid,
          status: order?.status,
          paystack_ref: order?.paystack_ref,
          _id: order?._id,
          ordered_products: order?.ordered_products,
        },
      },
    });
  } catch (err) {
    reportError(err, "updateAOrder");
    returnDefaultErr(res);
  }
};

exports.updateOrderPaymentStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    let order = await Order.findOne({ _id: orderId });

    if (isEmpty(order)) {
      return res.status(404).json({
        success: false,
        error: "Order not found",
      });
    }

    order.status = "pending";
    await order.save();
    await order.populate([
      {
        path: "ordered_products",
        populate: {
          path: "category",
          select: "name",
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      data: {
        order: {
          store_id: order?.store_id,
          customer_name: order?.customer_name,
          customer_email: order?.customer_email,
          amount_paid: order?.amount_paid,
          status: order?.status,
          paystack_ref: order?.paystack_ref,
          _id: order?._id,
          ordered_products: order?.ordered_products,
        },
      },
    });
  } catch (err) {
    reportError(err, "updateAOrder");
    returnDefaultErr(res);
  }
};
