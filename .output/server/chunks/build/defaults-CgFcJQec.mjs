const defaults = [
  {
    type: "appointmentTypes",
    options: [
      { label: "Erstgespr\xE4ch", value: "firstMeeting" },
      { label: "Folgetermin", value: "followup" }
    ]
  },
  {
    type: "contact",
    content: {
      heading: "Schreib mir eine Nachricht",
      recipient: "alexbueckner@gmail.com",
      image: "solar_energy_a2mPxBJIkJ.jpg"
    }
  },
  {
    type: "map",
    content: {
      address: "Eileen George<br/>Werkstra\xDFe 5<br/>24955 Harrislee",
      phone: "+49 XXX",
      openinghours: "(Erreichbar Mo-Do, 10-19h)",
      mail: "kontakt@eileengeorge.de",
      image: ""
    }
  },
  {
    type: "services",
    options: [
      { label: "Psychologisches Coaching (60 Min.)", value: "psychologicalCoaching60" },
      { label: "Find Your Way Home (Gruppe) (4 x 90 Min.)", value: "findYourWayHome90" }
      // { label: "Paartherapie (Einzelperson) (50 Min.)", value: "coupleTherapySingle50" },
      // { label: "Paartherapie (Einzelperson) (80 Min.)", value: "coupleTherapySingleIntense80" },
      // { label: "Sexualtherapie Kennenlerngespräch (50 Min.)", value: "sexTherapyIntroduction50" },
      // { label: "Sexualtherapie (Paar) (80 Min.)", value: "sexTherapy80" },
      // { label: "Sexualtherapie (Einzelperson) (50 Min.)", value: "sexTherapySingle50" },
      // { label: "Sexualtherapie (Einzelperson) (80 Min.)", value: "sexTherapySingleIntense80" },
      // {
      //   label: "Beziehungscoaching (Einzelperson) (50 Min.)",
      //   value: "relationshipCoachingSingle50",
      // },
      // {
      //   label: "Beziehungscoaching intensiv (Einzelperson) (80 Min.)",
      //   value: "relationshipCoachingSingleIntense80",
      // },
    ]
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
          description: "F\xFCr ein gutes Miteinander und eine erf\xFCllte Partnerschaft.",
          image: "solar_energy_a2mPxBJIkJ.jpg"
        }
      ]
    }
  },
  {
    type: "offer",
    content: {
      heading: "Wie darf ich Dich unterst\xFCtzen?",
      offers: [
        {
          name: "Psychologisches Coaching",
          type: "Einzelcoaching",
          description: "Individuelles psychologisches Coaching",
          price: 75,
          duration: "50 Minuten",
          cta: {
            text: "Buchen",
            icon: "icon-caret-right",
            link: "/buchen"
          }
        }
      ]
    }
  },
  {
    type: "testimonials",
    content: {
      heading: "Feedback",
      testimonials: [
        {
          name: "Silke",
          Date: "2023-10-01",
          text: "Es war f\xFCr mich ein Schicksalmoment und das gr\xF6\xDFte Gl\xFCck, mit dir arbeiten zu d\xFCrfen. Ich bin endlich wieder viel mehr ich als zuvor und bin immer noch auf dem Weg weiter zu mir."
        }
      ]
    }
  },
  {
    type: "downloads",
    content: {
      heading: "Downloads"
    }
  },
  {
    type: "audio",
    content: {
      heading: "Gef\xFChrte Meditationen",
      audios: [
        {
          name: "Reise zum inneren Kind",
          file: ""
        }
      ],
      description: "F\xFCr monatliche Meditationen und Inspirationen per Mail, trage Dich gerne in meinen Newsletter ein. Deine pers\xF6nlichen Daten sind mir heilig und ich verspreche Dir Dich nicht zuzuspammen.",
      placeholder: "E-Mail Adresse",
      cta: "Eintragen"
    }
  },
  {
    type: "default",
    content: {}
  },
  {
    type: "heroBig",
    content: {
      heading: "Privatpraxis f\xFCr Systemische Paar- und Sexualtherapie & Beziehungscoaching",
      image: "solar_energy_a2mPxBJIkJ.jpg",
      cta: {
        text: "Buchen",
        icon: "icon-caret-right",
        link: "/buchen"
      }
    }
  },
  {
    type: "heroSmall",
    content: {
      heading: "Paartherapie",
      subline: "Subline",
      image: "solar_energy_a2mPxBJIkJ.jpg",
      cta: {
        text: "Buchen",
        icon: "icon-caret-right",
        link: "/buchen"
      }
    }
  },
  {
    type: "portraitText",
    content: {
      heading: "Willkommen & Sch\xF6n, dass Du da bist.",
      image: "solar_energy_a2mPxBJIkJ.jpg",
      text: "Mein Name ist Eileen. Ich begleite Dich als zertifizierte psychologisch-systemische Individualcoachin in schwierigen Lebenssituationen, bei vermindertem Selbstwertempfinden und bei W\xFCnschen nach Ver\xE4nderung. Ganz gleich, an welchen Themen wir gemeinsam arbeiten, Du kommst in unserer Arbeit sanft in einen Zustand der tieferen Verbindung mit Dir selbst und findest zu einem gr\xF6\xDFeren Vertrauen in Dich und Deinen Weg.",
      cta: {
        text: "Buchen",
        icon: "icon-caret-right",
        link: "/buchen"
      }
    }
  },
  {
    type: "myWork",
    content: {
      heading: "Mein Weg & meine Arbeit",
      image: "solar_energy_a2mPxBJIkJ.jpg",
      text: "Mein Name ist Eileen. Ich begleite Dich als zertifizierte psychologisch-systemische Individualcoachin in schwierigen Lebenssituationen, bei vermindertem Selbstwertempfinden und bei W\xFCnschen nach Ver\xE4nderung. Ganz gleich, an welchen Themen wir gemeinsam arbeiten, Du kommst in unserer Arbeit sanft in einen Zustand der tieferen Verbindung mit Dir selbst und findest zu einem gr\xF6\xDFeren Vertrauen in Dich und Deinen Weg.",
      cta: {
        text: "Buchen",
        icon: "icon-caret-right",
        link: "/buchen"
      },
      content: [
        { heading: "Titel", text: "text" },
        { heading: "Titel", text: "text" }
      ]
    }
  },
  {
    type: "clickableHeadings",
    content: {
      blocks: [
        { heading: "Titel", text: "text" },
        { heading: "Titel", text: "text" }
      ]
    }
  },
  {
    type: "bookingCalendar",
    content: {
      days: [
        { id: 1, name: "Montag", startTime: null, endTime: null },
        { id: 2, name: "Dienstag", startTime: null, endTime: null },
        { id: 3, name: "Mittwoch", startTime: null, endTime: null },
        { id: 4, name: "Donnerstag", startTime: null, endTime: null },
        { id: 5, name: "Freitag", startTime: null, endTime: null }
      ]
    }
  },
  {
    type: "faq",
    content: {
      heading: "H\xE4ufig gestellte Fragen",
      faqs: [
        {
          question: "Testfrage",
          answer: "Testantwort"
        }
      ]
    }
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
          description: "MwSt. inklusive",
          cta: {
            text: "Buchen",
            icon: "icon-caret-right",
            link: "/buchen"
          }
        }
      ]
    }
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
          name: "Systemische Sexualtherapie"
        }
      ]
    }
  }
];
const defaults$1 = defaults;

export { defaults$1 as d };
//# sourceMappingURL=defaults-CgFcJQec.mjs.map
