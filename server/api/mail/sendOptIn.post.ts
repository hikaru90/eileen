const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  try {
    const { email, groupId = "164511800528734081", redirectUrl = "/", showSuccessPage = false } = await readBody(event);

    if (!email) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Email is required'
      });
    }

    // Generate confirmation token (simple base64 encoding for now)
    const confirmationData = {
      email,
      groupId,
      redirectUrl,
      showSuccessPage,
      timestamp: Date.now()
    };
    const token = Buffer.from(JSON.stringify(confirmationData)).toString('base64url');

    // Create confirmation URL
    const confirmationUrl = `${config.public.BASE_URL}/api/mail/confirmSubscription?token=${token}`;

    // Determine if this is newsletter or workshop signup
    const isNewsletterGroup = groupId === "164511800528734081";
    const signupType = isNewsletterGroup ? "Newsletter" : "Workshop";
    const signupTypeGerman = isNewsletterGroup ? "Newsletter" : "Workshop";

    // Send opt-in email via Brevo
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": config.BREVO_API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: {
          email: "kontakt@eileengeorge.de",
          name: "Eileen George",
        },
        replyTo: {
          email: "kontakt@eileengeorge.de",
          name: "Eileen George",
        },
        to: [{ email: email, name: isNewsletterGroup ? "Newsletter Subscriber" : "Workshop Subscriber" }],
        subject: `Bestätige deine ${signupTypeGerman}-Anmeldung`,
        htmlContent: `
          <html>
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Nunito:wght@300;400;600;700&display=swap" rel="stylesheet">
            </head>
            <body style="font-family: 'Nunito', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">

              <!-- Header with gradient background -->
              <div style="padding: 40px 30px; text-align: center; margin-bottom: 30px;">
                <h1 style="font-family: 'Playfair Display', serif; font-style: italic; color: #724622; font-size: 32px; margin: 0 0 10px 0;">
                  Eileen George
                </h1>
                <p style="color: #42250E; font-size: 16px; margin: 0; font-weight: 300;">
                  Psychologisches Coaching • Selbstwert & Innere Kind Arbeit • Embodiment
                </p>
              </div>

              <!-- Main content -->
              <div style="background: white; border-radius: 10px; padding: 40px 30px; box-shadow: 0 4px 15px rgba(114, 70, 34, 0.1); margin-bottom: 20px;">
                <p style="color: #724622; font-size: 16px; line-height: 1.7; margin-bottom: 30px; font-weight: 400;">
                  vielen Dank für dein Interesse an mein${isNewsletterGroup ? 'em Newsletter' : 'en Workshops'}! Um deine Anmeldung abzuschließen, klicke bitte auf den folgenden Link:
                </p>

                <!-- CTA Button -->
                <div style="text-align: center; margin: 40px 0;">
                  <a href="${confirmationUrl}"
                     style="display: inline-block; background-color: #be8f12; color: white; padding: 18px 35px; text-decoration: none; border-radius: 50px; font-weight: 700; font-size: 16px; box-shadow: 0 4px 15px rgba(190, 143, 18, 0.3); transition: all 0.3s ease; text-shadow: 0 1px 2px rgba(0,0,0,0.1);">
                    ${signupTypeGerman}-Anmeldung bestätigen
                  </a>
                </div>

                <p style="color: #999; font-size: 14px; line-height: 1.6; margin: 30px 0 0 0; text-align: center;">
                  Falls du diese E-Mail nicht angefordert hast, kannst du sie einfach ignorieren.<br>
                  Ohne Bestätigung wird deine E-Mail-Adresse nicht zu unserer Liste hinzugefügt.
                </p>
              </div>

              <!-- Footer -->
              <div style="text-align: center; color: #999; font-size: 12px; line-height: 1.6; padding: 20px 0;">
                <p style="margin: 0 0 10px 0;">
                  <strong style="color: #724622;">Eileen George</strong>
                </p>
                <p style="margin: 0;">
                  Werkstraße 5 • 24955 Harrislee<br>
                  <a href="mailto:kontakt@eileengeorge.de" style="color: #be8f12; text-decoration: none;">kontakt@eileengeorge.de</a> •
                  <a href="tel:+4915251402928" style="color: #be8f12; text-decoration: none;">+49 1525 140 2928</a>
                </p>
              </div>
            </body>
          </html>
        `,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Brevo API error:', errorData);
      throw createError({
        statusCode: response.status,
        statusMessage: 'Failed to send opt-in email'
      });
    }

    console.log("Opt-in email sent to:", email);
    return { success: true, message: 'Opt-in email sent successfully' };
  } catch (err) {
    console.error("Error sending opt-in email:", err);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to send opt-in email'
    });
  }
});