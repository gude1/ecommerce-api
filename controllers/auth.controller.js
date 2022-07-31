const { reportError } = require("./helpers/utility");

async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    let errs = {};
    if (!name) {
      errs = { ...errs, name: "Name is required" };
    }
    if (!email) {
      errs = { ...errs, email: "Email is required" };
    }

    return res.status(400).send({
      success: false,
      errors: {
        fullname: "Name is required",
      },
    });
  } catch (err) {
    reportError(err, "register");
    return res.status(500).json({
      success: false,
      error: "Could not proccess your request at this time please try again",
    });
  }
}
