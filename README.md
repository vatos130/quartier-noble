# Quartier Noble — Site de l'agence

Site vitrine pour l’agence de mannequins **Quartier Noble**.

## Contenu du site

- **Accueil** : hero avec nom de l’agence et appel à l’action
- **L’agence** : présentation et philosophie
- **Mannequins** : grille de cartes (à remplacer par vos photos et noms)
- **Services** : représentation, casting, direction artistique, international
- **Contact** : coordonnées et formulaire

## Lancer le site en local

1. Ouvrez le dossier `QuartierNoble` dans votre éditeur.
2. Double-cliquez sur `index.html` pour l’ouvrir dans le navigateur,  
   **ou** lancez un petit serveur local (recommandé pour éviter certains blocages de chargement) :

   - Avec **Node.js** : `npx serve .` puis ouvrez l’URL indiquée (souvent http://localhost:3000).
   - Avec **Python** : `python -m http.server 8000` puis allez sur http://localhost:8000.

## Personnalisation

- **Coordonnées et réseaux** : modifiez uniquement `config.js` (adresse, téléphone, email, Instagram). Utilisez `showAddress: false`, `showInstagram: false`, etc. pour masquer un bloc. À l'hébergement, éditez ce fichier sans toucher au HTML.
- **Textes** : modifiez directement `index.html` (noms des mannequins, descriptions).
- **Couleurs / polices** : variables en haut de `styles.css` (`:root`).
- **Images** : remplacez les blocs `.model-image` et `.about-frame` par des balises `<img src="...">` avec vos visuels.
- **Formulaire** : le bouton “Envoyer” affiche pour l’instant un message de confirmation. Pour enregistrer les messages, branchez le formulaire sur un backend (PHP, Node, formulaire type Formspree/Netlify Forms, etc.).

## Fichiers

| Fichier       | Rôle                                                |
|---------------|-----------------------------------------------------|
| `config.js`   | Coordonnées et réseaux (à modifier pour l'hébergement) |
| `index.html`  | Structure et contenu du site                        |
| `styles.css`  | Mise en page et design                              |
| `script.js`   | Menu mobile, header, formulaire, application config |
| `README.md`   | Ce fichier                                          |

Bon lancement pour Quartier Noble.
