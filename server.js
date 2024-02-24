import dotenv from 'dotenv';
import connectDB from './config/db.config.js';
import configureAPI from './config/api.js';
import songsRoute from './routes/songRoute.js';
dotenv.config();


// connectDB();

  
const waitConnection = async () => {
  await connectDB();

  // Create an Express app
  const app = configureAPI();

  // Define routes
  app.get("/", (request, response) => {
    return response.status(234).send("Song Managing App");
  });

  // Routes
  app.use("/songs", songsRoute);

  // Start the server
  const PORT = process.env.PORT || 8888;
  app.listen(PORT, () => {
    console.log(`App is listening to port: ${PORT}`);
  });
};

waitConnection();


