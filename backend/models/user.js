/* Pour créer un modèle user pour la base de données, on va avoir besoin :
1: Un module spécial de mongoose qu'on va devoir installer avec la commande = npm install mongoose-unique-validator
   pour vérifier que l'adresse email utiliser soit bien unique
2: On va utiliser la méthode Schéma de mongoose pour créer notre schéma d'utilisateur a stocker dans la base de données.
3: On va utiliser la méthode modèle de mongoose pour pouvoir utiliser notre schéma comme modèle  */

//On récupère le module mongoose
const mongoose = require ('mongoose');

//Variable qui récupère le module mongoose unique validator qu'on a installé
const uniqueValidator = require ('mongoose-unique-validator');

//Variable userSchema puis on utilise la methode mongoose.Schema  
const userSchema = mongoose.Schema ({
    // On définit notre email (type : String , champ requie: vrai , unique: vrai)
    email : { type : String, required: true, unique: true},
    // On définit notre password (type : String , champ requie: vrai)
    password: { type : String, required: true}
})

//Userschema utilise un plugin on lui transmet le module unique validator qu'on a importé 
//Pour vérifier que l'émail est bien unique grâce au plugin
userSchema.plugin(uniqueValidator);

// Vu qu'on ne peut pas encore utiliser le schéma comme modèle on va l'exporter en tant que modèle
// 1 Export le module : module.exports
// 2 Utilise la méthode modèles de mongoose = mongoose.model
// 3 On définit le nom du modèles = User
// 4 On attribut le schéma qu'on veut modéliser et exporter = userSchema 
module.exports= mongoose.model('User', userSchema);