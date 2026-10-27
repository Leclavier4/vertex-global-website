/* All copy is factual and sourced from the client brief: no invented
   figures, clients, partners or testimonials, no em dashes. Section ids
   referenced by navigation: about, services, projects, institution, contact. */

export const translations = {
  fr: {
    meta: {
      description:
        // Kept identical to the static <meta> in index.html (required wording).
        'Vertex Global est un Venture Studio africain basé au Bénin. Nous identifions des problèmes réels et construisons des solutions numériques à impact. RCCM : RB/ABC/26 B 12287',
    },

    skipLink: 'Aller au contenu principal',

    nav: {
      home: 'Vertex Global, retour en haut de page',
      about: 'À propos',
      services: 'Services',
      projects: 'Projets',
      contact: 'Contact',
      cta: 'Nous contacter',
      liveLabel: 'Un produit en production',
      ariaMain: 'Navigation principale',
      ariaMobile: 'Navigation mobile',
      openMenu: 'Ouvrir le menu',
      closeMenu: 'Fermer le menu',
    },

    hero: {
      eyebrow: 'Venture studio numérique · Bénin',
      subheadline:
        "Vertex Global conçoit, structure et développe des solutions numériques pour l'Afrique de l'Ouest et au-delà. Une SARL de droit béninois, fondée en 2026 à Abomey-Calavi.",
      ctaPrimary: 'Découvrir nos projets',
      ctaSecondary: 'Nous contacter',
      facts: [
        { value: '2026', label: 'Année de création' },
        { value: '1', label: 'Produit en production' },
        { value: '6', label: "Domaines d'expertise" },
      ],
      badgeLegalLabel: 'SARL immatriculée',
      badgeLegalValue: 'RCCM RB/ABC/26 B 12287',
      badgeLiveLabel: 'En production',
      badgeLiveValue: 'FastGarage',
      scrollAria: 'Défiler vers la section À propos',
    },

    about: {
      eyebrow: 'À propos',
      title: 'Nous construisons des systèmes.',
      paragraphs: [
        "Vertex Global est un venture studio numérique de droit béninois. Là où une startup classique mise tout sur un seul produit, nous bâtissons et accompagnons des solutions capables de résoudre des problèmes réels à l'échelle africaine.",
        "Notre avantage n'est pas la technologie en elle-même. C'est notre compréhension intime des défis locaux et notre capacité à y répondre avec méthode et discipline.",
        "Ce modèle n'est pas une mode, c'est une question de timing. L'Afrique de l'Ouest connaît une convergence rare : adoption massive du mobile money, jeunesse connectée, infrastructures encore à construire. Le Grand Cotonou est notre point de départ précisément parce que le Bénin réunit ces conditions à échelle humaine : assez compact pour valider vite, assez connecté à la sous-région pour grandir naturellement.",
      ],
      missionEyebrow: 'Notre mission',
      mission:
        "Construire l'infrastructure numérique africaine : des outils pensés depuis le terrain, pour les secteurs que les solutions importées servent mal.",
      problemsTitle: 'Les problèmes que nous attaquons',
      problems: [
        {
          title: 'Mobilité',
          text: "En cas de panne, trouver une aide fiable dépend encore du carnet de contacts. Il manque une mise en relation rapide et vérifiée.",
        },
        {
          title: 'Marchés publics',
          text: "Constituer un dossier d'appel d'offres reste lourd, manuel et exposé aux erreurs de procédure.",
        },
        {
          title: 'Outils adaptés',
          text: 'Trop de solutions sont importées sans tenir compte des usages locaux : mobile money, connectivité variable, multilinguisme.',
        },
      ],
      processTitle: 'Notre méthode',
      steps: [
        {
          step: '01',
          title: 'Identifier',
          text: "Nous partons d'un problème réel, observé et documenté sur le terrain. Jamais d'une idée technologique.",
        },
        {
          step: '02',
          title: 'Construire',
          text: 'Une solution numérique adaptée aux réalités locales, développée après validation de la demande.',
        },
        {
          step: '03',
          title: 'Grandir',
          text: "Du Bénin à l'Afrique de l'Ouest. De l'Afrique de l'Ouest au monde.",
        },
      ],
    },

    services: {
      eyebrow: 'Services',
      title: 'Six domaines, une même exigence.',
      lede: 'Des compétences opérationnelles, mises au service de nos propres projets comme de ceux de nos clients et partenaires.',
      items: [
        {
          title: 'Développement web et mobile',
          description:
            'Applications web et mobiles sur mesure, APIs REST et architectures conçues pour durer.',
          tags: ['Laravel', 'React', 'APIs REST'],
        },
        {
          title: 'Cybersécurité et conformité',
          description:
            'Audit de sécurité, mise en conformité APDP Bénin et RGPD, sensibilisation et formation des équipes.',
          tags: ['APDP', 'RGPD', 'Audit'],
        },
        {
          title: 'Traduction et localisation',
          description:
            "Traduction, interprétation et localisation pour relier l'Afrique au reste du monde, quels que soient vos marchés et vos interlocuteurs.",
          tags: ['Français', 'Anglais', 'Arabe'],
        },
        {
          title: 'Stratégie et accompagnement',
          description:
            "Structuration juridique de startups, roadmap produit, levée de fonds early-stage et acquisition d'opportunités d'études, en Afrique et hors du continent.",
          tags: ['Structuration', 'Roadmap', 'Études'],
        },
        {
          title: 'Formation tech',
          description: 'Formations en cybersécurité, développement web et intelligence artificielle appliquée.',
          tags: ['Cybersécurité', 'Web', 'IA appliquée'],
        },
        {
          title: 'Marchés publics',
          description:
            'Constitution de dossiers, bordereaux de prix et accompagnement selon les procédures HCPC du Bénin.',
          tags: ['Dossiers', 'Bordereaux', 'HCPC'],
        },
      ],
    },

    projects: {
      eyebrow: 'Projets',
      title: 'Ce que nous construisons.',
      lede: 'Un produit en production, un outil métier finalisé. Nous ne présentons que ce qui existe réellement.',
      fastgarage: {
        status: 'En production',
        name: 'FastGarage',
        tagline: 'Le dépannage automobile, enfin organisé.',
        description:
          'Plateforme de mise en relation entre automobilistes en panne et mécaniciens agréés géolocalisés, avec dispatch en temps réel et paiement Mobile Money intégré.',
        features: [
          'Mécaniciens agréés, géolocalisés',
          'Dispatch en temps réel',
          'Paiement Mobile Money intégré',
          'Dossier APDP déposé, récépissé reçu',
        ],
        cta: 'Visiter fastgarage-vg.com',
        ctaAria: 'Visiter le site de FastGarage (nouvel onglet)',
        mock: {
          location: 'Votre position',
          request: 'Demande de dépannage',
          mechanic: 'Mécanicien agréé',
          status: 'En route',
          pay: 'Payer par Mobile Money',
        },
      },
      sgmp: {
        status: 'Finalisé · B2B privé',
        name: 'SGMP',
        fullName: 'Système de Gestion des Marchés Publics',
        description:
          "Solution de gestion des appels d'offres et des dossiers de candidature, structurée selon les procédures HCPC du Bénin.",
        tags: ['Laravel 11', 'Procédures HCPC', 'Usage interne'],
        note: 'Produit privé, présenté sur demande.',
        cta: 'Demander une présentation',
      },
    },

    institution: {
      eyebrow: 'Cadre institutionnel',
      title: 'Une structure légalement établie.',
      lede: 'Vertex Global SARL est immatriculée au Registre du Commerce et du Crédit Mobilier du Bénin.',
      items: [
        { label: 'Forme juridique', value: 'SARL de droit béninois' },
        { label: 'RCCM', value: 'RB/ABC/26 B 12287' },
        { label: 'IFU', value: '3202687473834' },
        { label: 'Siège social', value: 'Îlot 104, Quartier Zopah, Abomey-Calavi, Bénin' },
        { label: 'Création', value: '2026' },
        { label: 'Protection des données', value: 'Dossier APDP déposé pour FastGarage, récépissé reçu' },
      ],
      legalLink: 'Consulter les mentions légales',
    },

    contact: {
      eyebrow: 'Contact',
      title: 'Parlons de votre projet.',
      lede: 'Client, partenaire, investisseur ou entrepreneur : décrivez votre besoin, nous revenons vers vous rapidement.',
      panel: {
        title: 'Écrivez-nous directement',
        emailLabel: 'Email',
        phoneLabel: 'Téléphone et WhatsApp',
        addressLabel: 'Siège social',
        address: 'Îlot 104, Quartier Zopah, Abomey-Calavi, Bénin',
      },
      partners: {
        title: 'Rejoindre le studio',
        lede: 'Nous cherchons des personnes qui partagent une vision long terme.',
        groupCard: {
          badge: 'Niveau 1',
          title: 'Partenaire du Groupe',
          desc: "Vous rejoignez le groupe dans sa globalité : vision stratégique, gouvernance et accès à l'ensemble du portefeuille.",
          points: [
            "Accès à l'ensemble du portefeuille",
            'Enveloppe interne de 60% des revenus',
            'Participation aux décisions stratégiques',
          ],
          cta: 'Nous écrire',
        },
        projectCard: {
          badge: 'Niveau 2',
          title: 'Partenaire de Projet',
          desc: "Vous rejoignez un projet spécifique, en tant qu'investisseur financier ou contributeur opérationnel, avec un retour aligné sur sa performance.",
          points: [
            'Investisseur financier ou contributeur',
            'Enveloppe projet de 40% des revenus',
            'Part progressive selon ancienneté',
          ],
          cta: 'Nous écrire',
        },
      },
      form: {
        title: 'Une question ? Écrivez-nous.',
        subtitle: 'Décrivez votre projet ou votre intérêt, nous revenons vers vous rapidement.',
        nameLabel: 'Nom complet',
        namePlaceholder: 'Votre nom complet',
        emailLabel: 'Email',
        emailPlaceholder: 'vous@exemple.com',
        typeLabel: 'Type de demande',
        typePlaceholder: 'Choisissez une option',
        types: ['Demande de service', 'Partenaire Interne', 'Investisseur Financier', 'Contributeur Opérationnel', 'Autre'],
        messageLabel: 'Message',
        messagePlaceholder: 'Parlez-nous de votre projet...',
        channelLabel: 'Canal de contact préféré',
        channelEmail: 'Email',
        channelWhatsapp: 'WhatsApp',
        helperEmail: 'Votre email sera pré-rempli et ouvert dans votre messagerie.',
        helperWhatsapp: 'Votre message sera pré-rempli et envoyé directement sur WhatsApp.',
        requiredHint: 'Tous les champs sont obligatoires.',
        submitEmail: 'Envoyer par Email',
        submitWhatsapp: 'Envoyer via WhatsApp',
        submitLoading: 'Préparation…',
        errors: {
          name: 'Merci de renseigner votre nom.',
          email: 'Merci de renseigner une adresse email valide.',
          type: 'Merci de sélectionner un type de demande.',
          message: 'Merci de rédiger un message.',
          messageMinLength: 'Votre message doit contenir au moins 20 caractères.',
          channel: 'Merci de choisir un canal de contact.',
        },
        rateLimited: 'Trop de tentatives. Merci de réessayer dans quelques minutes.',
        successEmail: 'Email préparé. Envoyez-le depuis votre messagerie pour finaliser.',
        successWhatsapp: 'Message WhatsApp préparé. Envoyez-le pour finaliser.',
        mailSubjectPrefix: 'Contact Vertex Global',
        mailFieldLabels: { name: 'Nom', email: 'Email', type: 'Type', message: 'Message' },
        waGreeting: 'Bonjour Vertex Global 👋',
        waFieldLabels: { name: 'Nom', type: 'Type de demande', message: 'Message' },
      },
    },

    footer: {
      tagline: 'Venture studio numérique de droit béninois.',
      projectsTitle: 'Projets',
      servicesTitle: 'Services',
      contactTitle: 'Contact',
      socialTitle: 'Suivez-nous',
      privateB2B: 'Privé B2B',
      live: 'En ligne',
      rights: 'Tous droits réservés.',
      motto: "Bâtir l'Afrique. Build the world.",
      socialAria: 'Vertex Global sur',
      legalLink: 'Mentions légales et politique de confidentialité',
    },

    cookie: {
      aria: 'Consentement aux cookies',
      text: "Nous utilisons uniquement les cookies et le stockage local nécessaires au fonctionnement du site. Aucune donnée personnelle n'est revendue ni partagée avec des tiers.",
      more: 'En savoir plus',
      accept: 'Accepter',
      refuse: 'Refuser',
    },

    errorBoundary: "Une erreur est survenue lors de l'affichage de cette section.",
    scrollToTop: 'Retourner en haut de la page',

    languageSwitcher: {
      group: 'Langue du site',
      toFrench: 'Passer en français',
      toEnglish: 'Switch to English',
    },
  },

  en: {
    meta: {
      description:
        'Vertex Global is a Beninese digital venture studio founded in 2026 in Abomey-Calavi. Web and mobile development, cybersecurity, translation, advisory, tech training and public procurement. RCCM: RB/ABC/26 B 12287',
    },

    skipLink: 'Skip to main content',

    nav: {
      home: 'Vertex Global, back to top',
      about: 'About',
      services: 'Services',
      projects: 'Projects',
      contact: 'Contact',
      cta: 'Contact us',
      liveLabel: 'One product live',
      ariaMain: 'Main navigation',
      ariaMobile: 'Mobile navigation',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
    },

    hero: {
      eyebrow: 'Digital venture studio · Bénin',
      subheadline:
        'Vertex Global designs, structures and builds digital solutions for West Africa and beyond. A Beninese limited liability company (SARL), founded in 2026 in Abomey-Calavi.',
      ctaPrimary: 'Explore our projects',
      ctaSecondary: 'Contact us',
      facts: [
        { value: '2026', label: 'Year founded' },
        { value: '1', label: 'Product in production' },
        { value: '6', label: 'Areas of expertise' },
      ],
      badgeLegalLabel: 'Registered SARL',
      badgeLegalValue: 'RCCM RB/ABC/26 B 12287',
      badgeLiveLabel: 'In production',
      badgeLiveValue: 'FastGarage',
      scrollAria: 'Scroll to the About section',
    },

    about: {
      eyebrow: 'About',
      title: 'We build systems.',
      paragraphs: [
        'Vertex Global is a digital venture studio incorporated under Beninese law. Where a classic startup bets everything on a single product, we build and support solutions designed to solve real problems at African scale.',
        "Our edge isn't technology for its own sake. It's an intimate understanding of local challenges, and the discipline to answer them with method rather than guesswork.",
        "This model isn't a trend, it's a matter of timing. West Africa is living through a rare convergence: mass mobile money adoption, a connected youth, and infrastructure still being built. Greater Cotonou is our starting point precisely because Bénin holds these conditions at human scale: compact enough to validate fast, connected enough to the region to grow naturally.",
      ],
      missionEyebrow: 'Our mission',
      mission:
        "Build Africa's digital infrastructure: tools designed from the ground up, for the sectors imported solutions serve poorly.",
      problemsTitle: 'The problems we tackle',
      problems: [
        {
          title: 'Mobility',
          text: 'When a car breaks down, finding reliable help still depends on who you know. Fast, verified matching is missing.',
        },
        {
          title: 'Public procurement',
          text: 'Putting together a tender file remains heavy, manual and exposed to procedural errors.',
        },
        {
          title: 'Fit-for-purpose tools',
          text: 'Too many solutions are imported without regard for local usage: mobile money, uneven connectivity, multilingual users.',
        },
      ],
      processTitle: 'Our method',
      steps: [
        {
          step: '01',
          title: 'Identify',
          text: 'We start from a real problem: observed, documented, on the ground. Never from a technology looking for a use case.',
        },
        {
          step: '02',
          title: 'Build',
          text: 'A digital solution built for local realities, developed only after the demand is validated.',
        },
        {
          step: '03',
          title: 'Grow',
          text: 'From Bénin to West Africa. From West Africa to the world.',
        },
      ],
    },

    services: {
      eyebrow: 'Services',
      title: 'Six areas, one standard.',
      lede: 'Hands-on expertise we apply to our own projects and to those of our clients and partners.',
      items: [
        {
          title: 'Web and mobile development',
          description: 'Custom web and mobile applications, REST APIs and architectures built to last.',
          tags: ['Laravel', 'React', 'REST APIs'],
        },
        {
          title: 'Cybersecurity and compliance',
          description:
            'Security audits, APDP Bénin and GDPR compliance, awareness programs and team training.',
          tags: ['APDP', 'GDPR', 'Audit'],
        },
        {
          title: 'Translation and localization',
          description:
            'Translation, interpreting and localization connecting Africa with the rest of the world, whatever your markets and counterparts.',
          tags: ['French', 'English', 'Arabic'],
        },
        {
          title: 'Strategy and advisory',
          description:
            'Startup legal structuring, product roadmaps, early-stage fundraising, and securing study opportunities in Africa and beyond.',
          tags: ['Structuring', 'Roadmap', 'Studies'],
        },
        {
          title: 'Tech training',
          description: 'Training in cybersecurity, web development and applied artificial intelligence.',
          tags: ['Cybersecurity', 'Web', 'Applied AI'],
        },
        {
          title: 'Public procurement',
          description:
            "Tender file preparation, bills of quantities and guidance through Bénin's HCPC procedures.",
          tags: ['Tender files', 'Pricing', 'HCPC'],
        },
      ],
    },

    projects: {
      eyebrow: 'Projects',
      title: 'What we build.',
      lede: 'One product in production, one finished business tool. We only show what actually exists.',
      fastgarage: {
        status: 'In production',
        name: 'FastGarage',
        tagline: 'Roadside assistance, finally organized.',
        description:
          'A platform connecting stranded drivers with geolocated, certified mechanics, with real-time dispatch and built-in Mobile Money payment.',
        features: [
          'Certified, geolocated mechanics',
          'Real-time dispatch',
          'Built-in Mobile Money payment',
          'APDP filing submitted, receipt issued',
        ],
        cta: 'Visit fastgarage-vg.com',
        ctaAria: 'Visit the FastGarage website (opens in a new tab)',
        mock: {
          location: 'Your location',
          request: 'Assistance request',
          mechanic: 'Certified mechanic',
          status: 'On the way',
          pay: 'Pay with Mobile Money',
        },
      },
      sgmp: {
        status: 'Completed · Private B2B',
        name: 'SGMP',
        fullName: 'Public Procurement Management System',
        description:
          "A tool for managing tenders and bid files, structured around Bénin's HCPC procedures.",
        tags: ['Laravel 11', 'HCPC procedures', 'Internal use'],
        note: 'Private product, presented on request.',
        cta: 'Request a presentation',
      },
    },

    institution: {
      eyebrow: 'Legal framework',
      title: 'A legally established company.',
      lede: "Vertex Global SARL is registered with Bénin's Trade and Personal Property Credit Register (RCCM).",
      items: [
        { label: 'Legal form', value: 'SARL (limited liability company) under Beninese law' },
        { label: 'RCCM', value: 'RB/ABC/26 B 12287' },
        { label: 'IFU (tax ID)', value: '3202687473834' },
        { label: 'Registered office', value: 'Îlot 104, Quartier Zopah, Abomey-Calavi, Bénin' },
        { label: 'Founded', value: '2026' },
        { label: 'Data protection', value: 'APDP filing submitted for FastGarage, receipt issued' },
      ],
      legalLink: 'Read the legal notice',
    },

    contact: {
      eyebrow: 'Contact',
      title: "Let's talk about your project.",
      lede: "Client, partner, investor or founder: tell us what you need and we'll get back to you quickly.",
      panel: {
        title: 'Write to us directly',
        emailLabel: 'Email',
        phoneLabel: 'Phone and WhatsApp',
        addressLabel: 'Registered office',
        address: 'Îlot 104, Quartier Zopah, Abomey-Calavi, Bénin',
      },
      partners: {
        title: 'Join the studio',
        lede: "We're looking for people who share a long-term vision.",
        groupCard: {
          badge: 'Level 1',
          title: 'Group Partner',
          desc: 'You join the group as a whole: strategic vision, governance, and access to the entire portfolio.',
          points: [
            'Access to the entire portfolio',
            '60% internal revenue share',
            'A voice in strategic decisions',
          ],
          cta: 'Write to us',
        },
        projectCard: {
          badge: 'Level 2',
          title: 'Project Partner',
          desc: 'You join one specific project, as a financial investor or operational contributor, with returns tied to its performance.',
          points: [
            'Financial investor or contributor',
            '40% project revenue share',
            'Growing stake based on tenure',
          ],
          cta: 'Write to us',
        },
      },
      form: {
        title: 'Have a question? Write to us.',
        subtitle: "Tell us about your project or interest. We'll get back to you quickly.",
        nameLabel: 'Full name',
        namePlaceholder: 'Your full name',
        emailLabel: 'Email',
        emailPlaceholder: 'you@example.com',
        typeLabel: 'Request type',
        typePlaceholder: 'Choose an option',
        types: ['Service request', 'Internal Partner', 'Financial Investor', 'Operational Contributor', 'Other'],
        messageLabel: 'Message',
        messagePlaceholder: 'Tell us about your project...',
        channelLabel: 'Preferred contact channel',
        channelEmail: 'Email',
        channelWhatsapp: 'WhatsApp',
        helperEmail: 'Your email will be pre-filled and opened in your mail app.',
        helperWhatsapp: 'Your message will be pre-filled and sent directly on WhatsApp.',
        requiredHint: 'All fields are required.',
        submitEmail: 'Send by Email',
        submitWhatsapp: 'Send via WhatsApp',
        submitLoading: 'Preparing…',
        errors: {
          name: 'Please enter your name.',
          email: 'Please enter a valid email address.',
          type: 'Please select a request type.',
          message: 'Please write a message.',
          messageMinLength: 'Your message must be at least 20 characters long.',
          channel: 'Please choose a contact channel.',
        },
        rateLimited: 'Too many attempts. Please try again in a few minutes.',
        successEmail: 'Email prepared. Send it from your mail app to finish.',
        successWhatsapp: 'WhatsApp message prepared. Send it to finish.',
        mailSubjectPrefix: 'Vertex Global contact',
        mailFieldLabels: { name: 'Name', email: 'Email', type: 'Type', message: 'Message' },
        waGreeting: 'Hello Vertex Global 👋',
        waFieldLabels: { name: 'Name', type: 'Request type', message: 'Message' },
      },
    },

    footer: {
      tagline: 'Digital venture studio incorporated under Beninese law.',
      projectsTitle: 'Projects',
      servicesTitle: 'Services',
      contactTitle: 'Contact',
      socialTitle: 'Follow us',
      privateB2B: 'Private B2B',
      live: 'Live',
      rights: 'All rights reserved.',
      motto: "Bâtir l'Afrique. Build the world.",
      socialAria: 'Vertex Global on',
      legalLink: 'Legal notice and privacy policy',
    },

    cookie: {
      aria: 'Cookie consent',
      text: 'We only use the cookies and local storage the site needs to work. No personal data is sold or shared with third parties.',
      more: 'Learn more',
      accept: 'Accept',
      refuse: 'Decline',
    },

    errorBoundary: 'An error occurred while displaying this section.',
    scrollToTop: 'Back to top',

    languageSwitcher: {
      group: 'Site language',
      toFrench: 'Passer en français',
      toEnglish: 'Switch to English',
    },
  },
}
