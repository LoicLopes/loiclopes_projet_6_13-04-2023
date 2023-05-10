// On vas avoir besoin d'un module de express pour Creer des routes 
// On vas donc avoir besoin d'importer express

// Récupère le module express
const express = require('express');
// Variable qui utilise express avec la methode routeur
const router = express.Router();

// Variable qui récupère le dossier dans le dossier controller le fichier user
const userCtrl = require ('../controllers/user');

// Utilise la variable express avec la methode post 
// 1 puis on lui attribut le chemin attentu
// 2 Puis on lui attribut la variable "userCtrl" qui a les fichier controller et sécurisé
// 3 Puis dans se fichier on lui donne la fonction que on a exporté "signup" 
router.post('/signup', userCtrl.signup);

// Utilise la variable express avec la methode post 
// 1 puis on lui attribut le chemin attentu
// 2 Puis on lui attribut la variable userCtrl qui a les fichier controller et sécurisé
// 3 Puis dans se fichier on lui donne la fonction que on a exporté "login" 
router.post('/login', userCtrl.login);

module.exports = router;

