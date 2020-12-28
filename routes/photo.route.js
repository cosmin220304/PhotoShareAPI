const router = require('express').Router();
const { photosController } = require('../controllers');
const { payloadValidation, requireAuth } = require('../middlewares');
const { photoCreate, photoUpdate } = require('../schemas');

router.post('/', requireAuth, payloadValidation(photoCreate), photosController.create);
router.get('/', photosController.getAll);
router.get('/random', photosController.getRandom);
router.get('/:id', photosController.getById);
router.patch('/:id', requireAuth, payloadValidation(photoUpdate), photosController.update);
router.delete('/:id', requireAuth, photosController.deleteById);

module.exports = router;