import MailerLite from '@mailerlite/mailerlite-nodejs';

const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const { token } = query;

    if (!token) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Confirmation token is required'
      });
    }

    // Decode and validate token
    let confirmationData;
    try {
      const decodedToken = Buffer.from(token as string, 'base64url').toString('utf-8');
      confirmationData = JSON.parse(decodedToken);
    } catch (error) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid confirmation token'
      });
    }

    // Check if token is not older than 24 hours (optional security measure)
    const tokenAge = Date.now() - confirmationData.timestamp;
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    if (tokenAge > maxAge) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Confirmation token has expired'
      });
    }

    // Extract data from token
    const { email, groupId, redirectUrl, showSuccessPage } = confirmationData;

    // Initialize MailerLite
    const mailerlite = new MailerLite({
      api_key: config.MAILERLITE_API_KEY
    });

    let groupIdsParam = ['164511800528734081'];
    if (!groupIdsParam.includes(groupId)) {
      groupIdsParam.push(groupId);
    }

    // Add subscriber to MailerLite
    const params = {
      email: email,
      fields: {},
      groups: groupIdsParam,
      status: "active",
      subscribed_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
      opted_in_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
    };

    const response = await mailerlite.subscribers.createOrUpdate(params);

    console.log("Subscriber confirmed and added to MailerLite:", email);

    // Set cookie to allow downloads
    setCookie(event, 'subscribed', 'true', {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      httpOnly: false, // Allow client-side access
      secure: false, // Set to true in production with HTTPS
      sameSite: 'lax'
    });

    // Redirect based on showSuccessPage flag
    if (showSuccessPage) {
      await sendRedirect(event, '/newsletter-success');
    } else {
      await sendRedirect(event, redirectUrl || '/');
    }

  } catch (err) {
    console.error("Error confirming subscription:", err);

    // Redirect to home page with error (or could redirect to a specific error page)
    await sendRedirect(event, '/?error=confirmation_failed');
  }
});