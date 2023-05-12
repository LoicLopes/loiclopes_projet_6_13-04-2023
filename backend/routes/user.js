/* Dans ce fichier, on va définir les routes pour gérer les utilisateurs, c'est-à-dire créer un compte et se connecter. */


// On va avoir besoin d'un module d'express pour créer des routes.
// On va donc avoir besoin d'importer express

// Récupère le module express
const express = require('express');

// Variable qui utilise express avec la méthode routeur d'express
const router = express.Router();

// Variable qui récupère le dossier dans le dossier controller le fichier user
const userCtrl = require ('../controllers/user');

// Utilise la variable router avec la méthode post 
// 1 Puis on lui attribut le chemin attendu
// 2 Puis on lui attribut la variable "userCtrl" qu'on a importé et qui contient les fichier contrôlés et sécurisé
// 3 Puis dans ce fichier, on lui donne la fonction qu'on a exportée "signup" 
router.post('/signup', userCtrl.signup);

// Utilise la variable router avec la methode post 
// 1 Puis on lui attribut le chemin attendu
// 2 Puis on lui attribut la variable "userCtrl" qu'on a importé et qui contient les fichier contrôlés et sécurisé
// 3 Puis dans ce fichier, on lui donne la fonction qu'on a exportée "login" 
router.post('/login', userCtrl.login);

// On exporte les routes que l'on vient de créer avec la méthode routeur d'express.
module.exports = router;

