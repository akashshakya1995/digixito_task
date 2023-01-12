const { dbConnect } = require('../../../Helper/dbConnection')

const productListing = async (req, res) => {
    try {
        const productData = await (await dbConnect()).collection('product').find({}, { projection: { _id: 0, createdAt: 0 } }).toArray()
        return sendRes(res, "Successfully SignUp.", true, 200, productData);

    } catch (error) {
        return sendRes(res, error.message, false, 404);
    }
}

module.exports = { productListing }
