const http = require("node:http");
const httpStatus = require("http-status-codes");
const fs = require("fs");
const port = 3000;
const routeMap = {
  "/": "index.html"
};

const getViewUrl = (url) => {
    return `views${url}.html`;
  };
  
http.createServer((req, res) => {  
  console.log(req.url);
  let viewUrl = getViewUrl(req.url);
  fs.readFile(viewUrl, (error, data) => {
    if (error) {
      res.writeHead(httpStatus.NOT_FOUND);
      res.write('Error:' + error.message);
    } else {
      res.writeHead(httpStatus.OK, {
      "Content-Type": "text/html"
      });
      res.write(data);
    }
    res.end();
  });
})
.listen(port);
console.log(`The server has started and is listening on port number:
  ${port}`);


  