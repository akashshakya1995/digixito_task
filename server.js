const { createServer } = require("http")
const app = require('./app')
const server = createServer(app)
const sendRes =require('./Helper/responseHandler')
server.listen(8080, _ => console.log(`Server is Running at http://127:0.0.1:${8080}`));






