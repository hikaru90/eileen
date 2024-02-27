import{e as b}from"./entry.1a360e4d.js";const s=(r,e)=>(b(),[{name:"bookingRequestUser",subject:"Ihre Buchungsanfrage bei Eileen George",content:`<html><body>
      Liebe/r ${e.firstName} ${e.lastName},<br /><br />
    
      vielen Dank für Ihre Anfrage. Sobald ich Ihre Daten geprüft habe, werde ich Sie umgehend über die Bestätigung Ihres Termins informieren.<br /><br />
      
      <strong>Anfragendetails:</strong><br />
      Datum: ${e.timeslot.day}.${e.timeslot.month}.${e.timeslot.year}<br />
      Uhrzeit: ${e.timeslot.timeslot}<br /><br />
      
      Herzliche Grüße<br /><br />
      
      <strong>Eileen George</strong><br />
      Paar- und Sexualtherapeutin & Beziehungscoach<br />
      Breitscheidstraße 33<br />
      70176 Stuttgart<br />
      +49 1573 1664595<br />
      kontakt@eileengeorge.de<br /><br />
      ____<br />
      STORNIERUNGSRICHTLINIE<br />
      Eine kostenlose Stornierung Ihres Termins ist bis zu 48 Stunden vorher möglich. Danach wird eine Ausfallgebühr von 50% fällig.<br />
      </body></html>`},{name:"bookingConfirmationUser",subject:"Terminbestätigung",content:`<html><body>
      Liebe/r ${e.firstName} ${e.lastName},<br /><br />
    
      vielen Dank für Ihre Terminbuchung, die ich Ihnen hiermit gerne bestätige.<br /><br />

      ${e.place==="inPerson"?"Ich freue mich, Sie bald persönlich in meiner Praxis in Stuttgart zu empfangen.<br /><br />":"Ich sende Ihnen den entsprechenden Link für die Durchführung Ihres Onlinetermins im Vorfeld zu.<br /><br />"}
      
      <strong>Termin:</strong><br />
      Datum: ${e.timeslot.day}.${e.timeslot.month}.${e.timeslot.year}<br />
      Uhrzeit: ${e.timeslot.timeslot}<br /><br />
      
      Herzliche Grüße<br /><br />
      
      <strong>Eileen George</strong><br />
      Paar- und Sexualtherapeutin & Beziehungscoach<br />
      Breitscheidstraße 33<br />
      70176 Stuttgart<br />
      +49 1573 1664595<br />
      kontakt@eileengeorge.de<br /><br />
      ____<br />
      STORNIERUNGSRICHTLINIE<br />
      Eine kostenlose Stornierung Ihres Termins ist bis zu 48 Stunden vorher möglich. Danach wird eine Ausfallgebühr von 50% fällig.<br />
      </body></html>`},{name:"bookingRequestOwner",subject:`Neue Buchungsanfrage von ${e.firstName} ${e.lastName}`,content:`<html><body>
      Liebe Eileen,<br /><br />
    
      es liegt eine neue Buchung von ${e.firstName} ${e.lastName} im Backend bereit und wartet auf Moderation.<br />
      <a href="https://eileengeorge.de/buchungen" title="Eileen George Buchungen">Zu den Buchungen</a>
      <br /><br />
      
      <strong>Anfragendetails:</strong><br />
      Vorname: ${e.firstName}<br />
      Nachname: ${e.lastName}<br />
      Datum: ${e.timeslot.day}.${e.timeslot.month}.${e.timeslot.year}<br />
      Uhrzeit: ${e.timeslot.timeslot}<br />
      Terminart: ${e.appointmentType}<br />
      Leistung: ${e.service}<br />
      Ort: ${e.place}<br />
      Beschreibung des Themas: ${e.description}<br />
      Rechnungsadresse: ${e.invoiceAddress}<br /><br />
      E-Mail: ${e.mail}<br /><br />
      
      Herzliche Grüße aus dem Backend<br />
      <strong>Alex</strong><br />
      </body></html>`}].find(i=>i.name===r));function g(){const r=b();return{sendMail:async(t,i,n)=>{if(!(await fetch("https://api.brevo.com/v3/smtp/email",{method:"POST",headers:{accept:"application/json","api-key":r.public.BREVO_API_KEY,"content-type":"application/json"},body:JSON.stringify({sender:{email:"kontakt@eileengeorge.de",name:"Eileen George"},replyTo:{email:"kontakt@eileengeorge.de",name:"Eileen George"},to:[{email:i,name:`${n.firstName} ${n.lastName}`}],subject:s(t,n).subject,htmlContent:s(t,n).content})})).ok)return"Message could not be sent at this time."}}}export{g as u};
