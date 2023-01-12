const walletRoutes = require('express').Router()
const { walletSetup, walletDetails, creditWallet, purchaseProduct, listTransaction } = require('../controller/walletCtrl')

walletRoutes.post('', walletSetup)
walletRoutes.get('/:walletId', walletDetails)
walletRoutes.post('/:walletId/transaction', creditWallet)
walletRoutes.post('/:walletId/purchase', purchaseProduct)
walletRoutes.get('/:walletId/transaction', listTransaction)

module.exports = walletRoutes