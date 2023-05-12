/*Dans ce fichier, on va définir les routes pour gérer les sauces de l'api, c'est-à-dire a ajouté supprimé, modifier.*/

// On va avoir besoin d'un module d'express pour créer des routes.
// On va donc avoir besoin d'importer express

// Récupère le module express
const express = require ('express');
// Variable qui utilise express avec la méthode routeur
const router = express.Router();

// Variable multer qui récupère le dossier middleware le fichier multer-config  pour la gestion des fichiers image
const multer = require('../middleware/multer-config');
// Variable auth qui récupère le dossier middleware et le fichier auth pour la gestion des token de requête pour plus de sécurité
const auth = require('../middleware/auth');

// Variable sauceCtrl qui récupère dans le dossier controller le fichier user 
const sauceCtrl = require ('../controllers/sauce');

// Utilise la variable router avec la méthode get pour prendre
// 1 Puis on lui attribut le chemin attendu ('/') dans l'api
// 2 On lui attribut la variable auth qui gère l'authentification des requêtes par token 
// 3 Puis on lui attribut la variable "sauceCtrl" qu'on a importé et qui contient les fichiers contrôlés et sécurisés
// 4 Puis dans ce fichier, on lui donne la fonction qu'on a exportée "getAllSauces" pour récupérer toutes  les sauces
router.get('/',  auth, sauceCtrl.getAllSauces);

// Utilise la variable router avec la méthode get pour prendre
// 1 Puis on lui attribut le chemin attendu ('/:id') de l'api et l'id du produit
// 2 On lui attribut la variable auth qui gère l'authentification des requêtes par token 
// 3 Puis on lui attribut la variable "sauceCtrl" qu'on a importé et qui contient les fichiers contrôlés et sécurisés
// 4 Puis dans ce fichier, on lui donne la fonction qu'on a exportée "getOneSauce" pour prendre une seule sauce
router.get('/:id', auth, sauceCtrl.getOneSauce);

// Utilise la variable router avec la méthode post pour poster
// 1 Puis on lui attribut le chemin attendu ('/') dans l'api
// 2 On lui attribut la variable auth qui gère l'authentification des requêtes par token 
// 3 On lui attribut la variable multer qui gère la gestion des fichier a télécharger (images).
// 4 Puis on lui attribut la variable "sauceCtrl" qu'on a importé et qui contient les fichiers contrôlés et sécurisés
// 5 Puis dans ce fichier, on lui donne la fonction qu'on a exportée "createSauce" pour créer une sauce 
router.post('/', auth, multer, sauceCtrl.createSauce);

// Utilise la variable router avec la méthode put pour modifier 
// 1 Puis on lui attribut le chemin attendu ('/:id') de l'api et l'id du produit 
// 2 On lui attribut la variable auth qui gère l'authentification des requêtes par token 
// 3 On lui attribut la variable multer qui gère la gestion des fichier a télécharger (images).
// 4 Puis on lui attribut la variable "sauceCtrl" qu'on a importé et qui contient les fichiers contrôlés et sécurisés
// 5 Puis dans ce fichier, on lui donne la fonction qu'on a exportée "modifySauce" pour modifier une sauce
router.put('/:id',  auth, multer, sauceCtrl.modifySauce);


// Utilise la variable router avec la méthode delete pour supprimer 
// 1 Puis on lui attribut le chemin attendu ('/')
// 2 On lui attribut la variable auth qui gère l'authentification des requêtes par token 
// 3 Puis on lui attribut la variable "sauceCtrl" qu'on a importé et qui contient les fichiers contrôlés et sécurisés
// 4 Puis dans ce fichier, on lui donne la fonction qu'on a exportée "deleteSauce" pour supprimer une sauce
router.delete('/:id',  auth, sauceCtrl.deleteSauce);




// Utilise la variable router avec la méthode post pour poster
// 1 Puis on lui attribut le chemin attendu ('/:id') de l'api et l'id du produit 
// 2 On lui attribut la variable auth qui gère l'authentification des requêtes par token 
// 3 Puis on lui attribut la variable "sauceCtrl" qu'on a importé et qui contient les fichiers contrôlés et sécurisés
// 4 Puis dans ce fichier, on lui donne la fonction qu'on a exportée "likeSauce" pour poster un like sur une sauce
router.post("/:id/like", auth, sauceCtrl.likeSauce);




// On exporte les routes que l'on vient de créer avec la méthode routeur d'express.
module.exports= router;
