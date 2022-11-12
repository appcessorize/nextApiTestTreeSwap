const { Webhook } = require("coinbase-commerce-node");

export default async (req, res) => {
  const rawBody = req.rawBody;
  const signature = req.headers["x-cc-webhook-signature"];
  const webhookSecret = process.env.WEBHOOKSECRET;

  try {
    const event = Webhook.verifyEventBody(rawBody, signature, webhookSecret);
    if (event.type === "charge:pending") {
      res.status(200).send("Status Working -pending");
      // TODO
      // user paid, but transaction not confirm on blockchain yet
    }
    if (event.type === "charge:confirmed") {
      // TODO
      res.status(200).send("Status Working -confirmed");
      // all good, charge confirmed
    }
    if (event.type === "charge:failed") {
      res.status(200).send("Status Working -failed");
      // TODO
      // charge failed or expired
    }
    res.send(`success ${event.id}`);
  } catch (error) {
    res.status(400).send("failure!");
  }
};
