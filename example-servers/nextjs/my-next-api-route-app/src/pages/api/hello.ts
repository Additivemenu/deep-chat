// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type {NextApiRequest, NextApiResponse} from 'next';

type Data = {
  message?: string;
  error?: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>): void {
  const {method} = req;

  if (method === 'GET') {
    res.status(200).json({message: 'Hello World from api/hello'});
  } else {
    res.status(405).json({error: 'Method not allowed'});
  }
}
