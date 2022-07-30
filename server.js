const http = require("http");
const app = require("./app");
const { testLogin } = require("./tests/login");
app.set("port", process.env.PORT || 6000);
const server = http.createServer(app);
server.listen(process.env.PORT || 6000, () => {
  console.log(`server started on port ${process.env.PORT || 6000}`);
});
