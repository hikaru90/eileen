import { a as useRuntimeConfig } from './server.mjs';

const getTemplate = (templateName, formData) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
  useRuntimeConfig();
  const templates = [
    {
      name: "contactForm",
      subject: "Neue Kontaktanfrage",
      content: `<html><body>
      Liebe Eileen,<br /><br />
    
      es gibt eine neue Kontaktanfrage von Deiner Seite.<br /><br />

      Vorname: ${formData == null ? void 0 : formData.firstName}<br />
      Nachname: ${formData == null ? void 0 : formData.lastName}<br />
      E-Mail: ${formData == null ? void 0 : formData.mail}<br />
      Nachricht: ${formData == null ? void 0 : formData.message}<br /><br />

      Liebe Gr\xFC\xDFe aus dem Backend \u2665\uFE0F<br />
      </body></html>`
    },
    {
      name: "bookingRequestUser",
      subject: "Deine Buchungsanfrage bei Eileen George",
      content: `<html><body>
      Liebe/r ${formData == null ? void 0 : formData.firstName} ${formData == null ? void 0 : formData.lastName},<br /><br />
    
      vielen Dank f\xFCr Deine Anfrage. Sobald ich Deine Daten gepr\xFCft habe, werde ich Dich umgehend \xFCber die Best\xE4tigung des Termins informieren.<br /><br />
      
      <strong>Anfragendetails:</strong><br />
      Datum: ${(_a = formData == null ? void 0 : formData.timeslot) == null ? void 0 : _a.day}.${(_b = formData == null ? void 0 : formData.timeslot) == null ? void 0 : _b.month}.${(_c = formData == null ? void 0 : formData.timeslot) == null ? void 0 : _c.year}<br />
      Uhrzeit: ${(_d = formData == null ? void 0 : formData.timeslot) == null ? void 0 : _d.timeslot}<br /><br />
      
      Herzliche Gr\xFC\xDFe<br /><br />
      
      <strong>Eileen George</strong><br />
      Psychologisches Coaching<br />
      Selbstwert & Innere Kind Arbeit<br />
      Embodiment<br />
      Werkstra\xDFe 5<br />
      24955 Harrislee<br />
      kontakt@eileengeorge.de<br />
      +49 1525 140 2928<br />
      <br />
      <br />
      Stornierungsrichtlinie<br />
      Eine kostenlose Stornierung Deines Termins ist bis zu 48 Stunden vorher m\xF6glich. Danach wird eine Ausfallgeb\xFChr von 50% f\xE4llig.<br />
      </body></html>`
    },
    {
      name: "bookingConfirmationUser",
      subject: "Terminbest\xE4tigung",
      content: `<html><body>
      Liebe/r ${formData == null ? void 0 : formData.firstName} ${formData == null ? void 0 : formData.lastName},<br /><br />
      
      Ich habe mir Deinen Wunschtermin eingetragen und freue mich sehr auf unsere gemeinsame Sitzung.<br/>
      F\xFCr die endg\xFCltige Best\xE4tigung des Termins, \xFCberweise bitte den Rechnungsbetrag \xFCber folgenden Link:
      paypal.com/XXX<br /><br />

      <strong>Termin:</strong><br />
      Datum: ${(_e = formData == null ? void 0 : formData.timeslot) == null ? void 0 : _e.day}.${(_f = formData == null ? void 0 : formData.timeslot) == null ? void 0 : _f.month}.${(_g = formData == null ? void 0 : formData.timeslot) == null ? void 0 : _g.year}<br />
      Uhrzeit: ${(_h = formData == null ? void 0 : formData.timeslot) == null ? void 0 : _h.timeslot}<br /><br />


      ${(formData == null ? void 0 : formData.place) === "inPerson" ? "Ich freue mich, Dich bald in meinen R\xE4umlichkeiten in Harrislee zu empfangen, melde mich davor aber noch einmal pers\xF6nlich bei Dir per Mail.<br /><br />" : "Ich sende Dir den entsprechenden Link f\xFCr die Durchf\xFChrung Deines Onlinetermins im Vorfeld zu und melde mich davor aber auch einmal pers\xF6nlich per Mail bei Dir.<br /><br />"}

      Bei Fragen oder anderen Anliegen, melde Dich gerne jederzeit bei mir.<br/><br/>
      
      Herzliche Gr\xFC\xDFe<br />
      Von dem Buchungssystem von Eileen<br/><br/>
      Eileen George<br/>
      Psychologisches Coaching<br />
      Selbstwert & Innere Kind Arbeit<br />
      Embodiment<br />
      Werkstra\xDFe 5<br />
      24955 Harrislee<br />
      kontakt@eileengeorge.de<br />
      +49 1525 140 2928<br />
      <br />
      <br />
      Stornierungsrichtlinie<br />
      Eine kostenlose Stornierung Deines Termins ist bis zu 48 Stunden vorher m\xF6glich. Danach wird eine Ausfallgeb\xFChr von 50% f\xE4llig.<br />
      </body></html>`
    },
    {
      name: "bookingRequestOwner",
      subject: `Neue Buchungsanfrage von ${formData == null ? void 0 : formData.firstName} ${formData == null ? void 0 : formData.lastName}`,
      content: `<html><body>
      Liebe Eileen,<br /><br />
    
      es liegt eine neue Buchung von ${formData == null ? void 0 : formData.firstName} ${formData == null ? void 0 : formData.lastName} im Backend bereit und wartet auf Moderation.<br />
      <a href="https://eileengeorge.de/buchungen" title="Eileen George Buchungen">Zu den Buchungen</a>
      <br /><br />
      
      <strong>Anfragendetails:</strong><br />
      Vorname: ${formData == null ? void 0 : formData.firstName}<br />
      Nachname: ${formData == null ? void 0 : formData.lastName}<br />
      Datum: ${(_i = formData == null ? void 0 : formData.timeslot) == null ? void 0 : _i.day}.${(_j = formData == null ? void 0 : formData.timeslot) == null ? void 0 : _j.month}.${(_k = formData == null ? void 0 : formData.timeslot) == null ? void 0 : _k.year}<br />
      Uhrzeit: ${(_l = formData == null ? void 0 : formData.timeslot) == null ? void 0 : _l.timeslot}<br />
      Terminart: ${formData == null ? void 0 : formData.appointmentType}<br />
      Leistung: ${formData == null ? void 0 : formData.service}<br />
      Ort: ${formData == null ? void 0 : formData.place}<br />
      Beschreibung des Themas: ${formData == null ? void 0 : formData.description}<br />
      Rechnungsadresse: ${formData == null ? void 0 : formData.invoiceAddress}<br /><br />
      E-Mail: ${formData == null ? void 0 : formData.mail}<br /><br />
      
      Viel Liebe aus dem Backend \u2665\uFE0F<br />
      <strong>Alex</strong><br />
      </body></html>`
    }
  ];
  return templates.find((template) => template.name === templateName);
};
function useBrevo() {
  const config = useRuntimeConfig();
  const sendMail = async (template, to, formData) => {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": config.public.BREVO_API_KEY,
        "content-type": "application/json"
      },
      body: JSON.stringify({
        sender: {
          email: "kontakt@eileengeorge.de",
          name: `Eileen George`
        },
        replyTo: {
          email: "kontakt@eileengeorge.de",
          name: `Eileen George`
        },
        to: [{ email: to, name: `${formData.firstName} ${formData.lastName}` }],
        subject: getTemplate(template, formData).subject,
        htmlContent: getTemplate(template, formData).content
      })
    });
    if (!response.ok) {
      return "Message could not be sent at this time.";
    }
  };
  return {
    sendMail
  };
}

export { useBrevo as u };
//# sourceMappingURL=useBrevo-c328ab8d.mjs.map
