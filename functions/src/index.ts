// eslint-disable-next-line @typescript-eslint/no-var-requires
import * as admin from "firebase-admin";
admin.initializeApp();
const db = admin.firestore();
import * as functions from "firebase-functions";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sgMail = require("@sendgrid/mail");
const apiKey = functions.config().sendgrid.key;
sgMail.setApiKey(apiKey);

const templateId = "d-c2872a71f98048eb9159c5d0bf2507d8";

export const sendEmail = functions.firestore
    .document("information/{docId}")
    .onCreate((snapshot) => {
      const data = snapshot.data();
      const id = snapshot.id;
      const {
        personalInfo: {firstName = "", lastName = ""} = {},
        companyInfo: {companyName = ""} = {},
        files = [],
      } = data;
      const msg = {
        to: "jose.1032@live.com",
        from: "Team NameBadge<office@handihow.com>",
        templateId: templateId,
        dynamic_template_data: {
          firstName,
          lastName,
          companyName,
          files,
        },
      };
      return (
        sgMail
            .send(msg)
            .then(() => {
              db.collection("information").doc(id).update({
                success: true,
                sgResponse: true,
                message: msg,
              });
              return;
            })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .catch((error: any) => {
              db.collection("information")
                  .doc(id)
                  .update({
                    success: false,
                    sgResponse: true,
                    message: msg,
                    error:
                      error.message ? error.message : JSON.stringify(error),
                  });
              return;
            })
      );
    });
