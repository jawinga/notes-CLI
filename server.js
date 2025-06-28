import http from "node:http";

const server = http.createServer((req, res) => {
  res.statusCode(200);
  res.setHeader("Content-type", "text/plain");
  res.end("Process finished!");
});

server.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});
