
import express from "express";
import cors from "cors";

const configureAPI = () => {
  const app = express();

  // app.use(cors());
  
  // Lets's restrict the origins
  app.use(
    cors({
      origin: process.env.ORIGIN,
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type"],
    })
  );
  app.use(express.json());

  return app;
};

export default configureAPI;
