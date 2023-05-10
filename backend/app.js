// Pour creer une application express on vas avoir besoin d'intaller express avec la commande = npm install express 
// On vas avoir ensuite besoin d'un module pour connecter l'application a la base de donner on vas donc installer mongoose avec la commande = npm install mongoose
// Une fois les outils installer

// On Récupère le module express dans une variable avec la methode "require"
const express =require('express');

// On Récupère le modules Mongoose dans une variable avec la méthode "require"
const mongoose = require('mongoose');

// On créer une Variable app pour creer l'application puis on lui attribut les fonctions de express()
const app = express();

// Maintenant que l'application est crée on vas avoir besoin de dire à app de traiter les requetes utilisateur au format json 
// On vas donc dire a app d'utilise la methode express.json() il existe une ancienne methode qui s'apelle body.parser()
app.use(express.json());

// Maintenant que on peut traiter les requêtes on vas donc se connecter a la base de données 
// login mongoose :
let user='lopesloic64';
let password='bayonne';
let cluster='sauce.txezxlg.mongodb.net';
let dbname='thing';
// 'mongodb+srv://'lopesloic64':'bayonne'@'sauce.txezxlg.mongodb.net'/'thing'?retryWrites=true&w=majority'
let db= 'mongodb+srv://' + user + ':' + password + '@' + cluster + '/' + dbname + '?retryWrites=true&w=majority';
mongoose.connect(db,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie!'))                                              
  .catch((e) => console.log(e));

// Il y a des sécuriter par default qui empêche les requetes https d'adress ip différent de communiquer avec l'api 
// On vas donc attribuer des entete (headers) a notre application avec un middleware
// Donc app utilise (requete , result , suivant) fonction fleché
app.use((req, res, next) => {
    // result.attributentete("acces a l'origine de l'api,          définit "*" pour dire tout le monde peut communiquer avec l'api)
    res.setHeader('Access-Control-Allow-Origin', '*');
    // result.attributentete ("acces au entete de l'api",          définit   ....................................")
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // result.attributentete ("Acces au méthode de l'api",         définit les methodes que l'on souhaite utiliser")
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
  
  // const sauceRoutes
  // const user Routes
  //app.use('/api/stuff', stuffRoutes);
  //app.use('/api/auth', userRoutes);
  //app.use('/image', express.static(this.path.join(__dirname, 'images')));


// export app pour l'utiliser dans les autres fichiés
module.exports = app;

