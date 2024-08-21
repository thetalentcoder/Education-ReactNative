import React, { useCallback } from "react";
import Mailer from "react-native-mail";

const useSendEmail = () => {
  const sendMail = useCallback(
    ({ subject, description, isHTML, attachments, userid } = {}) => {
      const problemSubject = subject;
      return new Promise((resolve, reject) => {
        Mailer.mail(
          {
            // subject,
            subject: problemSubject,
            recipients: ["jokernthn@gmail.com"], // replace with your email
            body: `${description}<br/><br/> Account Id: ${userid}`,
            isHTML,
            attachments,
          },
          (error, event) => {
            if (error) {
              return reject(error);
            }

            resolve(event);
          }
        );
      });
    }, []);

  return {
    sendMail,
  };
};

export default useSendEmail;