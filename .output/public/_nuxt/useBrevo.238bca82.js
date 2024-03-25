import{e as k}from"./entry.bb92167b.js";const N=(s,e)=>{var i,n,l,h,u,c,g,d,r,t,p,$;return k(),[{name:"contactForm",subject:"Neue Kontaktanfrage",content:`<html><body>
      Liebe Dimple,<br /><br />
    
      es gibt eine neue Kontaktanfrage von Deiner Seite.<br /><br />

      Vorname: ${e==null?void 0:e.firstName}<br />
      Nachname: ${e==null?void 0:e.lastName}<br />
      E-Mail: ${e==null?void 0:e.mail}<br />
      Nachricht: ${e==null?void 0:e.message}<br /><br />

      Liebe Grüße aus dem Backend<br />
      </body></html>`},{name:"bookingRequestUser",subject:"Ihre Buchungsanfrage bei Dimple Goertz",content:`<html><body>
      Liebe/r ${e==null?void 0:e.firstName} ${e==null?void 0:e.lastName},<br /><br />
    
      vielen Dank für Ihre Anfrage. Sobald ich Ihre Daten geprüft habe, werde ich Sie umgehend über die Bestätigung Ihres Termins informieren.<br /><br />
      
      <strong>Anfragendetails:</strong><br />
      Datum: ${(i=e==null?void 0:e.timeslot)==null?void 0:i.day}.${(n=e==null?void 0:e.timeslot)==null?void 0:n.month}.${(l=e==null?void 0:e.timeslot)==null?void 0:l.year}<br />
      Uhrzeit: ${(h=e==null?void 0:e.timeslot)==null?void 0:h.timeslot}<br /><br />
      
      Herzliche Grüße<br /><br />
      
      <strong>Dimple Goertz</strong><br />
      Paar- und Sexualtherapeutin & Beziehungscoach<br />
      Breitscheidstraße 33<br />
      70176 Stuttgart<br />
      +49 1573 1664595<br />
      kontakt@dimplegoertz.de<br /><br />
      ____<br />
      STORNIERUNGSRICHTLINIE<br />
      Eine kostenlose Stornierung Ihres Termins ist bis zu 48 Stunden vorher möglich. Danach wird eine Ausfallgebühr von 50% fällig.<br />
      </body></html>`},{name:"bookingConfirmationUser",subject:"Terminbestätigung",content:`<html><body>
      Liebe/r ${e==null?void 0:e.firstName} ${e==null?void 0:e.lastName},<br /><br />
    
      vielen Dank für Ihre Terminbuchung, die ich Ihnen hiermit gerne bestätige.<br /><br />

      ${(e==null?void 0:e.place)==="inPerson"?"Ich freue mich, Sie bald persönlich in Stuttgart zu empfangen.<br /><br />":"Ich sende Ihnen den entsprechenden Link für die Durchführung Ihres Onlinetermins im Vorfeld zu.<br /><br />"}
      
      <strong>Termin:</strong><br />
      Datum: ${(u=e==null?void 0:e.timeslot)==null?void 0:u.day}.${(c=e==null?void 0:e.timeslot)==null?void 0:c.month}.${(g=e==null?void 0:e.timeslot)==null?void 0:g.year}<br />
      Uhrzeit: ${(d=e==null?void 0:e.timeslot)==null?void 0:d.timeslot}<br /><br />
      
      Herzliche Grüße<br /><br />
      
      <strong>Dimple Goertz</strong><br />
      Paar- und Sexualtherapeutin & Beziehungscoach<br />
      Breitscheidstraße 33<br />
      70176 Stuttgart<br />
      +49 1573 1664595<br />
      kontakt@dimplegoertz.de<br /><br />
      ____<br />
      STORNIERUNGSRICHTLINIE<br />
      Eine kostenlose Stornierung Ihres Termins ist bis zu 48 Stunden vorher möglich. Danach wird eine Ausfallgebühr von 50% fällig.<br />
      </body></html>`},{name:"bookingRequestOwner",subject:`Neue Buchungsanfrage von ${e==null?void 0:e.firstName} ${e==null?void 0:e.lastName}`,content:`<html><body>
      Liebe Dimple,<br /><br />
    
      es liegt eine neue Buchung von ${e==null?void 0:e.firstName} ${e==null?void 0:e.lastName} im Backend bereit und wartet auf Moderation.<br />
      <a href="https://dimplegoertz.de/buchungen" title="Dimple Goertz Buchungen">Zu den Buchungen</a>
      <br /><br />
      
      <strong>Anfragendetails:</strong><br />
      Vorname: ${e==null?void 0:e.firstName}<br />
      Nachname: ${e==null?void 0:e.lastName}<br />
      Datum: ${(r=e==null?void 0:e.timeslot)==null?void 0:r.day}.${(t=e==null?void 0:e.timeslot)==null?void 0:t.month}.${(p=e==null?void 0:e.timeslot)==null?void 0:p.year}<br />
      Uhrzeit: ${($=e==null?void 0:e.timeslot)==null?void 0:$.timeslot}<br />
      Terminart: ${e==null?void 0:e.appointmentType}<br />
      Leistung: ${e==null?void 0:e.service}<br />
      Ort: ${e==null?void 0:e.place}<br />
      Beschreibung des Themas: ${e==null?void 0:e.description}<br />
      Rechnungsadresse: ${e==null?void 0:e.invoiceAddress}<br /><br />
      E-Mail: ${e==null?void 0:e.mail}<br /><br />
      
      Herzliche Grüße aus dem Backend<br />
      <strong>Alex</strong><br />
      </body></html>`}].find(y=>y.name===s)};function z(){const s=k();return{sendMail:async(b,i,n)=>{if(!(await fetch("https://api.brevo.com/v3/smtp/email",{method:"POST",headers:{accept:"application/json","api-key":s.public.BREVO_API_KEY,"content-type":"application/json"},body:JSON.stringify({sender:{email:"kontakt@eileengeorge.de",name:"Eileen George"},replyTo:{email:"kontakt@eileengeorge.de",name:"Eileen George"},to:[{email:i,name:`${n.firstName} ${n.lastName}`}],subject:N(b,n).subject,htmlContent:N(b,n).content})})).ok)return"Message could not be sent at this time."}}}export{z as u};
