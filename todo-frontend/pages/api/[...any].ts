import http from "http";
import { NextApiRequest, NextApiResponse } from "next";

import { config } from "../../config";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req: NextApiRequest, res: NextApiResponse): void => {
  const options: http.RequestOptions = {
    hostname: config.apiHostName,
    port: config.apiPort,
    path: req.url,
    method: req.method,
    headers: req.headers,
  };

  const proxy = http.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res, {
      end: true,
    });
  });

  req.pipe(proxy, {
    end: true,
  });
};
