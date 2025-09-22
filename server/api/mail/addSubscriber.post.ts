import MailerLite from '@mailerlite/mailerlite-nodejs';

const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  try {
    const {
      email,
      name,
      lastName,
      company,
      country,
      city,
      phone,
      state,
      zip,
      groupId = "164511800528734081"
    } = await readBody(event);

    const mailerlite = new MailerLite({
      api_key: config.MAILERLITE_API_KEY
    });

    const params = {
      email: email,
      fields: {
        name: name || "",
        last_name: lastName || "",
        company: company || "",
        country: country || "",
        city: city || "",
        phone: phone || "",
        state: state || "",
        z_i_p: zip || ""
      },
      groups: [groupId],
      status: "active",
      subscribed_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
      ip_address: null,
      opted_in_at: null,
      optin_ip: null,
      unsubscribed_at: null
    };

    const response = await mailerlite.subscribers.createOrUpdate(params);

    console.log("Subscriber created/updated");
    return { success: true, subscriber: response.data };
  } catch (err) {
    console.log("error creating subscriber", err);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create subscriber'
    });
  }
});