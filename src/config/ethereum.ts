export const ethereum = {
  sendTransaction: {
    toAddress: process.env.SEND_TRANSACTION_TO_ADDRESS,
    dataContract: process.env.SEND_TRANSACTION_DATA_CONTRACT,
  },
  privateSaleTransaction: {
    toAddress: process.env.PRIVATE_SALE_TRANSACTION_TO_ADDRESS,
    dataContract: process.env.PRIVATE_SALE_TRANSACTION_DATA_CONTRACT,
  }
}