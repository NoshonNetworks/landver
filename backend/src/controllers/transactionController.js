const Transaction = require('../models/Transaction');
const blockchainService = require('../services/blockchainService');

exports.createTransaction = async (req, res) => {
  try {
    const newTransaction = new Transaction(req.body);
    await newTransaction.save();

    // Transfer land on blockchain
    const blockchainResult = await blockchainService.transferLand(
      newTransaction.landId,
      newTransaction.toOwnerId
    );

    if (!blockchainResult) {
      // If blockchain transfer fails, you might want to delete the transaction from your database
      await Transaction.findByIdAndDelete(newTransaction._id);
      return res.status(500).json({ message: 'Failed to transfer land on blockchain' });
    }

    res.status(201).json({ message: 'Transaction created successfully', transaction: newTransaction });
  } catch (error) {
    res.status(400).json({ message: 'Error creating transaction', error: error.message });
  }
};

exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate('landId')
      .populate('fromOwnerId')
      .populate('toOwnerId')
      .populate('approvedBy')
      .populate('documents');
    res.status(200).json(transactions);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching transactions', error: error.message });
  }
};

exports.getTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id)
      .populate('landId')
      .populate('fromOwnerId')
      .populate('toOwnerId')
      .populate('approvedBy')
      .populate('documents');
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.status(200).json(transaction);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching transaction', error: error.message });
  }
};

exports.updateTransaction = async (req, res) => {
  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTransaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.status(200).json({ message: 'Transaction updated successfully', transaction: updatedTransaction });
  } catch (error) {
    res.status(400).json({ message: 'Error updating transaction', error: error.message });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!deletedTransaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting transaction', error: error.message });
  }
};