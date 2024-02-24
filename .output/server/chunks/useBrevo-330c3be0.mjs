import { a as useRuntimeConfig } from './server.mjs';

const getTemplate = (templateName, formData) => {
  useRuntimeConfig();
  const templates = [
    {
      name: "bookingRequestUser",
      subject: "Ihre Buchungsanfrage bei Eileen George",
      content: `<html><body>
      Liebe/r ${formData.firstName} ${formData.lastName},<br /><br />
    
      vielen Dank f\xFCr Ihre Anfrage. Sobald ich Ihre Daten gepr\xFCft habe, werde ich Sie umgehend \xFCber die Best\xE4tigung Ihres Termins informieren.<br /><br />
      
      <strong>Anfragendetails:</strong><br />
      Datum: ${formData.timeslot.day}.${formData.timeslot.month}.${formData.timeslot.year}<br />
      Uhrzeit: ${formData.timeslot.timeslot}<br /><br />
      
      Herzliche Gr\xFC\xDFe<br /><br />
      
      <strong>Eileen George</strong><br />
      Paar- und Sexualtherapeutin & Beziehungscoach<br />
      Breitscheidstra\xDFe 33<br />
      70176 Stuttgart<br />
      +49 1573 1664595<br />
      kontakt@eileengeorge.de<br /><br />
      ____<br />
      STORNIERUNGSRICHTLINIE<br />
      Eine kostenlose Stornierung Ihres Termins ist bis zu 48 Stunden vorher m\xF6glich. Danach wird eine Ausfallgeb\xFChr von 50% f\xE4llig.<br />
      </body></html>`
    },
    {
      name: "bookingConfirmationUser",
      subject: "Terminbest\xE4tigung",
      content: `<html><body>
      Liebe/r ${formData.firstName} ${formData.lastName},<br /><br />
    
      vielen Dank f\xFCr Ihre Terminbuchung, die ich Ihnen hiermit gerne best\xE4tige.<br /><br />

      ${formData.place === "inPerson" ? "Ich freue mich, Sie bald pers\xF6nlich in meiner Praxis in Stuttgart zu empfangen.<br /><br />" : "Ich sende Ihnen den entsprechenden Link f\xFCr die Durchf\xFChrung Ihres Onlinetermins im Vorfeld zu.<br /><br />"}
      
      <strong>Termin:</strong><br />
      Datum: ${formData.timeslot.day}.${formData.timeslot.month}.${formData.timeslot.year}<br />
      Uhrzeit: ${formData.timeslot.timeslot}<br /><br />
      
      Herzliche Gr\xFC\xDFe<br /><br />
      
      <strong>Eileen George</strong><br />
      Paar- und Sexualtherapeutin & Beziehungscoach<br />
      Breitscheidstra\xDFe 33<br />
      70176 Stuttgart<br />
      +49 1573 1664595<br />
      kontakt@eileengeorge.de<br /><br />
      ____<br />
      STORNIERUNGSRICHTLINIE<br />
      Eine kostenlose Stornierung Ihres Termins ist bis zu 48 Stunden vorher m\xF6glich. Danach wird eine Ausfallgeb\xFChr von 50% f\xE4llig.<br />
      </body></html>`
    },
    {
      name: "bookingRequestOwner",
      subject: `Neue Buchungsanfrage von ${formData.firstName} ${formData.lastName}`,
      content: `<html><body>
      Liebe Eileen,<br /><br />
    
      es liegt eine neue Buchung von ${formData.firstName} ${formData.lastName} im Backend bereit und wartet auf Moderation.<br />
      <a href="https://eileengeorge.de/buchungen" title="Eileen George Buchungen">Zu den Buchungen</a>
      <br /><br />
      
      <strong>Anfragendetails:</strong><br />
      Vorname: ${formData.firstName}<br />
      Nachname: ${formData.lastName}<br />
      Datum: ${formData.timeslot.day}.${formData.timeslot.month}.${formData.timeslot.year}<br />
      Uhrzeit: ${formData.timeslot.timeslot}<br />
      Terminart: ${formData.appointmentType}<br />
      Leistung: ${formData.service}<br />
      Ort: ${formData.place}<br />
      Beschreibung des Themas: ${formData.description}<br />
      Rechnungsadresse: ${formData.invoiceAddress}<br /><br />
      E-Mail: ${formData.mail}<br /><br />
      
      Herzliche Gr\xFC\xDFe aus dem Backend<br />
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
//# sourceMappingURL=useBrevo-330c3be0.mjs.map
