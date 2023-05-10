// Maintenant on vas passer notre model creer preablement dans le dossier models et le fichier user 
// On vas donc mettre des sécurités en utilisant deux modules spécifique
// 1 bcrypt : Qui vas nous permettre de hacher notre mot de passe on l'install avec la commande = npm install bcrypt
// 2 jsonwebtoken : Qui vas nous permettre de creer un token 
// Une fois les modules installer 

// On récupère le module bcrypt
const bcrypt = require ('bcrypt');
// on récupère le module jsonwebtoken
const jsonwebtoken = require ('jsonwebtoken');
// On récupère notre model schema d'utilisateur 
const User = require ('../models/user');



















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