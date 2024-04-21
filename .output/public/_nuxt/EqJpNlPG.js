import{T as N}from"./COIFjB77.js";const k=(s,e)=>{var i,n,l,g,c,r,h,u,d,t,$,p;return[{name:"contactForm",subject:"Neue Kontaktanfrage",content:`<html><body>
      Liebe Eileen,<br /><br />
    
      es gibt eine neue Kontaktanfrage von Deiner Seite.<br /><br />

      Vorname: ${e==null?void 0:e.firstName}<br />
      Nachname: ${e==null?void 0:e.lastName}<br />
      E-Mail: ${e==null?void 0:e.mail}<br />
      Nachricht: ${e==null?void 0:e.message}<br /><br />

      Viel Liebe aus dem Backend ♥️<br />
      </body></html>`},{name:"bookingRequestUser",subject:"Deine Buchungsanfrage bei Eileen George",content:`<html><body>
      Liebe/r ${e==null?void 0:e.firstName} ${e==null?void 0:e.lastName},<br /><br />
    
      vielen Dank für Deine Terminanfrage.<br/>
      Sobald ich Deine Daten geprüft habe, melde ich mich noch einmal für die Bestätigung des Termins bei Dir.<br /><br />
      
      <strong>Anfragendetails:</strong><br />
      Datum: ${(i=e==null?void 0:e.timeslot)==null?void 0:i.day}.${(n=e==null?void 0:e.timeslot)==null?void 0:n.month}.${(l=e==null?void 0:e.timeslot)==null?void 0:l.year}<br />
      Uhrzeit: ${(g=e==null?void 0:e.timeslot)==null?void 0:g.timeslot}<br /><br />
      
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
      </body></html>`},{name:"bookingConfirmationUser",subject:"Terminbestätigung",content:`<html><body>
      Liebe/r ${e==null?void 0:e.firstName} ${e==null?void 0:e.lastName},<br /><br />
      
      Ich habe mir Deinen Wunschtermin eingetragen und freue mich sehr auf unsere gemeinsame Sitzung.<br/>
      Für die endgültige Bestätigung des Termins, überweise bitte den Rechnungsbetrag über folgenden Link:
      paypal.com/XXX<br /><br />

      <strong>Termin:</strong><br />
      Datum: ${(c=e==null?void 0:e.timeslot)==null?void 0:c.day}.${(r=e==null?void 0:e.timeslot)==null?void 0:r.month}.${(h=e==null?void 0:e.timeslot)==null?void 0:h.year}<br />
      Uhrzeit: ${(u=e==null?void 0:e.timeslot)==null?void 0:u.timeslot}<br /><br />


      ${(e==null?void 0:e.place)==="inPerson"?"Ich freue mich, Dich bald in meinen Räumlichkeiten in Harrislee zu empfangen, melde mich davor aber noch einmal persönlich bei Dir per Mail.<br /><br />":"Ich sende Dir den entsprechenden Link für die Durchführung Deines Onlinetermins im Vorfeld zu und melde mich davor aber auch einmal persönlich per Mail bei Dir.<br /><br />"}

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
      </body></html>`},{name:"bookingRequestOwner",subject:`Neue Buchungsanfrage von ${e==null?void 0:e.firstName} ${e==null?void 0:e.lastName}`,content:`<html><body>
      Liebe Eileen,<br /><br />
    
      es liegt eine neue Buchung von ${e==null?void 0:e.firstName} ${e==null?void 0:e.lastName} im Backend bereit und wartet auf Moderation.<br />
      <a href="https://eileengeorge.de/buchungen" title="Eileen George Buchungen">Zu den Buchungen</a>
      <br /><br />
      
      <strong>Anfragendetails:</strong><br />
      Vorname: ${e==null?void 0:e.firstName}<br />
      Nachname: ${e==null?void 0:e.lastName}<br />
      Datum: ${(d=e==null?void 0:e.timeslot)==null?void 0:d.day}.${(t=e==null?void 0:e.timeslot)==null?void 0:t.month}.${($=e==null?void 0:e.timeslot)==null?void 0:$.year}<br />
      Uhrzeit: ${(p=e==null?void 0:e.timeslot)==null?void 0:p.timeslot}<br />
      Terminart: ${e==null?void 0:e.appointmentType}<br />
      Leistung: ${e==null?void 0:e.service}<br />
      Ort: ${e==null?void 0:e.place}<br />
      Beschreibung des Themas: ${e==null?void 0:e.description}<br />
      Rechnungsadresse: ${e==null?void 0:e.invoiceAddress}<br /><br />
      E-Mail: ${e==null?void 0:e.mail}<br /><br />
      
      Viel Liebe aus dem Backend ♥️<br />
      <strong>Alex</strong><br />
      </body></html>`}].find(y=>y.name===s)};function E(){const s=N();return{sendMail:async(b,i,n)=>{if(!(await fetch("https://api.brevo.com/v3/smtp/email",{method:"POST",headers:{accept:"application/json","api-key":s.public.BREVO_API_KEY,"content-type":"application/json"},body:JSON.stringify({sender:{email:"kontakt@eileengeorge.de",name:"Eileen George"},replyTo:{email:"kontakt@eileengeorge.de",name:"Eileen George"},to:[{email:i,name:`${n.firstName} ${n.lastName}`}],subject:k(b,n).subject,htmlContent:k(b,n).content})})).ok)return"Message could not be sent at this time."}}}export{E as u};
