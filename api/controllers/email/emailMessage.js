import { Resend } from "resend";
import { Filter } from "bad-words";
import { emailMessages } from "../../models/email/emailMessage";

export const sendEmailMessageController = async (req, res) => {
  const { to, subject, message } = req.body;
  console.log(
    "🚀 ~ sendEmailMessageController ~ to, subject, message:",
    to,
    subject,
    message
  );
  const resend = new Resend("re_XnWiMe1q_AaNRKMH51uq4RB3RrqCN1z8k");
  const emailMessage = subject + " " + message;

  const filter = new Filter();
  const isProfane = filter.isProfane(emailMessage);

  if (isProfane) throw new Error("email send failed");

  try {
    const data = await resend.emails.send({
      from: `Red <onboarding@resend.dev>`,
      // to: [to],
      to: ["mr.redmasterr@gmail.com"],
      subject,
      html: message,
    });
    await emailMessages.create({
      sentBy: req?.user?.id,
      from: req?.user?.email,
      to,
      message,
      subject,
    });
    res.json(data);
  } catch (error) {
    res.json(error);
  }
};
