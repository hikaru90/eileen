import{e as k}from"./entry.fb780137.js";const N=(s,e)=>{var i,n,l,g,c,h,u,d,r,$,p,t;return k(),[{name:"contactForm",subject:"Neue Kontaktanfrage",content:`<html><body>
      Liebe Eileen,<br /><br />
    
      es gibt eine neue Kontaktanfrage von Deiner Seite.<br /><br />

      Vorname: ${e==null?void 0:e.firstName}<br />
      Nachname: ${e==null?void 0:e.lastName}<br />
      E-Mail: ${e==null?void 0:e.mail}<br />
      Nachricht: ${e==null?void 0:e.message}<br /><br />

      Liebe Grüße aus dem Backend ♥️<br />
      </body></html>`},{name:"bookingRequestUser",subject:"Deine Buchungsanfrage bei Eileen George",content:`<html><body>
      Liebe/r ${e==null?void 0:e.firstName} ${e==null?void 0:e.lastName},<br /><br />
    
      vielen Dank für Deine Anfrage. Sobald ich Deine Daten geprüft habe, werde ich Dich umgehend über die Bestätigung des Termins informieren.<br /><br />
      
      <strong>Anfragendetails:</strong><br />
      Datum: ${(i=e==null?void 0:e.timeslot)==null?void 0:i.day}.${(n=e==null?void 0:e.timeslot)==null?void 0:n.month}.${(l=e==null?void 0:e.timeslot)==null?void 0:l.year}<br />
      Uhrzeit: ${(g=e==null?void 0:e.timeslot)==null?void 0:g.timeslot}<br /><br />
      
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
      </body></html>`},{name:"bookingConfirmationUser",subject:"Terminbestätigung",content:`<html><body>
      Liebe/r ${e==null?void 0:e.firstName} ${e==null?void 0:e.lastName},<br /><br />
    
      vielen Dank für Deine Terminbuchung, die ich Dir hiermit gerne bestätige.<br /><br />

      ${(e==null?void 0:e.place)==="inPerson"?"Ich freue mich, Dich bald persönlich zu empfangen.<br /><br />":"Ich sende Dir den entsprechenden Link für die Durchführung Deines Onlinetermins im Vorfeld zu.<br /><br />"}
      
      <strong>Termin:</strong><br />
      Datum: ${(c=e==null?void 0:e.timeslot)==null?void 0:c.day}.${(h=e==null?void 0:e.timeslot)==null?void 0:h.month}.${(u=e==null?void 0:e.timeslot)==null?void 0:u.year}<br />
      Uhrzeit: ${(d=e==null?void 0:e.timeslot)==null?void 0:d.timeslot}<br /><br />
      
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
      </body></html>`},{name:"bookingRequestOwner",subject:`Neue Buchungsanfrage von ${e==null?void 0:e.firstName} ${e==null?void 0:e.lastName}`,content:`<html><body>
      Liebe Eileen,<br /><br />
    
      es liegt eine neue Buchung von ${e==null?void 0:e.firstName} ${e==null?void 0:e.lastName} im Backend bereit und wartet auf Moderation.<br />
      <a href="https://eileengeorge.de/buchungen" title="Eileen George Buchungen">Zu den Buchungen</a>
      <br /><br />
      
      <strong>Anfragendetails:</strong><br />
      Vorname: ${e==null?void 0:e.firstName}<br />
      Nachname: ${e==null?void 0:e.lastName}<br />
      Datum: ${(r=e==null?void 0:e.timeslot)==null?void 0:r.day}.${($=e==null?void 0:e.timeslot)==null?void 0:$.month}.${(p=e==null?void 0:e.timeslot)==null?void 0:p.year}<br />
      Uhrzeit: ${(t=e==null?void 0:e.timeslot)==null?void 0:t.timeslot}<br />
      Terminart: ${e==null?void 0:e.appointmentType}<br />
      Leistung: ${e==null?void 0:e.service}<br />
      Ort: ${e==null?void 0:e.place}<br />
      Beschreibung des Themas: ${e==null?void 0:e.description}<br />
      Rechnungsadresse: ${e==null?void 0:e.invoiceAddress}<br /><br />
      E-Mail: ${e==null?void 0:e.mail}<br /><br />
      
      Viel Liebe aus dem Backend ♥️<br />
      <strong>Alex</strong><br />
      </body></html>`}].find(y=>y.name===s)};function T(){const s=k();return{sendMail:async(b,i,n)=>{if(!(await fetch("https://api.brevo.com/v3/smtp/email",{method:"POST",headers:{accept:"application/json","api-key":s.public.BREVO_API_KEY,"content-type":"application/json"},body:JSON.stringify({sender:{email:"kontakt@eileengeorge.de",name:"Eileen George"},replyTo:{email:"kontakt@eileengeorge.de",name:"Eileen George"},to:[{email:i,name:`${n.firstName} ${n.lastName}`}],subject:N(b,n).subject,htmlContent:N(b,n).content})})).ok)return"Message could not be sent at this time."}}}export{T as u};
