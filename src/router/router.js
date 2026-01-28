const express = require('express'), 
router= express.Router()
const basoController = require('../controller/basoController')
const auth = require('../middleware/auth')

router.get('/', auth, basoController.tampilData)
router.post('/', auth, basoController.createData)
router.put('/:id', auth, basoController.updateData)
router.delete('/:id', auth, basoController.deleteData)
router.get('/:id', auth, basoController.getById)

module.exports = router