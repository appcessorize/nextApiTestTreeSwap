const { Client, resources } = require("coinbase-commerce-node");
Client.init(process.env.CLIENT);

const { Charge } = resources;
import cors from "cors";
// const cors = require("cors")({ origin: "*" });

export default function handler(req, res) {
  if (req.method === "POST") {
    const testReq = JSON.parse(req.body);
    console.log("testReq ", testReq);
    console.log("testReq", testReq, "req", req, "req.body", req.body);
    cors(req, res, async () => {
      const chargeData = JSON.parse(req.body);
      const charge = await Charge.create(chargeData);

      res.send(charge);
    });
  } else {
    console.log("not POST");
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
}
