    const express = require('express'), 
    router= express.Router()
    const userController = require('../controller/userController')
    const auth = require('../middleware/auth')

    router.get('/', auth, userController.tampilData)
    router.post('/register', userController.createData)
    router.put('/:id', auth, userController.updateData)
    router.delete('/:id', auth, userController.deleteData)
    router.get('/:id', auth, userController.getById)

    module.exports = router