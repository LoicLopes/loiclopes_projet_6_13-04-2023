// Récupère le module express
const express =require('express');
// Récupère le modules Mongoose
const mongoose = require('mongoose');
// Variable app : Utilise express
const app = express();
// const sauceRoutes
// const user Routes

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

app.use(express.json()); 

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
  
  
  //app.use('/api/stuff', stuffRoutes);
  //app.use('/api/auth', userRoutes);
  //app.use('/image', express.static(this.path.join(__dirname, 'images')));


// export app pour l'utiliser dans les autres fichiés
module.exports = app;