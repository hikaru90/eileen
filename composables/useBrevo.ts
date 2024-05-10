export const getTemplate = (templateName: string, formData: object) => {
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

      Viel Liebe aus dem Backend ♥️<br />
      </body></html>`,
    },
    {
      name: "bookingRequestUser",
      subject: "Deine Buchungsanfrage bei Eileen George",
      content: `<html><body>
      Liebe/r ${formData?.firstName} ${formData?.lastName},<br /><br />
    
      vielen Dank für Deine Terminanfrage.<br/>
      Sobald ich Deine Daten geprüft habe, melde ich mich noch einmal für die Bestätigung des Termins bei Dir.<br /><br />
      
      <strong>Anfragendetails:</strong><br />
      Datum: ${formData?.timeslot?.day}.${formData?.timeslot?.month}.${formData?.timeslot?.year}<br />
      Uhrzeit: ${formData?.timeslot?.timeslot}<br /><br />
      
      Herzliche Grüße<br />
      von dem Buchungssystem von Eileen<br/><br/>
      <strong>Eileen George<br/></strong>
      Psychologisches Coaching<br />
      Selbstwert & Innere Kind Arbeit<br />
      Embodiment<br />
      Werkstraße 5<br />
      24955 Harrislee<br />
      kontakt@eileengeorge.de<br />
      +49 1525 140 2928<br />
      <br />
      <br />
      Stornierungsrichtlinie<br />
      Eine kostenlose Stornierung Deines Termins ist bis zu 48 Stunden vorher möglich. Danach wird eine Ausfallgebühr von 50% fällig.<br />
      </body></html>`,
    },
    {
      name: "bookingConfirmationUser",
      subject: "Terminbestätigung",
      content: `<html><body>
      Liebe/r ${formData?.firstName} ${formData?.lastName},<br /><br />
      
      Ich habe mir Deinen Wunschtermin eingetragen und freue mich sehr auf unsere gemeinsame Sitzung.<br/>
      Für die endgültige Bestätigung des Termins, überweise bitte den Rechnungsbetrag über folgenden Link:
      <a href="https://www.paypal.com/ncp/payment/TT3QLBPLZPAT2">https://www.paypal.com/ncp/payment/TT3QLBPLZPAT2</a>
      <br /><br />

      <strong>Termin:</strong><br />
      Datum: ${formData?.timeslot?.day}.${formData?.timeslot?.month}.${
        formData?.timeslot?.year
      }<br />
      Uhrzeit: ${formData?.timeslot?.timeslot}<br /><br />


      ${
        formData?.place === "inPerson"
          ? "Ich freue mich, Dich bald in meinen Räumlichkeiten in Harrislee zu empfangen, melde mich davor aber noch einmal persönlich bei Dir per Mail.<br /><br />"
          : "Ich sende Dir den entsprechenden Link für die Durchführung Deines Onlinetermins im Vorfeld zu und melde mich davor aber auch einmal persönlich per Mail bei Dir.<br /><br />"
      }

      Bei Fragen oder anderen Anliegen, melde Dich gerne jederzeit bei mir.<br/><br/>
      
      Herzliche Grüße<br />
      von dem Buchungssystem von Eileen<br/><br/>
      <strong>Eileen George<br/></strong>
      Psychologisches Coaching<br />
      Selbstwert & Innere Kind Arbeit<br />
      Embodiment<br />
      Werkstraße 5<br />
      24955 Harrislee<br />
      kontakt@eileengeorge.de<br />
      +49 1525 140 2928<br />
      <br />
      <br />
      Stornierungsrichtlinie<br />
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