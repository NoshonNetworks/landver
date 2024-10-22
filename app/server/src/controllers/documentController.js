const Document = require('../models/Document');

exports.uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const newDocument = new Document({
      name: req.body.name,
      type: req.file.mimetype,
      filePath: req.file.path
    });

    await newDocument.save();
    res.status(201).json({ message: 'Document uploaded successfully', document: newDocument });
  } catch (error) {
    res.status(400).json({ message: 'Error uploading document', error: error.message });
  }
};

exports.getDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }
    res.status(200).json(document);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching document', error: error.message });
  }
};

exports.updateDocumentStatus = async (req, res) => {
  try {
    const updatedDocument = await Document.findByIdAndUpdate(
      req.params.id,
      { verificationStatus: req.body.verificationStatus },
      { new: true }
    );
    if (!updatedDocument) {
      return res.status(404).json({ message: 'Document not found' });
    }
    res.status(200).json({ message: 'Document status updated successfully', document: updatedDocument });
  } catch (error) {
    res.status(400).json({ message: 'Error updating document status', error: error.message });
  }
};