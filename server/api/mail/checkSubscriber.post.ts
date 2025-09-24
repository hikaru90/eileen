import MailerLite from '@mailerlite/mailerlite-nodejs';

const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  try {
    const { email, groupId = "164511800528734081" } = await readBody(event);

    if (!email) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Email is required'
      });
    }

    // Initialize MailerLite
    const mailerlite = new MailerLite({
      api_key: config.MAILERLITE_API_KEY
    });

    try {
      // Fetch single subscriber by email using direct API call
      console.log("Attempting to find subscriber:", email);
      const response = await fetch(`https://connect.mailerlite.com/api/subscribers/${email}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${config.MAILERLITE_API_KEY}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 404) {
          console.log("Subscriber not found:", email);
          return {
            subscribed: false,
            status: null,
            subscriber: null
          };
        }
        throw new Error(`MailerLite API error: ${response.status}`);
      }

      const data = await response.json();
      const subscriber = data.data;

      if (!subscriber) {
        console.log("Subscriber not found:", email);
        return {
          subscribed: false,
          status: null,
          subscriber: null
        };
      }

      console.log("Full subscriber data:", JSON.stringify(subscriber, null, 2));
      console.log("Looking for group ID:", groupId);
      console.log("Subscriber groups:", subscriber.groups);

      const isInGroup = subscriber.groups && subscriber.groups.some(group => {
        console.log("Checking group:", group.id, "vs", groupId, "Match:", group.id === groupId);
        return group.id === groupId;
      });
      const isActive = subscriber.status === 'active';

      console.log("Subscriber found:", email, "Status:", subscriber.status, "In group:", isInGroup);

      return {
        subscribed: isActive && isInGroup,
        status: subscriber.status,
        inGroup: isInGroup,
        subscriber: {
          id: subscriber.id,
          email: subscriber.email,
          status: subscriber.status,
          subscribed_at: subscriber.subscribed_at,
          opted_in_at: subscriber.opted_in_at,
          groups: subscriber.groups
        },
        debug: {
          fullResponse: subscriber,
          groupId: groupId,
          isActive: isActive,
          isInGroup: isInGroup
        }
      };
    } catch (mailerliteError) {
      // MailerLite returns 404 if subscriber doesn't exist
      if (mailerliteError.status === 404) {
        console.log("Subscriber not found:", email);
        return {
          subscribed: false,
          status: null,
          subscriber: null
        };
      }

      // Re-throw other MailerLite errors
      throw mailerliteError;
    }

  } catch (err) {
    console.error("Error checking subscriber:", err);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to check subscriber status'
    });
  }
});