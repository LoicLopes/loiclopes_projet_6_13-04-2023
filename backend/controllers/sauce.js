//Maintenant on vas utiliser notre model creer preablement dans le dossier models (le fichier sauces)   


// Variable Sauce qui récupère dans le dossier models le fichier sauce qui contient notre schéma model
const Sauce = require('../models/sauce');
/* Variable fs qui récupère fs  signifie « file system » (soit « système de fichiers », en français). Il nous donne accès aux fonctions qui nous 
permettent de modifier le système de fichiers, y compris aux fonctions permettant de supprimer les fichiers.*/
const fs = require("fs");

// Comme c'est un espace de gestion de données d'article, on va créer plusieurs espaces :
// 1 L'espace getAllSauces qui va servir a récupérer toutes les sauces (tous les articles)
// 2 L'espace get OneSauce qui va servir a récupérer une seul sauce (un article)
// 3 L'espace createSauce qui va servir a créer une sauce  ( un article)
// 4 L'espace modifySauce qui va servir a modifier une sauce ( un article)
// 5 L'espace deleteSauce qui va servir a supprimer une sauce (un article)
// 6 L'espace likeSauce qui va servir a ajouter un like ou en supprimer un d'une sauce (un article)




/* Maintenant, on va créer une fonction pour récupérer les sauces à l'aide de la fonction getAllSauces
suivi d'un middleware (req,res,next) et une fonction fléchée */
exports.getAllSauces = (req, res, next) => {
  // On récupère tout les sauces avec la propriété find
  Sauce.find() // Comme c'est une promesse elle retourne 2 argument un then et un catch 
    // Si c'est récupéré, on renvoie un statue 200 puis au format json on retourne les sauces
    .then((sauces) => res.status(200).json(sauces))
    // Si sa bloque ont renvoie l'erreur sous résultat statut 400 puis en json sous forme d'objet
    .catch((error) => res.status(400).json({ error }));
};




/* Maintenant, on va créer une fonction pour récupérer une seul sauce à l'aide de la fonction getOnesauce
suivi d'un middleware (req,res,next) et une fonction fléchée */
exports.getOneSauce = (req, res, next) => {
  // On récupère une seule sauce avec la propriété findOne et a ce findOne on lui attribut un objet de comparaison donc
  // On dit _id : sois le même que le paramètre de requête id dans sont url pour définir que c'est bien l'objet que l'on souhaite
  Sauce.findOne({ _id: req.params.id }) // Comme c'est une promesse elle retourne 2 argument un then et un catch
    // Si c'est récupéré, on renvoie un statue 200 puis au format json on retourne la sauce
    .then((sauce) => res.status(200).json(sauce))
    // Si sa bloque ont renvoie l'erreur sous résultat statut 400 puis en json sous forme d'objet
    .catch((error) => res.status(400).json({ error }));
};



/* Maintenant, on va créer une fonction pour créer une sauce à l'aide de la fonction createSauce
suivi d'un middleware (req,res,next) et une fonction fléchée */
exports.createSauce = (req, res, next) => {
  // On commence par créer une variable sauceObject qui vas convertir le corps de requête body du frontend en format json avec JSON.parse
  const sauceObject = JSON.parse(req.body.sauce);
  // On supprime l'id par défaut de l'objet du corps de la requête, car l'id envoyé par le frontend ne sera pas le bon (il faut celui de la base de donnée)
  delete sauceObject._id;
  // On supprime l'userId par défaut de l'objet du corps de la requête, car l'id envoyé par le frontend ne sera pas le bon (il faut celui de la base de donnée)
  delete sauceObject._userId;
  // Variable sauce qui va utiliser le constructeur new et le model importé Sauce
  const sauce = new Sauce({
    // ... opérateur spred qui est un raccoursi javaScript
    // Puis on récupère les informations du front-end grâce a la variable sauceObject qui contient (req.body.sauce) déjà parser
    ...sauceObject,
    // comme on a supprimer l'userId par défaut on initialise l'userId en le requetant avec le token de sécurité
    userId: req.auth.userId,
    // On initialise le chemin de l'url images 
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    // On initialise les likes à 0 vu qu'ils ne sont pas dans la req du frontend au moment de la création de la sauce
    likes: 0,
    // On initialise les dislikes à 0 vu qu'ils ne sont pas dans la req du frontend au moment de la création de la sauce
    dislikes: 0,
    // On initialise les usersLiked dans un tableau vide vu qu'ils ne sont pas dans la req du frontend au moment de la création de la sauce
    usersLiked: [],
    // On initialise les usersDisliked vu qu'ils ne sont pas dans la req du frontend au moment de la création de la sauce
    usersDisliked: [],
  });
  // Maintenant que l'objet est creer on le sauvegarde avec la méthode save()
  sauce.save()// Comme c'est une promesse elle retourne 2 argument un then et un catch
    // Si c'est sauvegardé , on renvoie un statue 200 puis au format json on retourne un message sauce Créee
    .then(() => res.status(201).json({ message: "Sauce créée !" }))
    // Si sa bloque ont renvoie l'erreur sous résultat statut 400 puis en json sous forme d'objet
    .catch((error) => res.status(400).json({ error }));
};





/* Maintenant, on va créer une fonction pour modifier une sauce à l'aide de la fonction modifySauce
suivi d'un middleware (req,res,next) et une fonction fléchée */
exports.modifySauce = (req, res, next) => {
  // on commance par l'extraction de l'objet on regarde si il y a un champ file avec req.file? dans notre objet requête
  const sauceObject = req.file ? {
    // si c'est le cas on récupere l'objet en parsant la chaine de caractere du corps de la requete body 
    ...JSON.parse(req.body.sauce),
    // Et on recréer le lien de l'image 
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    // Si il n'y a pas d'objet transmit on récuperer l'objet directement dans le corps de la requete
  } : { ...req.body };
  // Maintenant on supprime l'userId pour eviter que quelqun cree un objet a son nom et le modify pour lassigneer a quelqun d'autre il s'agit d'une mesure de sécurité
  delete sauceObject._userId;
  // maintenant il faut recuperer l'objet dans notre base de donnée
  // On récupère une seule sauce avec la propriété findOne et a ce findOne on lui attribut un objet de comparaison donc
  // On dit _id : sois le même que le paramètre de requête id dans sont url pour définir que c'est bien l'objet que l'on souhaite
  Sauce.findOne({ _id: req.params.id }) // Comme c'est une promesse elle retourne 2 argument un then et un catch
    // on récupere notre objet
    .then((sauce) => {
      // on vérifie qu'il appartient bien a l'utilisateur qui nous envoie la requete de modification 
      // si le champ userId de se que on récupere en base est différent de notre userId de notre token 
      // cela veut dire que quelqu'un d'autre essaye de modifier l'objet
      if (sauce.userId != req.params.id) {
        // Donc on retourne une erreur 401 et un message au format json
        res.status(401).json({ message: 'Non-autorisé' });
      }


      /*
      if (req.file) {
        const filename = sauce.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => { });
      }*/


      // Maintenant dans l'autre cas c'est que c'est le bon utilisateur 
      else {
        // On vas mettre a jour notre enregistrement avec la methode updateOne
        // On lui attribut 2 filtre   1 : qu'elle est l'objet a mettre a jour ?  /       2 : avec qu'elle objet ? 
        // id_ : req.paramas.id  vas définir l'id de l'objet a mettre a jour 
        // ...sauceObjet récupere l'objet et sont _id qui vient des parametre de l'url
        Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id }) // Comme c'est une promesse elle retourne 2 argument un then et un catch
          // Si c'est modifié , on renvoie un statue 200 puis au format json on retourne un message sauce modifiée
          .then(() => res.status(200).json({ message: "Sauce modifiée !" }))
          // Donc on retourne une erreur 401 et un message au format json
          .catch((error) => res.status(401).json({ error }));

      }
    })
    // Si sa bloque 
    .catch((error) => {
      // On renvoie l'erreur sous résultat statut 500 (code server) puis en json sous forme d'objet
      res.status(500).json({ error });
    });
};
/* Maintenant, on va créer une fonction pour supprimer une sauce à l'aide de la fonction deleteSauce
suivi d'un middleware (req,res,next) et une fonction fléchée */
exports.deleteSauce = (req, res, next) => {
  // maintenant il faut recuperer l'objet dans notre base de donnée
  // On récupère une seule sauce avec la propriété findOne et a ce findOne on lui attribut un objet de comparaison donc
  // On dit _id : sois le même que le paramètre de requête id dans sont url pour définir que c'est bien l'objet que l'on souhaite
  Sauce.findOne({ _id: req.params.id })// Comme c'est une promesse elle retourne 2 argument un then et un catch
    // On récupère notre objet
    .then((sauce) => {
      // on vérifie qu'il appartient bien a l'utilisateur qui nous envoie la requete de suppression 
      // si le champ userId de se qu'on récupere en base est différent de notre userId de notre token 
      // cela veut dire que quelqu'un d'autre essaye de supprimer l'objet
      if (sauce.userId != req.params.id) {
        // Donc on retourne une erreur 401 et un message au format json
        res.status(401).json({ message: 'Non-autorisé' });
      }else {
        /* On va supprimer l'objet de la base de données ainsie que sont image pour ce faire 
         on vas récuperer l'url qui est enregistré et Recrée le chemin sur notre systeme de fichier a partir de celle ci*/


        // On récupere le nom de fichier grace a un split autour du repertoir image ccar on sait que l'image est dans ce dossier et que le nom de fichier sera juste aprés 
        // [1] définit la deuxieme position donc le nom du fichier image
        const filename = sauce.imageUrl.split("/images/")[1];
        // Maintenant on peut faire la suppression pour cela on vas  utilisé la methode unlink de fs qu'on a importer 
        // On définit notre chemin images/
        // On définit notre nom de fichier variable ${filename}
        // Et ensuite on doit gerer le callback c'est a dire crée une méthode qui vas etre appeler une fois que la suppression aura eu lieu 
        // Donc fonction fléchée
        fs.unlink(`images/${filename}`, () => {
          // maintenant il faut supprimer l'objet dans notre base de donnée
          // On récupère une supprime une seul sauce avec la propriété deleteOne et a ce deleteOne on lui attribut un objet de comparaison donc
          // On dit _id : sois le même que le paramètre de requête id dans sont url pour définir que c'est bien l'objet que l'on souhaite
          Sauce.deleteOne({ _id: req.params.id })
            // Si l'objet est bien supprimer on envoie un res.status (200)
            // Et un message json que c'est bien supprimé
            .then(() => res.status(200).json({ message: "Sauce supprimée !" }))
            // On renvoie l'erreur sous résultat statut 400  puis en json sous forme d'objet
            .catch((error) => res.status(400).json({ error }));
        });
      } 
    })
    // Si sa bloque
    .catch((error) => {
      // On renvoie l'erreur sous résultat statut 500 (code server) puis en json sous forme d'objet
      res.status(500).json({ error });
    });
};






/* Maintenant, on va créer une fonction pour like ou dislike une sauce à l'aide de la fonction likeSauce
suivi d'un middleware (req,res,next) et une fonction fléchée */
exports.likeSauce = (req, res, next) => {
  // On récupère la valeur dans une variable like avec une requete sur le body et du like
  const like = req.body.like;
  // On vas avoir besoin de gerer plusieur evenement 
  // Like +1 si on veut like le produit
  // Like -1 si on veut enlever notre like du produit
  // Dislike 1 Si on veut dislike le produit
  // Dislike -1 Si on veut enlever notre dislike du produit 
  // Pour ce faire on vas utiliser une boucle Switch qui pêut gerer plusieur opération 
  // On attribut a se switch notre variable qui détient notre valeur recueilli au niveau du front-end 
  switch (like) {
    // Premiere opération on ajoute 1 au like donc 
      case 1:
        // On utilise la méthode updateOne pour modifier un élément de la  Sauce
          Sauce.updateOne(
            // On définit l'id du produit pour que ce soit bien le bon produit qui soit selectionné
              { _id: req.params.id },
              // Puis on $push dans notre tableau userLiked : l'userId de la personne qui like pour savoir qui a liké
              // Et $inc on insert la valeur likes : que l'on définit sur 1 
              { $push: { usersLiked: req.body.userId }, $inc: { likes: 1 } }
          ) // Comme c'est une promesse on retourne un then et un catch 
               // Pour le then un res.status(200) et un message json que la sauce est bien likée
              .then(() => res.status(200).json({ message: "Sauce likée" }))
              // On renvoie l'erreur sous résultat statut 400 puis en json sous forme d'objet
              .catch((error) => res.status(400).json({ error }));
            // Un break pour mettre fin a la boucle si on utilise cette fonction 
          break;
      // deuxieme opération on ajoute -1 au dislike donc 
      case -1: 
      // On utilise la méthode updateOne pour modifier un élément de la  Sauce
          Sauce.updateOne(
            // On définit l'id du produit pour que ce soit bien le bon produit qui soit selectionné
              { _id: req.params.id },
              {
                // Puis on $push dans notre tableau userLiked : l'userId de la personne qui dislike pour savoir qui a disliké
                  $push: { usersDisliked: req.body.userId },
                // Et $inc on insert la valeur likes : que l'on définit sur 1 
                  $inc: { dislikes: 1 },
              }
          )
              // Pour le then un res.status(200) et un message json que la sauce est bien dislikée
              .then(() => res.status(200).json({ message: "Sauce dislikée" }))
              // On renvoie l'erreur sous résultat statut 400 puis en json sous forme d'objet
              .catch((error) => res.status(400).json({ error }));
              // Un break pour mettre fin a la boucle si on utilise cette fonction 
          break;
          // Troisieme opération on redéfini la valeur a  0 du like ou dislike 
      case 0: 
          // On récupere l'element sauce avec la méthode findOne On définit l'id du produit pour que ce soit bien le bon produit qui soit selectionné
          Sauce.findOne({ _id: req.params.id })
               // Un fois la sauce récuperer 
              .then((sauce) => {
                // Si la sauce like par l'user on inclu l'id de l'userId pour vérifier le like correspond bien a user qui a like la sauce et pas quelqun d'autre
                  if (sauce.usersLiked.includes(req.body.userId)) {
                    // On utilise la méthode updateOne pour modifier un élément de la  Sauce
                      Sauce.updateOne(
                        // On définit l'id du produit pour que ce soit bien le bon produit qui soit selectionné
                          { _id: req.params.id },
                          {
                            // Puis on $push dans notre tableau userLiked : l'userId de la personne qui like pour savoir qui a liké
                              $pull: { usersLiked: req.body.userId },
                            // Et $inc on insert la valeur likes : que l'on définit sur -1 pour supprimer le like qui exister déja
                              $inc: { likes: -1 },
                          }
                      )
                      // Pour le then un res.status(200) et un message json que le like sur la sauce est bien supprimé
                          .then(() => res.status(200).json({ message: "Like supprimé" }))
                          // On renvoie l'erreur sous résultat statut 400 puis en json sous forme d'objet
                          .catch((error) => res.status(400).json({ error }));
                  // Si la sauce dislike par l'user on inclu l'id de l'userId pour vérifier le like correspond bien a user qui a dislike la sauce et pas quelqun d'autre
                  } else if (sauce.usersDisliked.includes(req.body.userId)) {
                    // On utilise la méthode updateOne pour modifier un élément de la  Sauce
                      Sauce.updateOne(
                        // On définit l'id du produit pour que ce soit bien le bon produit qui soit selectionné
                          { _id: req.params.id },
                          {
                            // Puis on $push dans notre tableau userLiked : l'userId de la personne qui dislike pour savoir qui a disliké
                              $pull: { usersDisliked: req.body.userId },
                            // Et $inc on insert la valeur likes : que l'on définit sur -1 pour supprimer le dislike qui exister déja
                              $inc: { dislikes: -1 },
                          }
                      )
                      // Pour le then un res.status(200) et un message json que le dislike sur la sauce est bien supprimé
                          .then(() => res.status(200).json({ message: "Dislike supprimé" }))
                          // On renvoie l'erreur sous résultat statut 400 puis en json sous forme d'objet
                          .catch((error) => res.status(400).json({ error }));
                  }
              })
              // On renvoie l'erreur sous résultat statut 500 (code server) puis en json sous forme d'objet
              .catch((error) => {
                  res.status(500).json({ error });
              });
              // Un break pour mettre fin a la boucle si on utilise l'une de ces 2 fonction 
          break;
      default:
        // Si la boucle Switch ne fonctionne pas 
        // On renvoie l'erreur sous résultat statut 500 (code server) puis en json sous forme d'objet 
          res.status(500).json({ error });
  }
};



