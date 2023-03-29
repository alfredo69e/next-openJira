import mongoose from 'mongoose';

const mongoConnection = {
    isConnected: 0
}

export const connect = async () => {
    if( mongoConnection.isConnected === 1 ) {
        console.log(' ya estabamos conectados');
        return;
    }

    if( mongoose.connections.length > 0 ) {
        mongoConnection.isConnected = mongoose.connections[0].readyState;

        if(  mongoConnection.isConnected === 1 ) {
            console.log(' usando conecction anterior ');
            return;
        }

        await mongoose.disconnect();

    }

    await mongoose.connect(process.env.MONGO ?? '');

    mongoConnection.isConnected = 1;

    console.log(' Connectado a mongo ', process.env.MONGO ?? '');
}

export const disconnect = async () => {
    if ( mongoConnection.isConnected === 0 ) return;
    mongoConnection.isConnected = 0;
    mongoose.disconnect();
    console.log(' desconectado a mongo ');
}