import { Client, Webhook } from "coinbase-commerce-node";
Client.init(process.env.CLIENT);
export default async (req, res) => {
  try {
    const rawBody = JSON.stringify(req.body);
    const signature = String(req.headers["x-cc-webhook-signature"]);
    const webhookSecret = process.env.WEBHOOKSECRET;
    const event = Webhook.verifyEventBody(rawBody, signature, webhookSecret);
    console.log("event", event);
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
    res.status(400).send("failure!");
  }
};
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };
