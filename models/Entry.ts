import { Entry } from '@/interfaces';
import mongoose, { Model, Schema } from 'mongoose';

export interface IEntry extends Entry {}

const entryShema = new Schema({
    description: { type: String, required: true },
    createdAt: { type: Number },
    status: { 
        type: String, enum: {
            values: ['Pending', 'In-Progress', 'Completed'],
            message: '{VALUE} no is permitido'
        },
        default: 'Pending' 
    },
});

const EntryModel: Model<IEntry> = mongoose.models.Entry || mongoose.model('Entry', entryShema );

export default EntryModel;