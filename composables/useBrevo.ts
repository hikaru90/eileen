const getTemplate = (templateName: string, formData: object) => {
  const config = useRuntimeConfig();

  const templates = [
    {
      name: "contactForm",
      subject: "Neue Kontaktanfrage",
      content: `<html><body>
      Liebe Eileen,<br /><br />
    
      es gibt eine neue Kontaktanfrage von Deiner Seite.<br /><br />

      Vorname: ${formData?.firstName}<br />
      Nachname: ${formData?.lastName}<br />
      E-Mail: ${formData?.mail}<br />
      Nachricht: ${formData?.message}<br /><br />

      Liebe Grüße aus dem Backend ♥️<br />
      </body></html>`,
    },
    {
      name: "bookingRequestUser",
      subject: "Deine Buchungsanfrage bei Eileen George",
      content: `<html><body>
      Liebe/r ${formData?.firstName} ${formData?.lastName},<br /><br />
    
      vielen Dank für Deine Anfrage. Sobald ich Deine Daten geprüft habe, werde ich Dich umgehend über die Bestätigung des Termins informieren.<br /><br />
      
      <strong>Anfragendetails:</strong><br />
      Datum: ${formData?.timeslot?.day}.${formData?.timeslot?.month}.${formData?.timeslot?.year}<br />
      Uhrzeit: ${formData?.timeslot?.timeslot}<br /><br />
      
      Herzliche Grüße<br /><br />
      
      <strong>Eileen George</strong><br />
      Psychologisches Coaching<br />
      Selbstwert & innere Kind arbeit<br />
      Embodiment<br />
      Werkstraße 5<br />
      24955 Harrislee<br />
      kontakt@eileengeorge.de<br />
      +49 1525 140 2928<br />
      <br />
      <br />
      STORNIERUNGSRICHTLINIE<br />
      Eine kostenlose Stornierung Deines Termins ist bis zu 48 Stunden vorher möglich. Danach wird eine Ausfallgebühr von 50% fällig.<br />
      </body></html>`,
    },
    {
      name: "bookingConfirmationUser",
      subject: "Terminbestätigung",
      content: `<html><body>
      Liebe/r ${formData?.firstName} ${formData?.lastName},<br /><br />
    
      vielen Dank für Deine Terminbuchung, die ich Dir hiermit gerne bestätige.<br /><br />

      ${
        formData?.place === "inPerson"
          ? "Ich freue mich, Dich bald persönlich zu empfangen.<br /><br />"
          : "Ich sende Dir den entsprechenden Link für die Durchführung Deines Onlinetermins im Vorfeld zu.<br /><br />"
      }
      
      <strong>Termin:</strong><br />
      Datum: ${formData?.timeslot?.day}.${formData?.timeslot?.month}.${
        formData?.timeslot?.year
      }<br />
      Uhrzeit: ${formData?.timeslot?.timeslot}<br /><br />
      
      Herzliche Grüße<br /><br />
      
      <strong>Eileen George</strong><br />
      Psychologisches Coaching<br />
      Selbstwert & innere Kind arbeit<br />
      Embodiment<br />
      Werkstraße 5<br />
      24955 Harrislee<br />
      kontakt@eileengeorge.de<br />
      +49 1525 140 2928<br />
      <br />
      <br />
      STORNIERUNGSRICHTLINIE<br />
      Eine kostenlose Stornierung Deines Termins ist bis zu 48 Stunden vorher möglich. Danach wird eine Ausfallgebühr von 50% fällig.<br />
      </body></html>`,
    },
    {
      name: "bookingRequestOwner",
      subject: `Neue Buchungsanfrage von ${formData?.firstName} ${formData?.lastName}`,
      content: `<html><body>
      Liebe Eileen,<br /><br />
    
      es liegt eine neue Buchung von ${formData?.firstName} ${formData?.lastName} im Backend bereit und wartet auf Moderation.<br />
      <a href="https://eileengeorge.de/buchungen" title="Eileen George Buchungen">Zu den Buchungen</a>
      <br /><br />
      
      <strong>Anfragendetails:</strong><br />
      Vorname: ${formData?.firstName}<br />
      Nachname: ${formData?.lastName}<br />
      Datum: ${formData?.timeslot?.day}.${formData?.timeslot?.month}.${formData?.timeslot?.year}<br />
      Uhrzeit: ${formData?.timeslot?.timeslot}<br />
      Terminart: ${formData?.appointmentType}<br />
      Leistung: ${formData?.service}<br />
      Ort: ${formData?.place}<br />
      Beschreibung des Themas: ${formData?.description}<br />
      Rechnungsadresse: ${formData?.invoiceAddress}<br /><br />
      E-Mail: ${formData?.mail}<br /><br />
      
      Viel Liebe aus dem Backend ♥️<br />
      <strong>Alex</strong><br />
      </body></html>`,
    },
  ];

  return templates.find((template) => template.name === templateName);
};

export default function useBrevo() {
  const config = useRuntimeConfig();

  const sendMail = async (template: string, to: string, formData: object) => {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": config.public.BREVO_API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: {
          email: "kontakt@eileengeorge.de",
          name: `Eileen George`,
        },
        replyTo: {
          email: "kontakt@eileengeorge.de",
          name: `Eileen George`,
        },
        to: [{ email: to, name: `${formData.firstName} ${formData.lastName}` }],
        subject: getTemplate(template, formData).subject,
        htmlContent: getTemplate(template, formData).content,
      }),
    });

    if (!response.ok) {
      return "Message could not be sent at this time.";
    }
  };

  return {
    sendMail,
  };
}
