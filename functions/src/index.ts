// eslint-disable-next-line @typescript-eslint/no-var-requires
import * as admin from "firebase-admin";
admin.initializeApp();
import * as functions from "firebase-functions";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sgMail = require("@sendgrid/mail");
const apiKey = functions.config().sendgrid.key;
sgMail.setApiKey(apiKey);

const templateId = "d-c2872a71f98048eb9159c5d0bf2507d8";

export const sendEmail = functions.firestore
    .document("information/{docId}")
    .onCreate((snapshot) => {
      const data = snapshot.data();
      const {
        personalInfo: {firstName = "", lastName = ""} = {},
        companyInfo: {companyName = ""} = {},
      } = data;
      const msg = {
        to: "jose.1032@live.com",
        from: "Team NameBadge<office@handihow.com>",
        templateId: templateId,
        dynamic_template_data: {
          firstName,
          lastName,
          companyName,
        },
      };
      return sgMail
          .send(msg)
          .then(() => {
            return {
              success: true,
            };
          })
          .catch((error:any) => {
            return {
              success: false,
              message: error.message,
            };
          });
    });
