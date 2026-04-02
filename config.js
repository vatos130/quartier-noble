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
    showPhone: false,
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
      { username: "mapess", password: "kaaris" },
      { username: "ben", password: "1230" },
      { username: "bousky", password: "bousky13" },
      { username: "yousra", password: "laboss13" }
    ]
  },

  // Espace privé mannequins : chaque objet = une catégorie distincte (Messages, Règlement, etc.)
  espacePrive: {
    intro:
      "Bienvenue dans votre espace Quartier Noble. Retrouvez ici vos messages, le règlement et votre shooting.",
    sections: [
      {
        title: "Messages",
        text: "Écrivez ci-dessous : votre message est envoyé à l’agence par email (identifiant de connexion inclus pour la réponse).",
        chat: true
      },
      {
        title: "Règlement",
        text: `Règlement intérieur — Quartier Noble (espace modèles)

1. Objet
Le présent règlement fixe les règles de fonctionnement, de présentation et de relation entre les talents représentés et l’agence Quartier Noble. Il complète les contrats ou mandats de représentation signés avec l’agence.

2. Représentation et mandat
Les modalités d’exclusivité, de territoire et de commissions sont celles prévues par votre contrat ou lettre de mission. Toute proposition de job, casting ou collaboration doit transiter par l’agence, sauf accord écrit contraire. Il est interdit de contourner l’agence auprès d’un client ou d’une marque introduits par elle.

3. Présence, ponctualité et annulations
Les rendez-vous (castings, fittings, shootings, réunions) sont contractuels dans le cadre de votre activité avec l’agence. La ponctualité est exigée. En cas d’empêchement, vous prévenez l’agence dans les meilleurs délais, et au minimum 24 h avant pour un engagement confirmé, sauf cas de force majeure dûment justifié. Les annulations répétées ou les absences non justifiées peuvent entraîner des mesures prévues au contrat (mise en sommeil du book, résiliation, etc.).

4. Image professionnelle et réseaux sociaux
Vous vous présentez de manière professionnelle lors des missions et communications liées à votre activité de modèle. Les contenus publics (réseaux sociaux, stories, collaborations taguées) doivent rester compatibles avec l’image de l’agence et des marques partenaires. Sont proscrits : propos diffamatoires, contenus illicites, ou tout post pouvant nuire à une campagne ou à un client en cours. En cas de doute sur un partenariat ou une publication, sollicitez l’agence avant publication.

5. Confidentialité
Les informations relatives aux projets en cours (briefs, noms de marques, lieux, équipes, budgets, dates non annoncées) sont strictement confidentielles. Il est interdit de divulguer ou de diffuser des éléments de tournage, contrats, ou négociations sans accord préalable de l’agence ou du client. Cette obligation de discrétion subsiste après la fin de la mission.

6. Sur les lieux de tournage ou de shooting
Vous respectez les consignes du directeur de production, du photographe et de l’équipe. Alcool ou substances illicites interdits sur les lieux de travail. Vous signalez immédiatement toute situation d’insécurité ou de malaise à l’agence et, sur place, à la personne référente désignée.

7. Relation avec l’agence et avec les clients
La communication avec les clients se fait en principe par l’intermédiaire de l’agence. Les échanges directs ne doivent pas court-circuiter la négociation des honoraires ni les engagements contractuels. Le respect mutuel et le langage professionnel sont exigés en toutes circonstances.

8. Données personnelles
Les informations vous concernant sont traitées pour la gestion de votre book, des castings et des missions, dans le respect de la réglementation applicable. Vous pouvez demander l’accès ou la rectification de vos données auprès de l’agence.

9. Évolution du règlement
L’agence peut adapter le présent règlement ; la version en vigueur est celle publiée dans votre espace privé. La poursuite de la collaboration vaut acceptation des mises à jour significatives, sauf opposition motivée dans les délais indiqués par l’agence.

Pour toute question d’interprétation, contactez Quartier Noble avant d’engager une action pouvant affecter une mission ou un contrat.`
      },
      {
        title: "Shooting",
        // Annonce optionnelle (mise en avant en haut de la rubrique) — laissez vide "" pour masquer
        annonce:
          "Shooting bowling confirmé — samedi 11 avril 2026, thème américain (USA, années 50–80, sport ou cinéma au choix). Lieu : Chem. des Pennes au Pin, 13170 Les Pennes-Mirabeau. Les horaires précis et le point de prise en charge pour le trajet (aller-retour pris en charge par l’agence) vous seront confirmés très bientôt ici. En attendant, préparez vos tenues et accessoires.",
        text:
          "Adresse du lieu : Chem. des Pennes au Pin, 13170 Les Pennes-Mirabeau. Préparez plusieurs options de looks dans l’esprit du thème, chaussures confort pour le bowling. Rendez-vous précis et départ groupé : suivez les mises à jour sur cette page ou écrivez-nous via Messages."
      }
    ]
  },

  // ——— Réseaux sociaux ———
  social: {
    instagram: "https://www.instagram.com/quartiernoble?igsh=cXJyb2x0NmV0dGlt&utm_source=qr",
    showInstagram: true
  },

  // ——— Modèles (nom, label sous la photo, liste de photos ; la 1re = image de la carte) ———
  models: [
    {
      name: "Bousky",
      label: "Femme",
      photos: [
        "model/Bousky/Bousky.jpeg"
      ]
    },
    {
      name: "Yousra",
      label: "Femme",
      photos: [
        "model/yousra/yousra.jpeg"
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
      loading: "Connexion…",
      cancel: "Annuler",
      error: "Identifiant ou mot de passe incorrect."
    },
    espacePrivePage: {
      label: "Espace mannequins",
      title: "Votre espace privé",
      sectionPicker: "Rubrique",
      logout: "Déconnexion",
      back: "Retour au site",
      chatWelcome: "Bonjour — écrivez votre message ci-dessous. L’équipe vous répond par email.",
      chatPlaceholder: "Votre message…",
      chatSend: "Envoyer",
      chatSending: "Envoi…",
      chatSent: "Message envoyé",
      chatError: "Envoi impossible. Réessayez.",
      chatNoEndpoint: "Configurez contact.formEndpoint dans config.js (Formspree) pour activer l’envoi.",
      annonceLabel: "Annonce"
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
