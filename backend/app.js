// Pour creer une application express on vas avoir besoin d'intaller express avec la commande = npm install express 
// On vas avoir ensuite besoin d'un module pour connecter l'application a la base de donner on vas donc installer mongoose avec la commande = npm install mongoose
// Une fois les outils installer

// On Récupère le module express dans une variable avec la methode "require"
const express =require('express');

// Variable mongoose = récupere le modules mongoose de nodejs qui sert a acceder a une basse de donnés noSQL
const mongoose = require ('mongoose');

// On créer une Variable app pour creer l'application puis on lui attribut les fonctions de express()
const app = express();

// On récupère le router user (utilisateur) dans le dossier routes
const userRoutes =  require ('./routes/user');

// Maintenant que l'application est crée on vas avoir besoin de dire à app de traiter les requetes utilisateur au format json 
// On vas donc dire a app d'utilise la methode express.json() il existe une ancienne methode qui s'apelle body.parser()
/* app utilise (express.json) pour pouvoir acceder au corp de la requête (toute les requetes qui on une content type json)
et nous met a disposition se contenue dans req.body */


// Définit un identifiant de la base de donnée pour que l'API se connect a cette base de données MongoDB
//login mongoose :
let user='lopesloic64';
let password='bayonne';
let cluster='sauce.txezxlg.mongodb.net';
let dbname='thing';
// db = 'mongodb+srv://'lopesloic64':'bayonne'@'sauce.txezxlg.mongodb.net'/'thing'?retryWrites=true&w=majority'
let db= 'mongodb+srv://' + user + ':' + password + '@' + cluster + '/' + dbname + '?retryWrites=true&w=majority';
mongoose.connect(db,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie!'))                                              
  .catch((e) => console.log(e));



//Gestion des CORS "CrossOrigin Resource Sharing"//
/*Système de sécuriter qui bloque par défault les appels HTTP entre des serveur différents*/
/* On vas donc ajouter des ENTETE (header) a notre application pour dire que tout vas bien pour que tout le monde puisse utilise l'API*/

// app utilise(requete , response, suivant) puis une fonction flecher pour 
//CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});

app.use(express.json());

// Puis app vas l'utiliser 
// 1 On lui attribut le chemin de l'api
// 2 Nn lui attribut la variable qui a importer le fichier router
app.use('/api/auth', userRoutes);


// On récupère le router sauces  dans le dossier routes
// const sauceRoutes = require('./routes/sauce');
// app utilise 
//app.use('/api/stuff', stuffRoutes);


  // app utilise
  //app.use('/image', express.static(this.path.join(__dirname, 'images')));




// On exporte le module app pour y avoir acces dans d'autre fichier tels que server.js pour que le serveur tourne correctement 
module.exports = app;































































/*
// Récupère le module express
const express =require('express');
// Récupère le modules Mongoose
const mongoose = require('mongoose');
// Variable app : Utilise express
const app = express();


// const sauceRoutes = require('./routes/sauce');

// const user Routes =  require ('./routes/user');

// login mongoose :
let user='lopesloic64';
let password='bayonne';
let cluster='sauce.txezxlg.mongodb.net';
let dbname='thing';
// db = 'mongodb+srv://'lopesloic64':'bayonne'@'sauce.txezxlg.mongodb.net'/'thing'?retryWrites=true&w=majority'
let db= 'mongodb+srv://' + user + ':' + password + '@' + cluster + '/' + dbname + '?retryWrites=true&w=majority';
mongoose.connect(db,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie!'))                                              
  .catch((e) => console.log(e));


// app utilise ...........
app.use(express.json()); 
// App utilise (middleware)
app.use((req, res, next) => {
    // 
    res.setHeader('Access-Control-Allow-Origin', '*');
    //
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    //
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    //
    next();
  });
  
  // app utilise 
  //app.use('/api/stuff', stuffRoutes);

  // app utilise
  //app.use('/api/auth', userRoutes);

  // app utilise
  //app.use('/image', express.static(this.path.join(__dirname, 'images')));


// export app pour l'utiliser dans les autres fichiés
module.exports = app;
*/