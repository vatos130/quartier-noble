/**
 * Configuration Quartier Noble
 * Tout se gère ici : coordonnées, réseaux, modèles et textes du site.
 */
window.QUARTIER_NOBLE_CONFIG = {

  // ——— Contact (affichés en bas de page) ———
  contact: {
    companyName: "Quartier Noble",
    address: "Marseille, France",
    phone: "00000",
    email: "quartiernoble130@gmail.com",
    showAddress: true,
    showPhone: true,
    showEmail: true,
    // Pour recevoir les messages du formulaire par email : créez un formulaire sur https://formspree.io
    // (gratuit), indiquez quartiernoble130@gmail.com comme email de réception, puis collez ici l’URL
    // du formulaire (ex. "https://formspree.io/f/xxxxxx"). Laisser vide désactive l’envoi réel.
    formEndpoint: "https://formspree.io/f/xnjbbngk"
  },

  // ——— Connexion (page « Annonce ») ———
  // Les mots de passe sont en clair dans ce fichier : tout visiteur peut les voir dans le code source.
  // À utiliser comme accès simple pour un petit cercle, pas pour des données sensibles.
  auth: {
    users: [
      { username: "admin", password: "changeme" },
      { username: "invite", password: "invite2026" }
    ]
  },

  // Contenu de la page Annonce (après connexion réussie)
  annonce: {
    message: "Bienvenue sur l’espace réservé. Vous pouvez modifier ce texte dans config.js (clé annonce.message)."
  },

  // ——— Réseaux sociaux ———
  social: {
    instagram: "https://www.instagram.com/quartiernoble?igsh=cXJyb2x0NmV0dGlt&utm_source=qr",
    showInstagram: true
  },

  // ——— Modèles (nom, label sous la photo, liste de photos ; la 1re = image de la carte) ———
  models: [
    {
      name: "Harysson",
      label: "Homme",
      photos: [
        "model/Harysson/Harysson1.jpg",
        "model/Harysson/Harysson2.jpg",
        "model/Harysson/Harysson3.jpg"
      ]
    },
    {
      name: "Moha",
      label: "Homme",
      photos: [
        "model/Moha/Moha0.jpg",
        "model/Moha/Moha1.jpg"
      ]
    }
  ],

  // ——— Textes du site (locale) ———
  locale: {
    nav: {
      agence: "L'agence",
      modeles: "Nos modèles",
      services: "Services",
      contact: "Contact",
      connexion: "Connexion"
    },
    login: {
      title: "Connexion",
      user: "Identifiant",
      password: "Mot de passe",
      submit: "Valider",
      cancel: "Annuler",
      error: "Identifiant ou mot de passe incorrect."
    },
    annoncePage: {
      label: "Espace réservé",
      title: "Annonce",
      logout: "Déconnexion",
      back: "Retour au site"
    },
    hero: {
      tagline: "Agence de mannequins",
      title: "Quartier Noble",
      subtitle: "Représentation, casting et direction artistique",
      cta: "Découvrir nos modèles",
      scroll: "Scroll"
    },
    about: {
      label: "L'agence",
      title: "Une vision singulière du talent",
      lead: "Quartier Noble accompagne les mannequins dans tous les domaines : mode, beauté, publicité et cinéma. Nous construisons des carrières durables et représentons nos talents avec exigence et discrétion.",
      p2: "Basés à Marseille, nous travaillons avec les plus grandes maisons et les créateurs émergents, en France et à l'international."
    },
    models: {
      label: "Nos modèles",
      title: "Nos modèles",
      cta: "Pour consulter notre book complet ou proposer un profil, contactez-nous."
    },
    services: {
      label: "Services",
      title: "Ce que nous proposons",
      item1: "Représentation — Gestion de carrière et stratégie à long terme",
      item2: "Casting — Défilés, campagnes, éditoriaux, publicité",
      item3: "Direction artistique — Conseils et suivi pour chaque projet",
      item4: "International — Placements et partenariats à l'étranger"
    },
    contact: {
      label: "Contact",
      title: "Travaillons ensemble",
      formName: "Nom / Société",
      formEmail: "Email",
      formMessage: "Message",
      submit: "Envoyer"
    },
    footer: {
      logo: "Quartier Noble",
      legal: "© 2025 Quartier Noble. Tous droits réservés."
    }
  }
};
