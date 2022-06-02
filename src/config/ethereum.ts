export const ethereum = {
  sendTransaction: {
    toAddress: process.env.BUY_TRANSACTION_DESTINATION_WALLET ,
    dataContract: process.env.BUY_SALE_CRYPTO_CONTRACT,
  },
  privateSaleTransaction: {
    toAddress: process.env.PRIVATE_SALE_DESTINATION_WALLET,
    dataContract: process.env.PRIVATE_SALE_CRYPTO_CONTRACT,
  }
}