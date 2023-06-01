const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')
const productCtrl = require('../controllers/product');

router.get('/', productCtrl.getItems)
router.post('/', auth, multer, productCtrl.createItem)
router.delete('/:id',auth, productCtrl.deleteItem);
router.get('/:id', productCtrl.getOneItem)
router.put('/:id', auth, multer, productCtrl.updateItem)



module.exports = router;