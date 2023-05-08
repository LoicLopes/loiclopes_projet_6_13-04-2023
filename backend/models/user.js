// Récupère le modules mongoose
const mongoose = require ('mongoose');
// Variale qui récupère le modules mongoose unique validator 
// Qui sert à vérifier qu'une seul adresse mail "UNIQUE" soit utilisé
const uniqueValidator = require ('mongoose-unique-validator');

// Crée le Schéma utilisateur 
const userSchema = mongoose.Schema ({
    email : { type : String, required: true, unique: true},
    password: { type : String, required: true}
})
// Userschema utilise un plugin on lui transmet le modules unique validator que on a importé 
userSchema.plugin(uniqueValidator);
// Export le module :   
module.exports= mongoose.model('User', userSchema);