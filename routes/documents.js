const express = require('express');

const documentsController = require('../controllers/documentsController');

const router = express.Router();

// GET request for all documents
router.get('/', documentsController.getAll);

// POST request for creating a document
router.post('/create', documentsController.create);

module.exports = router;
