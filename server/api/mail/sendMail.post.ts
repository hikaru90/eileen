import { getTemplate } from '~~/composables/useBrevo'
const config = useRuntimeConfig();

const sendMail = async (template: string, to: string, formData: object) => {
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
        name: `Eileen George`,
      },
      replyTo: {
        email: "kontakt@eileengeorge.de",
        name: `Eileen George`,
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

export default defineEventHandler(async (event) => {
  try {
    const { template, recipient, formData } = await readBody(event);

    await sendMail(template, recipient, formData);

    console.log("Email sent");
    return true;
  } catch (err) {
    console.log("error sending mail", err);
  }
});
