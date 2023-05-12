/*Comme dans l'espace utilisateur précisément le login quand un utilisateur se connecte on lui attribut un token secret
On vas donc dans cette partie vérifier se token qu'on attribue à l'utilisateur pour que les informations et 
les requêtes qu'il communiquera avec notre base de données sois bien sécurisé et donc pas modifiable par d'autres utilisateurs.
(Exemple une sauce qu'il crée ne peut pas être modifié par quelqu'un d'autre.)
*/

// On va donc récupérer le module jsonwebtoken qu'on a déjà installé avant.
const jsontoken = require('jsonwebtoken');

// On va donc créer un module qu'ont exports avec un middleware (req , res , next) et une fonction fléchée
// Dans notre fonction flécher, on va donc devoir gérer deux cas
// 1 LE TRY (là où vas récupérer le token , le décoder et l'attribuer a l'userId du compte utilisateur du client)
// 2 LE CATCH (l'erreur)
module.exports = (req, res, next)=>{
    try{ 
        // On récupère notre token dans le header puis on le split (divise) dans un tableau (' ') 
        // Autour de l'espace entre (l'espace bearer) et (le token)
        // { Bearer: ogkroiejkgoirejkgiorejkdaldoaAZEAEAZFdfzefezfzEAZEAZdfsfea }
        // On met [1] pour dire que c'est bien le deuxième donc le token qu'on sélectionne
        const token = req.headers.authorization.split(' ')[1];
        // On va décoder le token avec la méthode verify de jswonbewtoken (on lui attribut le token et la clef secrète)
        const decodedToken = jsontoken.verify(token, 'RANDOM_TOKEN_SECRET');
        // Maintenant, on récupère l'userId dans le token décrypter
        const userId = decodedToken.userId;
        // Puis on ajoute cette valeur a l'objet request qui lui sera transmit au fichier route : req.auth 
        req.auth = {
            // on lui attribut le userId décoder
            userId: userId
        };
    }catch(error){
        // On définit ici dans le console.log l'erreur pour se repérer en cas de problème.
        console.log('authentification du token erreur');
        // Puis on retourne l'erreur sous forme d'objet 
        res.status(401).json({ error });
    }
    next();
};


