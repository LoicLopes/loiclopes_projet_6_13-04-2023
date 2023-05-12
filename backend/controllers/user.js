/*Maintenant, on va utiliser notre modèle créé préalablement dans le dossier models (le fichier user)
Et On va donc mettre des sécurités à notre modèle en utilisant deux modules spécifiques.
1 bcrypt : qui va-nous permettre de hacher notre mot de passe on l'install avec la commande = npm install bcrypt
2 jsonwebtoken : qui va-nous permettre de créer un token quand un utilisateur se connecte, il reçoit un token encoder.
Ce qui va permettre au serveur de vérifier les requêtes liées par un token pour plus de sécurité
Une fois les modules installés*/

// On récupère le module bcrypt
const bcrypt = require('bcrypt');
// on récupère le module jsonwebtoken
const jsonwebtoken = require('jsonwebtoken');
// On récupère notre modèle schéma d'utilisateur 
const User = require('../models/user');

//Comme c'est un espace utilisateur, on va créer 2 espaces :
//1 L'espace signup qui vas servir a créer un compte utilisateur.
//2 L'espace login qui vas servir à connecter un compte utilisateur.

//Dans cette première parti, on a besoin de créer une fonction qui va nous permettre de créer un espace utilisateur sécurisé
//1 Créer une fonction
//2 Utilise le module de cryptage de mot de passe
//3 Se servir du schéma user importer qui a déjà une fonctionnalité de sécurité (mongoose-unique-validator)
//4 Faire un retour sauvegarde
//5 Faire un retour erreur

/*Maintenant, on va créer une fonction pour créer un utilisateur a l'aide de la fonction signup
suivi d'un middleware (req,res,next) et une fonction fléchée */
exports.signup = (req, res, next) => {
    // On utilise le module bcrypt avec sa fonction hash pour hacher le mot de passe en "*"
    // puis on lui dit d'allez requêter le body et de récupèrer le password 
    // puis on lui attribut le nombre de fois qu'on utilise l'algorithme de hachage 
    bcrypt.hash(req.body.password, 10)
        // Ensuite après avoir récupéré le mot de passe haché
        .then(hash => {
            // On va créer un nouvel utilisateur avec une variable user.
            // On utilise le constructeur new puis un lui attribut le modèle schéma.
            const user = new User({
                // Dans email : on requête le body et de récupérer l'email.
                email: req.body.email,
                // Dans password : on lui attribut le password haché qu'on a récupéré plus tôt dans la fonction
                password: hash
            });
            // Une fois le nouvel utilisateur créé, on va devoir le sauvegarder dans la base de données.
            // Donc on utilise la fonction save() sur le nouvel utilisateur user
            user.save()
                // Si c'est sauvegarder, on renvoie un statue 201 qui veut dire création de ressource puis un message json pour dire que l'utilisateur est bien créé.
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                // Si sa bloque ont renvoie l'erreur sous résultat statut 400 puis en json sous forme d'objet
                .catch((error) => {
                    console.log('signup : catch 1 ', error);
                    res.status(400).json('Une erreur s\'est produite');
                });
        })
        // Si sa bloque ont renvoie l'erreur sous résultat statut 403 pour la différencier du 400 puis en json sous forme d'objet
        .catch((error) => {
            console.log('signup : catch 2 ', error);
            res.status(403).json('Une erreur s\'est produite');
        }
        );
};

/* On va maintenant créer une fonction login qui va nous permettre de vérifier si un utilisateur existe dans notre base de données et
   si le mot de passe transmit par le client correspond à cet utilisateur.
1 Communiquer avec la base de données avec son nom de clef quel stock donc = User
2 Lui transmettre l'email saisi par l'utilisateur pour voir si elle existe dans la base de données
Puis on va créer une fonction pour connecter un utilisateur à l'aide de la fonction login suivi d'un middleware et d'une fonction fléché.*/
exports.login = (req, res, next) => {
    // On vas donc utilise la méthode findOne qui veut dire "trouver un" de notre classe User puis nous lui passons un objet qui va servir de filtre. 
    // Avec un champ email : et la valeur qui nous a été transmise par le client dans le body
    User.findOne({ email: req.body.email })  // Comme findOne est une promesse, il va falloir gérer 2 cas
        // 1 : Réussite .then pour la réussite de la requête
        // 2 : et le catch s'il y a une erreur server
        // Dans le cas où la requête réussirait, on va récupérer l'enregistrement dans la base de données.
        // Vérifier si l'utilisateur a été trouver
        // 2 Vérifie le mot de passe transmis par le client correspond à l'email
        // Donc on passe le relais à user.
        .then((user) => {
            // Si l'utilisateur est nul donc n'existe pas dans la base de données
            if (user === null) {
                // On retourne une erreur 401 et un message attention garder le message flou 
                // Pour que personne ne vérifie si un utilisateur est crée chez nous ça voudrais dire qu'il y a une fuite de donnés 
                res.status(401).json({ message: 'Paire identifiant/mot de passe incorrecte' })
            }
            // Si l'utilisateur est existant on va comparer le mot de passe 
            else {
                //on utilise donc la méthode compare de bcrypt et on lui attribut le password envoyé par l'utilisateur et ce qui est stocké dans la base de donnés
                bcrypt.compare(req.body.password, user.password)// comme c'est une promesse on gère un then et un catch
                    // On va donc gérer le then ou on lui transmet la valeur a valid
                    .then(valid => {
                        // Si la requête est différente de la valeur qui nous a été retournée, c'est une erreur
                        if (!valid) {
                            // On retourne une erreur 401 et un message attention garder le message flou.
                            // Pour que personne ne vérifie si un utilisateur est créé chez nous, ça voudrait dire qu'il y a une fuite de donnés.
                            res.status(401).json({ message: 'Paire identifiant / mot de passe incorrecte ' })
                        }
                        // Si le mot de passe est correct
                        else {
                            //On retourne un code result.status(200) de validation 
                            /* Puis au format json on retourne un objet qui va contenir les informations nécessaires a l'authentification
                               Des requêtes qui seront émise par la suite par le client*/
                            res.status(200).json({
                                // Donc, dans notre objet, nous aurons besoin de définir.
                                // 1 l'userId qu'on va récupérer qui vas définir le client
                                // 2 Un token de sécurité qu'on va attribuer a cette userid qui est le client
                                // On récupère le userId
                                userId: user._id,
                                // Puis on va créer le token avec le module qu'on installer avant.
                                // token : variable qui importe le package puis on utilise ma méthode sign
                                token: jsonwebtoken.sign(
                                    { userId: user._id },
                                    'RANDOM_TOKEN_SECRET',
                                    { expiresIn: '24h' }
                                )
                            });

                        }

                    })
                    // On définit l'erreur en erreur server avec le code serveur 500
                    .catch((error) => {
                        // On utilise la console en identifiant bien catch 1 pour la différencier du catch 2 en dessous 
                        console.log('login : catch 1 ', error);
                        res.status(500).json('Une erreur s\'est produite');
                    });
            }
        })
        // On définit l'erreur en erreur server avec le code serveur 500
        .catch((error) => {
            // On utilise la console en identifiant bien catch 2 pour la différencier du catch 1 au-dessus.
            console.log('login : catch 2 ', error);
            res.status(500).json('Une erreur s\'est produite');
        });
};