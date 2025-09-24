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
    {
      name: "newsletterOptIn",
      subject: "Bestätige deine Newsletter-Anmeldung",
      content: `<html><body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #e67e22; font-size: 28px; margin-bottom: 10px;">Eileen George</h1>
          <p style="color: #666; font-style: italic;">Psychologisches Coaching • Selbstwert & Innere Kind Arbeit • Embodiment</p>
        </div>

        <h2 style="color: #333; font-size: 24px; margin-bottom: 20px;">
          Hallo${formData?.name ? ` ${formData.name}` : ''},
        </h2>

        <p style="color: #555; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
          vielen Dank für dein Interesse an meinem Newsletter! Um deine Anmeldung abzuschließen, klicke bitte auf den folgenden Link:
        </p>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${formData?.confirmationUrl}"
             style="display: inline-block; background-color: #e67e22; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; font-size: 16px;">
            Newsletter-Anmeldung bestätigen
          </a>
        </div>

        <p style="color: #777; font-size: 14px; line-height: 1.5; margin-bottom: 20px;">
          Falls du diese E-Mail nicht angefordert hast, kannst du sie einfach ignorieren. Ohne Bestätigung wird deine E-Mail-Adresse nicht zu unserer Liste hinzugefügt.
        </p>

        <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px; text-align: center; color: #888; font-size: 12px;">
          <p>
            <strong>Eileen George</strong><br>
            Werkstraße 5, 24955 Harrislee<br>
            kontakt@eileengeorge.de • +49 1525 140 2928
          </p>
        </div>
      </body></html>`,
    },
  ];

  return templates.find((template) => template.name === templateName);
};