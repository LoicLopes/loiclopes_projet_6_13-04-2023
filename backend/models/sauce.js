// Pour créer un modèle sauce pour la base de données, on va avoir besoin :
// 1: On va utiliser la méthode Schema de mongoose pour créer notre schéma de sauces a stocker dans la base de données.
// 2: On va utiliser la méthode model de mongoose pour pouvoir utiliser notre schéma comme modèle

//  On récupère le modules mongoose
const mongoose = require ('mongoose');

// On va devoir créer un schéma pour le modèle de sauces qui est fourni dans le rapport technique.
// Variable sauceSchema puis on utilise la méthode mongoose.Schema
const sauceSchema = mongoose.Schema({

    // Rapport technique (userId : String — l'identifiant MongoDB unique de l'utilisateur qui a créé la sauce)
    // On définit notre userId (type : String , unique: vrai)
    userId: { type: String, required: true},

    // Rapport technique (name : String — nom de la sauce)
    // On définit notre name (type : String , champ requie: vrai)
    name: { type: String, required: true},

    // Rapport technique:(manufacturer : String — fabricant de la sauce)
    // On définit notre manufacturer (type : String , champ requie: vrai)
    manufacturer: { type: String, required: true},

    // Rapport technique:(description : String — description de la sauce)
    // On définit notre description (type : String , champ requie: vrai)
    description: { type: String, required: true},

    // Rapport technique:(mainPepper : String — le principal ingrédient épicé de la sauce)
    // On définit notre mainPepper (type : String , champ requie: vrai)
    mainPepper: { type: String, required: true},

    // Rapport technique:(imageUrl : String — l'URL de l'image de la sauce téléchargée par l'utilisateur)
    // On définit notre imageUrl (type : String , champ requie: vrai)
    imageUrl: { type: String, required: true},

    // Rapport technique:(heat : Number — nombre entre 1 et 10 décrivant la sauce)
    // On définit notre heat (type : String , champ requie: vrai)
    heat: { type: Number, required: true},

    // Rapport technique:(: Number — nombre d'utilisateurs qui aiment (= likent) la sauce)
    // On définit notre likes (type : String , champ requie: vrai)
    likes: { type: Number, required: true},

    // Rapport technique:(Number — nombre d'utilisateurs qui n'aiment pas (= dislike) la sauce)
    // On définit notre dislikes (type : String , champ requie: vrai)
    dislikes: { type: Number, required: true},

    // Rapport technique:(usersLiked : [ "String <userId>" ] — tableau des identifiants des utilisateur
    //                    qui ont aimé (= liked) la sauce)
    // On définit notre usersLiked [String] mais dans un tableau
    usersLiked: [String],

    // Rapport technique:([ "String <userId>" ] — tableau des identifiants des
    //           utilisateurs qui n'ont pas aimé (= disliked) la sauce)
    // On définit notre usersDisliked [String] mais dans un tableau
    usersDisliked: [String]
});


// Export du module mongoose 
module.exports = mongoose.model('Sauce', sauceSchema);

