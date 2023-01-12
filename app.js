const express = require("express")
const app = express()
const productRoutes = require("./Module/product/routes/productRoutes")
const walletRoutes = require("./Module/wallet/routes/walletRoutes")
const bodyParser = require("body-parser")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,Content-Type,Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});


app.use("/products", productRoutes)
app.use("/wallet", walletRoutes)

app.use((req, res, next) => {
    const error = new Error("route Not found..");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({ error: { message: error.message } });
});


module.exports = app



