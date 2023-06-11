const defaults = [
  {
    type: "appointmentTypes",
    options: [
      { label: "Erstgespräch", value: "firstMeeting" },
      { label: "Folgetermin", value: "followup" },
    ],
  },
  {
    type: "services",
    options: [
      { label: "Kennenlerntermin Paartherapie (50 Min.)", value: "coupleTherapy50" },
      { label: "Paartherapie (Paar) (80 Min.)", value: "coupleTherapy80" },
      { label: "Sexualtherapie (Einzelperson) (50 Min.)", value: "sexTherapy50" },
      { label: "Sexualtherapie (Paar) (80 Min.)", value: "sexTherapy80" },
      {
        label: "Beziehungscoaching (Einzelperson) (50 Min.)",
        value: "relationshipCoaching50",
      },
    ],
  },
  {
    type: "imageRotation",
    content: {
      heading: "Mein Angebot",
      slides: [
        {
          text: "Paartherapie",
          link: "/angebot/paarthreapie",
          icon: "icon-arrow_right",
          description: "Für ein gutes Miteinander und eine erfüllte Partnerschaft.",
          image: "solar_energy_a2mPxBJIkJ.jpg",
        },
      ],
    },
  },
  {
    type: "default",
    content: {},
  },
  {
    type: "heroBig",
    content: {
      heading: "Privatpraxis für Systemische Paar- und Sexualtherapie & Beziehungscoaching",
      image: "solar_energy_a2mPxBJIkJ.jpg",
      cta: {
        text: "Jetzt Termin buchen",
        icon: "icon-caret-right",
        link: "/buchen",
      },
    },
  },
  {
    type: "heroSmall",
    content: {
      heading: "Paartherapie",
      image: "solar_energy_a2mPxBJIkJ.jpg",
      cta: {
        text: "Jetzt Termin buchen",
        icon: "icon-caret-right",
        link: "/buchen",
      },
    },
  },
  {
    type: "bookingCalendar",
    content: {
      days: [
        { id: 1, name: "Montag", startTime: null, endTime: null },
        { id: 2, name: "Dienstag", startTime: null, endTime: null },
        { id: 3, name: "Mittwoch", startTime: null, endTime: null },
        { id: 4, name: "Donnerstag", startTime: null, endTime: null },
        { id: 5, name: "Freitag", startTime: null, endTime: null },
      ],
    },
  },
  {
    type: "faq",
    content: {
      heading: "Häufig gestellte Fragen",
      faqs: [
        {
          question: "Testfrage",
          answer: "Testantwort",
        },
      ],
    },
  },
  {
    type: "prices",
    content: {
      heading: "Preise",
      subline: "Subline",
      prices: [
        {
          name: "Einzelsitzung",
          price: 100.05,
          duration: 50,
          description: 'MwSt. inklusive',
          cta: {
            text: "Jetzt Termin buchen",
            icon: "icon-caret-right",
            link: "/buchen",
          },
        },
      ],
    },
  },
  {
    type: "imageList",
    content: {
      heading: "Heading",
      image: "solar_energy_a2mPxBJIkJ.jpg",
      list: [
        {
          type: "Ausbildung",
          place: "IGST Heidelberg",
          name: "Systemische Sexualtherapie",
        },
      ],
    },
  },
];

export default defaults;
