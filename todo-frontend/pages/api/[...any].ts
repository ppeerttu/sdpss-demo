import http from "http";
import { NextApiRequest, NextApiResponse } from "next";

import { config as apiConfig } from "../../config";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export const config = {
  api: {
    // Tell Next.js to not parse body as we're piping it
    bodyParser: false,
  },
};

/**
 * Proxy handler that passes all request to the proxy target.
 */
export default (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  return new Promise((resolve) => {
    const options: http.RequestOptions = {
      hostname: apiConfig.apiHostName,
      port: apiConfig.apiPort,
      path: req.url,
      method: req.method,
      headers: req.headers,
      timeout: 2000,
    };

    const proxy = http.request(options, (proxyRes) => {
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res);
      resolve();
    });

    proxy.on("error", (e) => {
      console.error("Proxy emitted an error", e);
      res.status(503).send({ message: "Service unavailable" });
      resolve();
    });

    proxy.on("timeout", () => {
      console.error("Proxy request timed out");
      res.status(504).send({ message: "Upstream timed out" });
      resolve();
    });

    req.pipe(proxy);
  });
};
