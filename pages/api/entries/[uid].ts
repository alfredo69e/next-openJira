

import { db } from '@/db';
import { Entry, IEntry } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose';

type Data =  
    | {  messages: string }
    | IEntry

export default async function handler( req: NextApiRequest, res: NextApiResponse<Data>) {

    const { uid } = req.query;
    

    if( !mongoose.isValidObjectId( uid ) ) return res.status(400).json( { messages: `${ uid } el id no es valido` } );

    switch ( req.method ) {
        case 'PATCH':
            return patchEntry( req, res );
        case 'GET':
            return getEntry( req, res );
        default:
            return res.status(400).json({ messages: 'EndPoint no Exist' });
    }

   
}

const getEntry = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {

    const { uid } = req.query;

    try {

        await db.connect();
    
        const entrie = await Entry.findById<IEntry>( uid );

        await db.disconnect();

        if ( !entrie ) return res.status(404).json({ messages: 'No hay entrada con ese Id' + uid });

        return res.status(200).json( entrie! );
        
    } catch (err) {
        console.log( err );
        
        await db.disconnect();
        return res.status(500).json( { messages: 'Algo salio mal revisar la consola del servidor' } );
    }
    
}


const patchEntry = async ( req: NextApiRequest, res: NextApiResponse<Data> ) => {

    const { uid } = req.query;

    const { description = '', status } = req.body;


    if( !description || !status ) return res.status(404).json({ messages: 'description esta vacio' });
    
    try {
    
        await db.connect();
    
        const entrie = await Entry.findByIdAndUpdate<IEntry>( uid, { description, status }, { runValidators: true, new:  true } );

        await db.disconnect();
    
        if ( !entrie ) return res.status(404).json({ messages: 'No hay entrada con ese Id' + uid });

        return res.status(200).json( entrie! );
        
    } catch ( err ) {
        console.log( err );
        
        await db.disconnect();
        return res.status(500).json( { messages: 'Algo salio mal revisar la consola del servidor' } );
    }
} 