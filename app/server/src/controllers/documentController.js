const Document = require('../models/Document');
const CustomError = require('../errors/CustomError');

exports.uploadDocument = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new CustomError('No file uploaded', 400, 'NO_FILE_UPLOADED');
    }

    const newDocument = new Document({
      name: req.body.name,
      type: req.file.mimetype,
      filePath: req.file.path,
    });

    await newDocument.save();
    res.status(201).json({ message: 'Document uploaded successfully', document: newDocument });
  } catch (error) {
    next(error instanceof CustomError ? error : new CustomError('Error uploading document', 500));
  }
};

exports.getDocument = async (req, res, next) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) {
      throw new CustomError('Document not found', 404, 'DOCUMENT_NOT_FOUND');
    }
    res.status(200).json(document);
  } catch (error) {
    next(error instanceof CustomError ? error : new CustomError('Error fetching document', 500));
  }
};

exports.updateDocumentStatus = async (req, res, next) => {
  try {
    const updatedDocument = await Document.findByIdAndUpdate(
      req.params.id,
      { verificationStatus: req.body.verificationStatus },
      { new: true }
    );
    if (!updatedDocument) {
      throw new CustomError('Document not found', 404, 'DOCUMENT_NOT_FOUND');
    }
    res.status(200).json({ message: 'Document status updated successfully', document: updatedDocument });
  } catch (error) {
    next(error instanceof CustomError ? error : new CustomError('Error updating document status', 500));
  }
};
