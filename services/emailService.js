const sgMail = require('@sendgrid/mail');

const { BASE_URL, SENDGRID_API_KEY, SENDGRID_SENDER } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

exports.sendEmail = ({ to, subject, text = '', html = '' }) => {
  const msg = {
    to,
    from: SENDGRID_SENDER,
    subject,
    text,
    html,
  };

  return sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
    })
    .catch(error => {
      console.error(error);
    });
};

exports.sendVerificationEmail = (to, token) => {
  const verificationLink = `${BASE_URL}/api/users/verify/${token}`;

  return this.sendEmail({
    to,
    subject: 'Email verification',
    text: `Please verify your email. Go to the link ${verificationLink}`,
    html: `<a href="${verificationLink}">Verify your email</a>`,
  });
};
