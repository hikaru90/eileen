const defaults = [
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
    content: null
  },
  {
    type: "bookingCalendar",
    content: {
      days: [
        {id:1, name: 'Montag', startTime: null, endTime: null},
        {id:2, name: 'Dienstag', startTime: null, endTime: null},
        {id:3, name: 'Mittwoch', startTime: null, endTime: null},
        {id:4, name: 'Donnerstag', startTime: null, endTime: null},
        {id:5, name: 'Freitag', startTime: null, endTime: null},
      ]
    }
  },
]

export default defaults