

import type { NextApiRequest, NextApiResponse } from 'next';
import client from '~/db/db';

interface IMDB {
    rating: number;
    votes: number;
    id: number;
  }
  export interface Movie {
    title: string;
    year: number;
    released: Date;
    plot: string;
    type: "movie" | "series";
    imdb: IMDB;
  }

interface Names {
    name: string;
    _id: string;
}

export default async function mongoTest(req: NextApiRequest, res: NextApiResponse){
    try {
        const db = client.db("test")
        const names = db.collection<Names>("names")
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const movie = await names.findOne(
            { name: "Matt" },
          );
;       if(movie){
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    res.json({message: movie });
    }else{
        res.json({message: 'no data found' });
    }
    } catch (e) {
       res.json({message: "MongoDB not connected"});
    }
}