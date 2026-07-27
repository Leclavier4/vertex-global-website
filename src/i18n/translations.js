export const translations = {
  fr: {
    meta: {
      description:
        "Vertex Global, groupe d'innovation technologique africain. Venture Studio basé à Cotonou, Bénin. EnergyTech, HealthTech, Cybersécurité, IA, TourismTech.",
    },

    nav: {
      accueil: 'Accueil',
      about: 'À propos',
      poles: 'Pôles',
      ventures: 'Ventures',
      join: 'Rejoindre',
      contact: 'Contact',
      cta: "Rejoindre l'aventure",
      ariaMain: 'Navigation principale',
      ariaFooter: 'Navigation du pied de page',
      openMenu: 'Ouvrir le menu',
      closeMenu: 'Fermer le menu',
    },

    hero: {
      subheadline:
        "Vertex Global est un Venture Studio africain. Nous identifions de vrais problèmes, construisons des solutions numériques adaptées, et les déployons à l'échelle du continent.",
      ctaPrimary: 'Découvrir notre modèle',
      ctaSecondary: "Rejoindre l'aventure",
      scrollAria: 'Défiler vers la section suivante',
      stats: [
        { target: 6, label: "Pôles d'innovation" },
        { target: 2, label: 'Ventures actives' },
        { target: 10, label: 'Principes fondateurs' },
      ],
    },

    about: {
      label: 'À propos',
      title: 'Nous ne construisons pas des applications.',
      paragraphs: [
        "Nous construisons des systèmes. Là où une startup classique mise tout sur un seul produit, Vertex Global bâtit un portefeuille de ventures numériques capables de résoudre des problèmes réels à l'échelle africaine.",
        "Notre avantage compétitif n'est pas la technologie. C'est notre compréhension intime des défis locaux et notre capacité à y répondre avec méthode et discipline.",
        "Ce modèle n'est pas une mode, c'est une nécessité de timing. L'Afrique de l'Ouest connaît aujourd'hui la convergence rare d'une adoption massive du mobile money, d'une jeunesse ultra-connectée et d'infrastructures encore à construire. Cela laisse un espace immense pour des solutions pensées depuis le terrain plutôt qu'importées d'ailleurs. Cotonou est notre point de départ précisément parce que le Bénin concentre ces conditions à échelle humaine, assez petite pour valider vite, assez connectée à la sous-région pour scaler naturellement.",
      ],
      cards: [
        {
          step: '01 / Identifier',
          text: "Nous partons d'un problème réel, observable, documenté sur le terrain. Jamais d'une idée technologique.",
        },
        {
          step: '02 / Construire',
          text: 'Une solution numérique adaptée aux réalités locales, développée après validation de la demande.',
        },
        {
          step: '03 / Scaler',
          text: "Du Bénin à l'Afrique de l'Ouest. De l'Afrique de l'Ouest au monde.",
        },
      ],
    },

    poles: {
      label: "Nos pôles d'activité",
      titleWhite: '6 domaines.',
      titleGold: '1 vision.',
      items: [
        {
          name: 'EnergyTech',
          description: "Gestion intelligente de l'énergie, recharge prépayée, services aux opérateurs et usagers.",
        },
        {
          name: 'HealthTech',
          description: "Accès aux soins, dossiers médicaux numériques, systèmes d'urgence et télémédecine.",
        },
        {
          name: 'Cybersécurité',
          description: 'Audits, sensibilisation, protection et résilience numérique pour entreprises et institutions.',
        },
        {
          name: 'Intelligence Artificielle',
          description: "Automatisation intelligente et systèmes d'aide à la décision adaptés au contexte africain.",
        },
        {
          name: 'TourismTech',
          description: "Plateformes numériques de valorisation des destinations et de l'économie touristique africaine.",
        },
        {
          name: 'Ventures Émergentes',
          description: "Nouvelles opportunités identifiées par la recherche et l'observation continue du marché.",
        },
      ],
    },

    ventures: {
      label: 'En construction, en production',
      title: 'Nos ventures',
      quoteOpen: '« ',
      quoteClose: ' »',
      items: [
        {
          name: 'RechargRapid',
          pole: 'EnergyTech',
          status: 'En développement',
          problem: 'Vous êtes dans le noir à 22h. Votre compteur SBEE est tombé à zéro. Le bureau est fermé.',
          solution:
            "Recharge de compteurs SBEE par Mobile Money, disponible 24h/24, depuis n'importe quel téléphone.",
        },
        {
          name: 'FastGarage',
          pole: 'MobilityTech',
          status: 'En développement',
          problem: 'Vous êtes en panne sur la route. Vous ne savez pas qui appeler ni où aller.',
          solution: 'Mise en relation immédiate avec des garages et dépanneurs certifiés au Bénin.',
        },
      ],
      teaserText:
        '3+ ventures en conception, réparties entre HealthTech, Cybersécurité et Intelligence Artificielle, actuellement en phase de validation terrain avant premier déploiement.',
      teaserCta: 'Rejoignez-nous pour découvrir la suite',
    },

    join: {
      title: 'Rejoindre Vertex Global',
      subtitle: 'Nous cherchons des personnes qui partagent une vision long terme.',
      groupCard: {
        badge: 'Niveau 1',
        title: 'Partenaire du Groupe',
        desc: "Vous rejoignez le groupe dans sa globalité : vision stratégique, gouvernance et accès à l'ensemble du portefeuille de ventures.",
        points: [
          "Accès à l'ensemble du portefeuille",
          'Enveloppe interne de 60% des revenus',
          'Participation aux décisions stratégiques',
        ],
        cta: 'En savoir plus →',
      },
      projectCard: {
        badge: 'Niveau 2',
        title: 'Partenaire de Projet',
        desc: "Vous rejoignez une venture spécifique, en tant qu'investisseur financier ou contributeur opérationnel, avec un retour aligné sur sa performance.",
        points: [
          'Investisseur financier ou contributeur',
          'Enveloppe projet de 40% des revenus',
          'Part progressive selon ancienneté',
        ],
        cta: 'En savoir plus →',
      },
      form: {
        title: 'Une question ? Écrivez-nous.',
        subtitle: 'Décrivez votre projet ou votre intérêt, nous revenons vers vous rapidement.',
        nameLabel: 'Nom complet',
        namePlaceholder: 'Votre nom complet',
        emailLabel: 'Email',
        emailPlaceholder: 'vous@exemple.com',
        typeLabel: 'Type de collaboration',
        typePlaceholder: 'Choisissez une option',
        types: ['Partenaire Interne', 'Investisseur Financier', 'Contributeur Opérationnel', 'Autre'],
        messageLabel: 'Message',
        messagePlaceholder: 'Parlez-nous de votre projet...',
        channelLabel: 'Canal de contact préféré',
        channelEmail: 'Email',
        channelWhatsapp: 'WhatsApp',
        submitEmail: 'Envoyer via Email',
        submitWhatsapp: 'Envoyer via WhatsApp',
        submitLoading: 'Préparation…',
        errors: {
          name: 'Merci de renseigner votre nom.',
          email: 'Merci de renseigner une adresse email valide.',
          type: 'Merci de sélectionner un type de collaboration.',
          message: 'Merci de rédiger un message.',
          channel: 'Merci de choisir un canal de contact.',
        },
        successEmail: 'Votre email a été préparé. Envoyez-le depuis votre messagerie pour finaliser.',
        successWhatsapp: 'WhatsApp ouvert. Envoyez le message pour finaliser votre demande.',
        mailSubjectPrefix: 'Collaboration Vertex Global',
        mailFieldLabels: { name: 'Nom', email: 'Email', type: 'Type', message: 'Message' },
        waGreeting: 'Bonjour Vertex Global 👋',
        waFieldLabels: { name: 'Nom', email: 'Email', type: 'Type de collaboration', message: 'Message' },
      },
    },

    footer: {
      tagline: "Groupe d'innovation technologique africain.",
      location: "Cotonou, Bénin · Afrique de l'Ouest",
      navTitle: 'Navigation',
      socialTitle: 'Suivez-nous',
      rights: 'Tous droits réservés.',
      motto: "Bâtir l'Afrique. Build the world.",
      socialAria: 'Vertex Global sur',
    },

    errorBoundary: "Une erreur est survenue lors de l'affichage de cette section.",

    languageSwitcher: {
      toFrench: 'Passer en français',
      toEnglish: 'Switch to English',
    },
  },

  en: {
    meta: {
      description:
        'Vertex Global, African technology innovation group. Venture studio based in Cotonou, Bénin. EnergyTech, HealthTech, Cybersecurity, AI, TourismTech.',
    },

    nav: {
      accueil: 'Home',
      about: 'About',
      poles: 'Hubs',
      ventures: 'Ventures',
      join: 'Join',
      contact: 'Contact',
      cta: 'Join the journey',
      ariaMain: 'Main navigation',
      ariaFooter: 'Footer navigation',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
    },

    hero: {
      subheadline:
        'Vertex Global is an African venture studio. We identify real problems, build tech solutions that fit, and deploy them at continental scale.',
      ctaPrimary: 'Discover our model',
      ctaSecondary: 'Join the journey',
      scrollAria: 'Scroll to next section',
      stats: [
        { target: 6, label: 'Innovation hubs' },
        { target: 2, label: 'Active ventures' },
        { target: 10, label: 'Founding principles' },
      ],
    },

    about: {
      label: 'About',
      title: "We don't build apps.",
      paragraphs: [
        'We build systems. Where a classic startup bets everything on a single product, Vertex Global builds a portfolio of digital ventures designed to solve real problems at African scale.',
        "Our edge isn't technology. It's an intimate understanding of local challenges, and the discipline to answer them with method rather than guesswork.",
        "This model isn't a trend, it's a matter of timing. West Africa is living through a rare convergence: mass mobile money adoption, a hyper-connected youth, and infrastructure still being built. That leaves enormous room for solutions designed from the ground up rather than imported from elsewhere. Cotonou is our starting point precisely because Bénin holds these conditions at human scale: small enough to validate fast, connected enough to the region to scale naturally.",
      ],
      cards: [
        {
          step: '01 / Identify',
          text: 'We start from a real problem: observed, documented, on the ground. Never from a technology looking for a use case.',
        },
        {
          step: '02 / Build',
          text: 'A digital solution built for local realities, developed only after the demand is validated.',
        },
        {
          step: '03 / Scale',
          text: 'From Bénin to West Africa. From West Africa to the world.',
        },
      ],
    },

    poles: {
      label: 'Our focus areas',
      titleWhite: '6 domains.',
      titleGold: '1 vision.',
      items: [
        {
          name: 'EnergyTech',
          description: 'Smart energy management, prepaid recharging, and services for operators and end users.',
        },
        {
          name: 'HealthTech',
          description: 'Access to care, digital medical records, emergency systems, and telemedicine.',
        },
        {
          name: 'Cybersecurity',
          description: 'Audits, awareness training, protection, and digital resilience for businesses and institutions.',
        },
        {
          name: 'Artificial Intelligence',
          description: 'Intelligent automation and decision-support systems built for the African context.',
        },
        {
          name: 'TourismTech',
          description: "Digital platforms that showcase African destinations and power the continent's tourism economy.",
        },
        {
          name: 'Emerging Ventures',
          description: 'New opportunities surfaced through research and continuous market observation.',
        },
      ],
    },

    ventures: {
      label: 'In progress, in production',
      title: 'Our ventures',
      quoteOpen: '“',
      quoteClose: '”',
      items: [
        {
          name: 'RechargRapid',
          pole: 'EnergyTech',
          status: 'In Development',
          problem: "You're in the dark at 10pm. Your SBEE meter just hit zero. The office is closed.",
          solution: 'Top up SBEE meters via Mobile Money, available 24/7, from any phone.',
        },
        {
          name: 'FastGarage',
          pole: 'MobilityTech',
          status: 'In Development',
          problem: "You've broken down on the road. You don't know who to call or where to go.",
          solution: 'Instant matching with certified garages and towing services across Bénin.',
        },
      ],
      teaserText:
        "3+ ventures in the works, spanning HealthTech, Cybersecurity, and Artificial Intelligence, currently in field validation ahead of first deployment.",
      teaserCta: "Join us to see what's next",
    },

    join: {
      title: 'Join Vertex Global',
      subtitle: "We're looking for people who share a long-term vision.",
      groupCard: {
        badge: 'Level 1',
        title: 'Group Partner',
        desc: 'You join the group as a whole: strategic vision, governance, and access to the entire venture portfolio.',
        points: [
          'Access to the entire portfolio',
          '60% internal revenue share',
          'A voice in strategic decisions',
        ],
        cta: 'Learn more →',
      },
      projectCard: {
        badge: 'Level 2',
        title: 'Project Partner',
        desc: 'You join one specific venture, as a financial investor or operational contributor, with returns tied to its performance.',
        points: [
          'Financial investor or contributor',
          '40% project revenue share',
          'Growing stake based on tenure',
        ],
        cta: 'Learn more →',
      },
      form: {
        title: 'Have a question? Write to us.',
        subtitle: "Tell us about your project or interest. We'll get back to you quickly.",
        nameLabel: 'Full name',
        namePlaceholder: 'Your full name',
        emailLabel: 'Email',
        emailPlaceholder: 'you@example.com',
        typeLabel: 'Collaboration type',
        typePlaceholder: 'Choose an option',
        types: ['Internal Partner', 'Financial Investor', 'Operational Contributor', 'Other'],
        messageLabel: 'Message',
        messagePlaceholder: 'Tell us about your project...',
        channelLabel: 'Preferred contact channel',
        channelEmail: 'Email',
        channelWhatsapp: 'WhatsApp',
        submitEmail: 'Send via Email',
        submitWhatsapp: 'Send via WhatsApp',
        submitLoading: 'Preparing…',
        errors: {
          name: 'Please enter your name.',
          email: 'Please enter a valid email address.',
          type: 'Please select a collaboration type.',
          message: 'Please write a message.',
          channel: 'Please choose a contact channel.',
        },
        successEmail: 'Your email has been prepared. Send it from your mail app to finish.',
        successWhatsapp: 'WhatsApp opened. Send the message to complete your request.',
        mailSubjectPrefix: 'Vertex Global Collaboration',
        mailFieldLabels: { name: 'Name', email: 'Email', type: 'Type', message: 'Message' },
        waGreeting: 'Hello Vertex Global 👋',
        waFieldLabels: { name: 'Name', email: 'Email', type: 'Collaboration type', message: 'Message' },
      },
    },

    footer: {
      tagline: 'African technology innovation group.',
      location: 'Cotonou, Bénin · West Africa',
      navTitle: 'Navigation',
      socialTitle: 'Follow us',
      rights: 'All rights reserved.',
      motto: "Bâtir l'Afrique. Build the world.",
      socialAria: 'Vertex Global on',
    },

    errorBoundary: 'An error occurred while displaying this section.',

    languageSwitcher: {
      toFrench: 'Passer en français',
      toEnglish: 'Switch to English',
    },
  },
}
