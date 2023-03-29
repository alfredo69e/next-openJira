import { db } from '@/db';
import { Entry, IEntry } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = 
    | { messages: string }
    | IEntry[]
    | IEntry

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch ( req.method ) {
        case 'GET':
            return getEntries( res );
        case 'POST':
            return postEntry( req, res );
        default:
            return res.status(400).json({ messages: 'EndPoint no Exist' });
    }
    
}

const getEntries = async( res: NextApiResponse<Data> ) => {

    await db.connect();

    const entries = await Entry.find().sort({ createdAt: 'ascending' });

    await db.disconnect();

    return res.status(200).json( entries );
}

const postEntry = async ( req: NextApiRequest, res: NextApiResponse<Data> ) => {

    const { description = '' } = req.body;

    if( !description ) return res.status(404).json({ messages: 'description esta vacio' });

    const newEntry = new Entry({
        description,
        createdAt: Date.now(),
    });

    try {

        await db.connect();

        await newEntry.save();

        await db.disconnect();

        return res.status(201).json( newEntry );
        
    } catch ( err ) {
        console.log( err );
        
        await db.disconnect();
        return res.status(500).json( { messages: 'Algo salio mal revisar la consola del servidor' } );
    }
} 


