import mongoose from 'mongoose';

export default function ConnectToDB(DatabaseUrl) {
  mongoose
    .connect(DatabaseUrl, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      autoIndex: true,
    })
    .then(() => {
      console.log(`Connected To Database Successfully.`);
    });
  mongoose.connection.syncIndexes();
}
