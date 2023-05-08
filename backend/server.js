// Récupere le modules http de nodeJS
const http=require('http');


// Récupère le dossier app
const app = require ('./app');


// Const qui va créer le serveur en 3 parties 
// 1 : Le module Http de node
// 2 : La méthode createServer de package Http
// 3 : Utilise l'application app du fichier app.js pour utiliser la fonction req et res 
const server = http.createServer(app);


// Dit à app de utilisé le 'port' (environnement ou 3000) 
//app.set('port', process.env.PORT || 3000);
// Variable pour normaliser le port 
const normalizePort = val => {
    // Utilise ...........................
    const port = parseInt(val, 10); 
   // Si ....................
    if (isNaN(port)) {
      // Retour valeur  
      return val;
    }
    // Si port Supérieur ou égale a 0
    if (port >= 0) {
      // Retour du port
      return port;
    }
    // Retour faux
    return false;
  };

  // Variable qui utilise la fonction normalize ("")
  const port = normalizePort(process.env.PORT || '3000');
  
  app.set('port', port);



  // Variable errorHandler = gestionnaire d'erreurs
  // est égale a l'erreur suivi d'une fonction flécher pour la gerer l'erreur
  const errorHandler = error => {
    // Si erreur du systeme est différent de écouter
    if (error.syscall !== 'listen') {
      throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges.');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use.');
        process.exit(1);
        break;
      default:
        throw error;
    }
  };

  server.on('error', errorHandler);
  server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
  });
  
server.listen(port);