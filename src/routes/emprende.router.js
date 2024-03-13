const express = require('express')

const router = express.Router()

const emprendeController = require('../controllers/emprende.controller')

router.get('/:id', emprendeController.getEmprendeById)
router.post('/', emprendeController.createEmprende)

module.exports = router;