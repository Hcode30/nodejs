import mongoose from 'mongoose';

export function ConnectToDB(DatabaseUrl) {
  mongoose.connect(DatabaseUrl).then(() => {
    console.log(`Connected To Database Successfully.`);
  });
}
