const config = useRuntimeConfig();

const getTemplate = (templateName:string, formData:object) => {
  const templates = [
    {
      name: "bookingRequestUser",
      subject: "Ihre Buchungsanfrage bei Dimple Goertz",
      content: `<html><body>
      Liebe/r ${formData.firstName} ${formData.lastName},<br /><br />
    
      vielen Dank für Ihre Anfrage. Sobald ich Ihre Daten geprüft habe, werde ich Sie umgehend über die Bestätigung Ihres Termins informieren.<br /><br />
      
      <strong>Anfragendetails:</strong><br />
      Datum: ${formData.timeslot.day}.${formData.timeslot.month}.${formData.timeslot.year}<br />
      Uhrzeit: ${formData.timeslot.timeslot}<br /><br />
      
      Liebe Grüße<br /><br />
      
      <strong>Dimple Goertz</strong><br />
      Paar- und Sexualtherapeutin & Beziehungscoach<br />
      Breitscheidstraße 33<br />
      70176 Stuttgart<br />
      +49 1573 1664595<br />
      kontakt@dimplegoertz.de<br /><br />
      ____<br />
      STORNIERUNGSRICHTLINIE<br />
      Eine kostenlose Stornierung Ihres Termins ist bis zu 48 Stunden vorher möglich. Danach wird eine Ausfallgebühr von 50% fällig.<br />
      </body></html>`,
    },
    {
      name: "bookingRequestOwner",
      subject: `Neue Buchungsanfrage von ${formData.firstName} ${formData.lastName}`,
      content: `<html><body>
      Liebe Dimple,<br /><br />
    
      es liegt eine neue Buchung von ${formData.firstName} ${formData.lastName} im Backend bereit und wartet auf Moderation.<br />
      <a href="https://dimplegoertz.de/buchungen" title="Dimple Goertz Buchungen">Zu den Buchungen</a>
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
      
      Liebe Grüße aus dem Backend<br />
      <strong>Alex</strong><br />
      </body></html>`,
    },
  ];

  return templates.find(template => template.name === templateName)
}

export default function useBrevo() {
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
          email: "kontakt@dimplegoertz.de",
          name: `Dimple Goertz`,
        },
        replyTo: {
          email: "kontakt@dimplegoertz.de",
          name: `Dimple Goertz`,
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
