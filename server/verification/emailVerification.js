import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_SERVER,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const emailVerification = async (token, email) => {
  console.log("token==>>", token);
  console.log("email==>>", email);
  const info = await transporter.sendMail({
    from: '"Kostas" <kosb999663@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Email verification", // Subject line
    text: "Please vierify your email", // plain text body
    html: `
    <h3>Welcome to our e-shop app</h3>
    <p>To verify your email please click on the following link:</p>
    <a href="https://full-stack-e-shop-client.vercel.app/emailconfirm/${token}">verify my email</a>`,
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
  //       <https://github.com/forwardemail/preview-email>
  // http://localhost:5173/emailconfirm/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWMyOGE5NjZiZjVjNTI0Y2IwMmRiYWIiLCJpYXQiOjE3MDcyNDgyNzgsImV4cCI6MTcwNzMzNDY3OH0.b1XLnhQrOxfCKzUtBGneyBDGE_k2cpOPQi1ZomsaHcE
};

export const changePassVerification = async (token, email) => {
  const info = await transporter.sendMail({
    from: '"Kostas" <kosb999663@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Instructions to change your password", // Subject line
    text: "Follow the liink to change your password", // plain text body
    html: `
    <h3>Welcome to our e-shop app</h3>
    <p>To change your password please click on the following link:</p>
    <a href="https://full-stack-e-shop-client.vercel.app/changepass/${token}">Change password</a>`,
  });

  console.log("Message sent: %s", info.messageId);
};
