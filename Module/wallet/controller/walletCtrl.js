const { ObjectId } = require('mongodb')
const { dbConnect } = require('../../../Helper/dbConnection')

const walletSetup = async (req, res) => {
    try {
        if (!req.body.balance || !req.body.name) {
            throw new Error('Please provide required field as a balance and name.')
        }
        let obj = { balance: req.body.balance, name: req.body.name, walletId: ObjectId(), createdAt: new Date().toDateString() }
        const insertData = await (await dbConnect()).collection('wallet').insertOne(obj)
        const walletData = await (await dbConnect()).collection('wallet').findOne({ "_id": insertData.insertedId }, { projection: { _id: 0 } })
        return sendRes(res, "Successfully setup wallet", true, 201, walletData);
    } catch (error) {
        return sendRes(res, error.message, false, 400);
    }
}

const walletDetails = async (req, res) => {
    try {
        const walletData = await (await dbConnect()).collection('wallet').findOne({ walletId: ObjectId(req.params.walletId) }, { projection: { _id: 0 } })
        return sendRes(res, "Successfully found wallet", true, 200, walletData);
    } catch (error) {
        return sendRes(res, error.message, false, 400);
    }
}

const creditWallet = async (req, res) => {
    try {
        if (!req.body.amount || !req.body.description) {
            throw new Error('Please provide required field as a amount and description.')
        }
        const walletData = await (await dbConnect()).collection('wallet').findOneAndUpdate(
            { walletId: ObjectId(req.params.walletId) },
            {
                $set: { description: req.body.description },
                $inc: { balance: +(req.body.amount) },
            },
            { projection: { _id: 0 } })
        return sendRes(res, "Successfully reachage wallet", true, 201, walletData.value);
    } catch (error) {
        return sendRes(res, error.message, false, 400);
    }
}

const purchaseProduct = async (req, res) => {
    try {
        const productData = await (await dbConnect()).collection('product').findOne({ productId: req.body.productId })
        const walletData = await (await dbConnect()).collection('wallet').findOne({ walletId: ObjectId(req.params.walletId) })
        if (productData && walletData) {
            if (walletData.balance < productData.amount) {
                throw new Error('Please recharge your wallet first!!')
            }
            else {
                const transId = await purchaseProductFun(req, productData)
                const transactionData = await (await dbConnect()).collection('transaction').findOne({ transactionId: transId }, { projection: { _id: 0 } })
                if (transactionData) {
                    await (await dbConnect()).collection('wallet').updateOne({ walletId: ObjectId(req.params.walletId) }, { $inc: { balance: -(productData.amount) } })
                }
                return sendRes(res, "Successfully purchase a product!!", true, 201, transactionData);
            }
        }
    } catch (error) {
        return sendRes(res, error.message, false, 400);
    }
}

const listTransaction = async (req, res) => {
    try {
        let pipeline = [{ $match: { walletId: ObjectId(req.params.walletId) } }, { $project: { _id: 0 } }, { $sort: { createdAt: -1 } }]
        let query = []
        if (req.query.skip) {
            query.push({ $skip: Number(req.query.skip) })
        }
        if (req.query.limit) {
            query.push({ $limit: Number(req.query.limit) })
        }
        if (req.query.skip && req.query.limit) {
            query = [{ $skip: Number(req.query.skip) }, { $limit: Number(req.query.limit) }]
        }
        pipeline.push(...query)
        const transactionData = await (await dbConnect()).collection('transaction').aggregate(pipeline).toArray()
        return sendRes(res, "Successfully found transactions", true, 200, transactionData);
    } catch (error) {
        return sendRes(res, error.message, false, 400);
    }
}

const purchaseProductFun = async (req, productData) => {
    try {
        let obj = {
            balance: productData.amount,
            transactionId: ObjectId(),
            description: productData.description,
            type: 'debit',
            productId: req.body.productId,
            walletId: ObjectId(req.params.walletId),
            createdAt: new Date().toDateString()
        }
        await (await dbConnect()).collection('transaction').insertOne(obj)
        return obj.transactionId;
    } catch (error) {
        throw error
    }
}

module.exports = { walletSetup, walletDetails, creditWallet, purchaseProduct, listTransaction }