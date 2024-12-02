const Transaction = require('../models/Transaction');
const blockchainService = require('../services/blockchainService');
const CustomError = require('../errors/CustomError');

exports.createTransaction = async (req, res, next) => {
  try {
    const newTransaction = new Transaction(req.body);
    await newTransaction.save();

    // Transfer land on blockchain
    const blockchainResult = await blockchainService.transferLand(
      newTransaction.landId,
      newTransaction.toOwnerId
    );

    if (!blockchainResult) {
      // If blockchain transfer fails, delete the transaction from the database
      await Transaction.findByIdAndDelete(newTransaction._id);
      throw new CustomError('Failed to transfer land on blockchain', 500, 'BLOCKCHAIN_TRANSFER_FAILED');
    }

    res.status(201).json({ message: 'Transaction created successfully', transaction: newTransaction });
  } catch (error) {
    next(error instanceof CustomError ? error : new CustomError('Error creating transaction', 400));
  }
};

exports.getAllTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find()
      .populate('landId')
      .populate('fromOwnerId')
      .populate('toOwnerId')
      .populate('approvedBy')
      .populate('documents');
    res.status(200).json(transactions);
  } catch (error) {
    next(new CustomError('Error fetching transactions', 500, 'FETCH_TRANSACTIONS_ERROR', error.message));
  }
};

exports.getTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id)
      .populate('landId')
      .populate('fromOwnerId')
      .populate('toOwnerId')
      .populate('approvedBy')
      .populate('documents');
    if (!transaction) {
      throw new CustomError('Transaction not found', 404, 'TRANSACTION_NOT_FOUND');
    }
    res.status(200).json(transaction);
  } catch (error) {
    next(error instanceof CustomError ? error : new CustomError('Error fetching transaction', 500));
  }
};

exports.updateTransaction = async (req, res, next) => {
  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTransaction) {
      throw new CustomError('Transaction not found', 404, 'TRANSACTION_NOT_FOUND');
    }
    res.status(200).json({ message: 'Transaction updated successfully', transaction: updatedTransaction });
  } catch (error) {
    next(new CustomError('Error updating transaction', 500, 'UPDATE_TRANSACTION_ERROR', error.message));
  }
};

exports.deleteTransaction = async (req, res, next) => {
  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!deletedTransaction) {
      throw new CustomError('Transaction not found', 404, 'TRANSACTION_NOT_FOUND');
    }
    res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    next(new CustomError('Error deleting transaction', 500, 'DELETE_TRANSACTION_ERROR', error.message));
  }
};
