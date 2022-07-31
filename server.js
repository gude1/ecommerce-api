const http = require("http");
const app = require("./app");

app.set("port", process.env.PORT || 6000);
const server = http.createServer(app);
server.listen(process.env.PORT || 6000, () => {
  console.log(`server started on port ${process.env.PORT || 6000}`);
});
