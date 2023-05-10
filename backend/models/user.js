// Pour créer un model user pour la base de donné on vas avoir besoin :
// 1 : Un modules spécial de mongoose que on vas devoir installer avec la commande = npm install mongoose-unique-validator
// Pour vérifier que l'adress email utiliser soit bien unique 
// 2: on vas utiliser la methode Schema de mongoose pour creer notre schema d'utilisateur a stocker dans la base de données
// 3: on vas utiliser la methode model de mongoose pour pouvoir utiliser notre schema comme model

//  On récupère le modules mongoose
const mongoose = require ('mongoose');

// Variale qui récupère le modules mongoose unique validator que on a installé
const uniqueValidator = require ('mongoose-unique-validator');

// variable userSchema puis on utilise la methode mongoose.Schema  
const userSchema = mongoose.Schema ({
    // On définit notre email (type : String , champ requie: vrai , unique: vrai)
    email : { type : String, required: true, unique: true},
    // On définit notre password (type : String , champ requie: vrai)
    password: { type : String, required: true}
})

// Userschema utilise un plugin on lui transmet le modules unique validator que on a importé 
// Pour vérifier que l'émail est bien unique grace au plugin
userSchema.plugin(uniqueValidator);

// Vu que on peut pas encore utiliser le schema comme model on vas l'exporter en tant que model 
// 1 Export le module : module.exports
// 2 Utilise la methode model de mongoose = mongoose.model
// 3 On définit le nom du model = User
// 4 On attribut le schema qu'on veut modéliser et exporter = userSchema 
module.exports= mongoose.model('User', userSchema);