/*Pour créer une application express, on va avoir besoin d'installer express.
Avec la commande = npm install express
On va avoir ensuite besoin d'un module pour connecter l'application à la base de données.
On va donc installer mongoose avec la commande = npm install mongoose
Une fois les outils installés*/


require("dotenv").config();
//On récupère le module express dans une variable avec la méthode "require"
const express = require('express');

// Variable mongoose = récupère le modules mongoose de nodejs qui sert a accéder à une basse de donnés noSQL
const mongoose = require ('mongoose');

// On créer une variable app pour créer l'application puis on lui attribut les fonctions de express()
const app = express();

// Il nous faudra une nouvelle importation dans app.js pour accéder au path de notre serveur
const path = require ('path');

// On récupère le router user (utilisateur) dans le dossier routes
const userRoutes =  require ('./routes/user');

// On récupère le router sauces  dans le dossier routes
const sauceRoutes = require('./routes/sauce');


// Définis un identifiant de la base de données pour que l'API se connecte a cette base de données MongoDB
//login mongoose :
let user=process.env.DB_USER;
let password=process.env.DB_PASSWORD;
let cluster=process.env.DB_CLUSTER;
let dbname=process.env.DB_NAME;
// db = 'mongodb+srv://'lopesloic64':'bayonne'@'sauce.txezxlg.mongodb.net'/'thing'?retryWrites=true&w=majority'
let db= 'mongodb+srv://' + user + ':' + password + '@' + cluster + '/' + dbname + '?retryWrites=true&w=majority';
mongoose.connect(db,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie!'))                                              
  .catch((e) => console.log(e));




//Gestion des CORS "CrossOrigin Resource Sharing"//
/*Système de sécurité qui bloque par défaut les appels HTTP entre des serveur différents*/
/*On va donc ajouter des ENTÊTE (header) à notre application 
pour dire que tout vas bien, et que tout le monde puisse utiliser l'API*/
// App utilise(requête, réponse, suivant) puis une fonction flecher  
//  On définit les ENTÊTE result
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});




/*Maintenant, que l'application est créée, on va avoir besoin de dire à app de traiter les requêtes utilisateur au format json 
On va donc dire a app d'utiliser la méthode express.json() il existe une ancienne méthode qui s'apelle body.parser()
app utilise (express.json) pour pouvoir accéder au corps de la requête (toute les requêtes qui ont une content type json)
Et nous met à disposition ce contenu dans req.body */
app.use(express.json());

// Puis app vas l'utiliser 
// 1 On lui attribut le chemin de l'api
// 2 On lui attribut la variable qui importe le fichier router (pour l'user)
app.use('/api/auth', userRoutes);

// Puis app vas l'utiliser 
// 1 On lui attribut le chemin de l'api
// 2 On lui attribut la variable qui importe le fichier router (pour les sauces)
app.use('/api/sauces', sauceRoutes);


// Puis app vas utiliser 
// 1 On lui attribut la route /image
// 2 On lui attribut le middleware static qui est fournis pas express pour gérer les images dans le dossier de façon static
// 3 On récupère l'image avec path qu'on a importé préalablement 
// 4 On join l'image dans le dossier 
// 5 On défini notre sous-répertoire de notre répertoire de base avec (__dirname)
// 6 Puis on attribut le nom de notre sous répertoire donc 'images'
app.use('/image', express.static(path.join(__dirname, 'images')));

// On exporte le module app pour y avoir acces dans d'autre fichier tels que server.js pour que le serveur tourne correctement 
module.exports = app;
