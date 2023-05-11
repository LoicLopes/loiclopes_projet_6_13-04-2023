
const express = require ('express');
//const auth = require('../middleware/auth');
const router = express.Router();
//const multer = require('../middleware/multer-config');


const stuffCtrl = require ('../controllers/stuff');



router.post('/',  stuffCtrl.createThing);
router.put('/:id',  stuffCtrl.modifyThing); 
router.delete('/:id',  stuffCtrl.deleteThing);
router.get('/:id',  stuffCtrl.getOneThing); 
router.get('/', stuffCtrl.getAllThings);




/*
router.post('/', auth, multer, stuffCtrl.createThing);
router.put('/:id', auth, multer, stuffCtrl.modifyThing); 
router.delete('/:id', auth, stuffCtrl.deleteThing);
router.get('/:id', auth, stuffCtrl.getOneThing); 
router.get('/', auth, stuffCtrl.getAllThings);*/

module.exports= router;
