const { reportError, isEmpty, validateEmail } = require("../helpers/utlity");
const Order = require("../models/order.model");

exports.createAndUpdateOrder = async (req, res) => {
  try {
    const {
      items,
      amount_paid,
      status,
      store_id,
      customer_name,
      customer_email,
    } = req;
    const STATUSES = ["awaiting_payment", "pending", "dispatched", "delivered"];
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

    if (!STATUSES.includes(status)) {
      input_errs = {
        ...input_errs,
        status: `Status is required and must be one of ${STATUSES}`,
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
      status,
    });
  } catch (err) {
    reportError(err, "createOrder");
  }
};
