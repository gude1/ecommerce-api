const axios = require("axios");

async function testLogin() {
  try {
    const result = await axios.post("http://localhost:5000/test", {
      name: "gideon",
    });
    console.warn("testLogin", result.data);
  } catch (err) {
    console.log("testLoginErr", String(err.response.status));
  }
}

module.exports = { testLogin };
