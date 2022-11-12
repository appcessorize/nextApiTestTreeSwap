const { Client, resources } = require("coinbase-commerce-node");
Client.init(process.env.CLIENT);

const { Charge } = resources;

import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Run the middleware
  await runMiddleware(req, res, cors);

  // Rest of the API logic
  // if (req.method === "POST") {
  // const testReq = JSON.parse(req.body);

  cors(req, res, async () => {
    const chargeData = JSON.parse(req.body);
    const charge = await Charge.create(chargeData);
    res.send(charge);
  });
  // } else {
  //   console.log("not POST");
  //   res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  // }
}

// const cors = require("cors")({ origin: "*" });

// export default function handler(req, res) {
//   if (req.method === "POST") {
//     const testReq = JSON.parse(req.body);
//     console.log("testReq ", testReq);
//     console.log("testReq", testReq, "req", req, "req.body", req.body);
//     cors(req, res, async () => {
//       const chargeData = JSON.parse(req.body);
//       const charge = await Charge.create(chargeData);

//       res.send(charge);
//     });
//   } else {
//     console.log("not POST");
//     res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
//   }
// }
