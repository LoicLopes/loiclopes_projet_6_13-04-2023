/* Dans cette partie, nous allons implémenter des téléchargements de fichiers
pour que les utilisateurs puissent télécharger des images d'articles à vendre. 
Pour ce faire, nous utiliserons multer , un package qui nous permet de gérer 
les fichiers entrants dans les requêtes HTTP. 
Commençons par installer multer avec npm install multer 
et par créer un élément de middleware pour gérer ces fichiers entrants.*/ 

// On récupère multer
const multer = require('multer');

// On crée un dictionnaire sous forme d'objet. 
const MIME_TYPES = {
    // On va traduire image/jpg en jpg
    'image/jpg': 'jpg',
    // On va traduire image/jpeg en jpg
    'image/jpeg': 'jpg',
    // On va traduire image/png en jpg
    'image/png': 'png',
}
//On va créer un objet de configuration pour multer
//On va l'appeler storage
//On va utiliser la méthode diskStorage de multer qui vas enregistrer le fichier sur le disque
const storage = multer.diskStorage({
    // Cette méthode de multer prend 2 arguments
    // 1 la destination qui sera une fonction qui explique a multer dans quel fichier enregistrer les fichier
    // Destination s'agit d'une fonction qui prend 3 arguments (req, file , callback) on utilise donc une fonction fléchée.
    destination: (req, file, callback) =>{
        // Dans destination on appeler directement le callback
        // On place en premier argument null pour dire qu'il n'y a pas eu d'erreur
        // Puis on lui attribut le nom du dossier 'images'
        callback(null, 'images')
    },
    /* 2 filename qui vas expliquer a multer quel nom de fichier utilise, car on ne peut pas utiliser le fichier d'origine,
    car il peut y avoir des problèmes si 2 fichiers on le même nom.*/
    // On a donc une fonction (req , fichier et callback) suivie d'une fonction fléchée
    filename:(req, file, callback) => {
        // On va générer le nouveau nom du fichier.
        // On va définir le nom dans une variable name puis on utilise la méthode originalname de file
        // Dans certains fichiers, on peut avoir des espace dans un nom de fichier ça peut poser problème coté server
        // Donc on va split autour des espaces (' ')
        // Puis on  .join ('_') des underscore
        const name = file.originalname.split(' ').join('_');
        // Maintenant, on doit appliquer une extension au fichier envoyé.
        // Pour cela, on va utiliser notre dictionnaire qui gère les mime_types = MIME_TYPES
        // Puis on lui attribut le mimetype du fichier qui a été envoyer par le client
        const extension = MIME_TYPES[file.mimetype];
        // Maintenant, on a ont notre nom du fichier et notre extension, on va appeler le callback
        // Donc on appelle le callback
        // On lui attribut null pour dire qu'il n y a pas d'erreur
        // On lui attribut le nom du fichier avec la variable
        // Auquel on vas lui rajouter un timestemp pour le rendre le plus unique possible en ajoutant Date.now
        // On ajoute un point.
        // Puis l'extension du fichier
        callback(null, name + Date.now() + '.' + extension);      
    }
});
// Maintenant, on exporte notre élément multer configurer.
// Donc on exporte le module.
// Appelle la méthode multer
// On lui attribut notre objet crée storage
// On apelle la méthode single pour dire qu'il s'agit d'un fichier unique et pas un groupe de fichier
// Et on explique a multer qu'il s'agit de fichier ('image") uniquement.
module.exports = multer({ storage }).single('image');



