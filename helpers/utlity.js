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

/**
 * This function takes an error object and outputs it to the console
 *
 * @param {*} err error object
 * @param {*} name name attributed to the error
 * @returns
 */
const reportError = async (err = {}, name = "reportError") => {
  if (!isEmpty(err)) {
    console.error(name, {
      errmsg: String(err),
      errdata: err?.response?.data,
    });
    return;
  }
};

module.exports = { isEmpty, reportError };
