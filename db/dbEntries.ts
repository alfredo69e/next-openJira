import { Entry, IEntry } from '@/models';
import { isValidObjectId } from 'mongoose';
import { db } from './';


export const getEntryById = async( uid: string ): Promise<IEntry | null> => {
    if( !isValidObjectId( uid ) ) {
        return null;
    }

    await db.connect();

    const entry = await Entry.findById(uid).lean();

    await db.disconnect();

    return !entry ? null : JSON.parse( JSON.stringify( entry ) );
}