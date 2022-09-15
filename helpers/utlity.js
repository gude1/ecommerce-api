function isEmpty(data) {
  if (!checkData(data)) return true;
  if (data.constructor == Array && data.length < 1) return true;
  else if (data.constructor == String && data.length < 1) return true;
  else if (data.constructor == Object && Object.keys(data).length == 0)
    return true;
  else return false;
}

function checkData(data) {
  if ((data != null && data != undefined && data != "") || data == "0") {
    return true;
  }
  return false;
}

function validateEmail(email) {
  let mailformat =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
  return String(email);
}

/**
 * This function takes an error object and outputs it to the console
 *
 * @param {*} err error object
 * @param {*} name name attributed to the error
 * @returns null
 */
function reportError(err = {}, name = "reportError") {
  if (!isEmpty(err)) {
    console.error(name, {
      errmsg: String(err),
      errdata: err?.response?.data,
    });
    return;
  }
}

function returnDefaultErr(res) {
  if (isEmpty(res)) {
    return;
  }

  return res.status(500).json({
    success: false,
    error: "Could not process your request at this time please try again",
  });
}

module.exports = { isEmpty, reportError, validateEmail, returnDefaultErr };
