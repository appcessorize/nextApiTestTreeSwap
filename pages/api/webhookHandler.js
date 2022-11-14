const { Webhook } = require("coinbase-commerce-node");
import { buffer } from "micro";
export default async (req, res) => {
  // const rawBody = req.rawBody;
  const body = (await buffer(req)).toString();
  const data = JSON.parse(body);
  const signature = req.headers["x-cc-webhook-signature"]?.toString();
  const webhookSecret = process.env.WEBHOOKSECRET;
  if (
    !signature &&
    !signatureHelper.isValidSignatureFromString(
      rawBody,
      webhookSecret,
      signature
    )
  ) {
    return res.status(401);
  }

  try {
    const event = Webhook.verifyEventBody(rawBody, signature, webhookSecret);
    if (event.type === "charge:pending") {
      res.status(200).send("Status Working -pending");
      console.log("webhook: ", event.type);
      // TODO
      // user paid, but transaction not confirm on blockchain yet
    }
    if (event.type === "charge:confirmed") {
      console.log("webhook: ", event.type);
      // TODO
      res.status(200).send("Status Working -confirmed");
      // all good, charge confirmed
    }
    if (event.type === "charge:failed") {
      console.log("webhook: ", event.type);
      res.status(200).send("Status Working -failed");
      // TODO
      // charge failed or expired
    }
    res.send(`success ${event.id}`);
  } catch (error) {
    console.log("request: ", req);
    console.log("RawBody: ", rawBody);
    console.log("webhook: error");
    res.status(400).send("failure!");
  }
};
export const config = {
  api: {
    bodyParser: false,
  },
};
