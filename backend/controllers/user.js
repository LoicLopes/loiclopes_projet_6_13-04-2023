// Maintenant on vas passer notre model creer preablement dans le dossier models et le fichier user 
// On vas donc mettre des sécurités en utilisant deux modules spécifique
// 1 bcrypt : Qui vas nous permettre de hacher notre mot de passe on l'install avec la commande = npm install bcrypt
// 2 jsonwebtoken : Qui vas nous permettre de creer un token quand un utilisateur se connect il recoit un token encoder
//                  Ce qui vas permettre au serveur de verifier les requetes lier par un token pour plus de sécurité
// Une fois les modules installer 

// On récupère le module bcrypt
const bcrypt = require ('bcrypt');
// on récupère le module jsonwebtoken
const jsonwebtoken = require ('jsonwebtoken');
// On récupère notre model schema d'utilisateur 
const User = require ('../models/user');



// Dans cette parti on a besoin de creer un fonction qui vas nous permettre de creer un espace utilisateur sécurisé
// 1 Creer une fonction
// 2 Utilise le module de criptage de mot de pass
// 3 Se servir du schema user importer
// 4 Faire un retour sauvegarde
// 5 Faire un retour erreur  

// Maintenant on vas creer une fonction pour créer un utilisateur a l'aide de la fonction signup 
// suivi d'un middleware (req,res,next) et une fonction fleché
exports.signup = (req, res, next)=>{
    // On utilise le module bcrypt avec sa fonction hash pour hacher le mot de passe en "*"
    // puis on lui dit d'allez requeter le body et de récuperer le password 
    // puis on lui attribut le nombre de faut que on utilise l'algorythme de hachage  
    bcrypt.hash(req.body.password, 10)
        // Ensuite apres avoir recupérer le mot de passe hacher
        .then(hash =>{
            // On vas creer un nouvelle utilisateur avec une variable user
            // On utilise le constructeur new puis un lui attribut le modele schema 
            const user = new User({
                // Dans email : on requeter le body et de récuperer l'email
                email : req.body.email,
                // Dans password : on lui attribut le password hash que on a recuperer plus tot dans la fonction 
                password : hash
            });
    // Une fois le nouvelle utilisateur creer on vas devoir le sauvegarder dans la base de données
    // Donc on utilise la fonction save() sur le nouvelle utilisateur user
        user.save()
            // Si c'est sauvegarder on renvoie un statue 201 qui veut dire creation de ressource puis un message json pour dire que l'utilisateur est bien créé
            .then(()=> res.status(201).json({ message:'Utilisateur créé !'}))
            // Si sa bloque on renvoie l'erreur sous resultat statut 400 puis en json sous forme d'objet
            .catch((error) => {
                console.log('signup : catch 1 ',error);
                res.status(400).json( 'Une erreur s\'est produite' );
            }
                );
        })
        // Si sa bloque on renvoie l'erreur sous resultat statut 403 pour la différencier du 400 puis en json sous forme d'objet ;
        .catch((error) => {
            console.log('signup : catch 2 ',error);
            res.status(400).json( 'Une erreur s\'est produite' );
        }
            );
};

/* On vas maintenant créer une fonction login qui vas nous permettre de verifier si un utilisateur existe dans notre 
base de données et si le mot de passe transmit par le client correspond a cette utilisateur*/
// 1 Communiquer avec la base de donnés avec son nom de cle quel stock donc = User
// 2 Lui transmettre l'email saisi par l'utilisateur pour voir si elle existe dans la base de donnée
// Puis on vas créer une fonction pour connecter un utilisateur a l'aide de la fonction login suivi d'un middleware et une fonction fléché
exports.login = (req, res, next)=> {
    //On vas donc utilise a methode findOne qui veut dire "trouver un" de notre class User puis nous lui passons un objet qui vas servir de filtre 
    // Avec un champ email : et la valeur qui nous a etait transmise par le client dans le body
    User.findOne({email: req.body.email})// Comme findOne est une promesse il vas faloir gerer 2 cas 
    // 1 : Reussite  .then pour la reusite de la requete
    // 2 : et le catch si y'a une erreur server 
    // Dans le cas ou la requete reussi on vas recupere l'enregistrement dans la base de données
    // verifier si l'utilisateur a ete trouver 
    // 2 Verifie le mot de passe transmis par le client correspond a l'email
    // Donc on passe le relais a user 
    .then((user) => {
        // Si utilisateur est nul donc n'existe pas dans la base de donné
        if (user === null){
            // On retourne une erreur 401 et un message attention garder le message flou 
            //pour que personne vérifie si un utilisateur est creer chez nous sa voudrais dire que il y une fuite de donnés 
            res.status(401).json({message : 'Paire identifiant/mot de passe incorrecte'})
        }
        // Si l'utilisateur est existant on vas comparer le mot de passe 
        else{
            //on utilise donc la méthode compare de bcrypt et on lui attribut le password envoyer par l'utilisateur et ce qui est stocké dans la base de donnés
            bcrypt.compare(req.body.password , user.password)// comme c'est un promesse on gere un then et un catch
            // On vas donc gerer le then ou on lui transmet la valeur a valid
            .then(valid=>{
                // Si la requete est différent de valeur qui nous a etait retourner c'est une erreur
                if(!valid){
                    // On retourne une erreur 401 et un message attention garder le message flou 
                    //pour que personne vérifie si un utilisateur est creer chez nous sa voudrais dire que il y une fuite de donnés
                    res.status(401).json({message : 'Paire identifiant / mot de passe incorrecte '})
                }
                // Si le mot de passe est correcte
                else{
                    //On retourne un code 200 
                    //puis on retourne un objet qui vas contenir les informations les informations necessaire a 
                    //l'authentification des requetes qui seront emise par la suite par le client
                    res.status(200).json({
                        // Donc dans notre objet nous auront 
                        // Le user ID
                        userId: user.id,
                        // Puis on lui attribut un token 
                        // 
                        token: jsonwebtoken.sign(
                            {userId: user._id},
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h'}
                            )
                    });

                }

            })
            // On définit l'erreur en erreur server avec le code serveur 500
            .catch((error) => {
                console.log('login : catch 1 ',error);
                res.status(500).json( 'Une erreur s\'est produite' );
            }
                );
        }
    })
    // On définit l'erreur en erreur server avec le code serveur 500
    .catch((error) => {
        console.log('login : catch 2 ',error);
        res.status(500).json( 'Une erreur s\'est produite' );
    }
        );
};
















/*

const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken');
const User = require('../models/user');

exports.signup = (req, res, next) =>{
    bcrypt.hash(req.body.password, 10)
    .then(hash =>{
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save()
            .then(()=> res.status(201).json({message: 'Utilisateur Crée ! '}))
            .catch(error => res.status(400).json({ error }));

        
    })
    .catch(error => res.status(500).json({ error }))
};

exports.login = (req, res, next) => {
    User.findOne({email: req.body.email})
    .then(user=>{
        if(user===null){
            res.status(401).json({message: 'Paire indentifiant/mot de passe incorrecte'});
        } else {
            bcrypt.compare(req.body.password, user.password)
            .then(valid =>{
                if(!valid){
                    res.status(401).json({message: 'Paire indentifiant/mot de passe incorrecte'})
                }else{
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            {userId: user._id},
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h'}
                        )
                    });
                }
            })
            .catch(error => res.status(500).json({ error }));
        }
    })
    .catch(error =>res.status(500).json({ error }));
};
*/