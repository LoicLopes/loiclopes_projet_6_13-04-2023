// Récupère le module express
const express = require('express');
// Variable qui utilise express avec la methode routeur
const router = express.Router();

// Variable qui récupère le dossier dans le dossier controller le fichier user
//const userCtrl = require ('../controllers/user');

// Utilise la variable express avec la methode post 
// puis 
router.post('/signup', userCtrl.signup);
// Utilise la variable express avec la methode post 
router.post('/login', userCtrl.login);

module.exports = router;