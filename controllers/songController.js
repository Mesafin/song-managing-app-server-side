
import { Song } from "../models/songModel.js";
import mongoose from "mongoose";

// Route for Get All Songs from database

export const getAllSongs = async (request, response) => {
  try {
    const songs = await Song.find({});

    return response.status(200).json({
      count: songs.length,
      data: songs,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};

// Route for Get One Song from database by id

export const getSingleSong = async (request, response) => {
  try {
    const { id } = request.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(404).json({ error: "No Such Song" });
    }

    const song = await Song.findById(id);

    return response.status(200).json(song);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};

// Route for Save a new Song

export const createSong = async (request, response) => {
  const { title, artist, album, genre } = request.body;
  try {
    let emptyFields = [];
    if (!title) {
      emptyFields.push("title");
    }
    if (!artist) {
      emptyFields.push("artist");
    }
    if (!album) {
      emptyFields.push("album");
    }
    if (!genre) {
      emptyFields.push("genre");
    }
    if (emptyFields.length > 0) {
      return response.status(400).json({
        error: "Send all required fields: title, artist, album, genre",
        emptyFields,
      });
    }
    const newSong = {
      title,
      artist,
      album,
      genre,
    };

    const song = await Song.create(newSong);

    return response.status(201).send(song);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};


// Route for Update a Song
export const updateSong = async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.artist ||
      !request.body.album ||
      !request.body.genre
    ) {
      return response.status(400).send({
        message: "Send all required fields: title, artist, album, genre",
      });
    }

    const { id } = request.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(404).json({ error: "No Such Song" });
    }

    const result = await Song.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: "Song not found" });
    }

    return response.status(200).send({ message: "Song updated successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};


// Route for Delete a song

export const deleteSong = async (request, response) => {
  try {
    const { id } = request.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(404).json({ error: "No Such Song" });
    }

    const result = await Song.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "Song not found" });
    }

    return response.status(200).send({ message: "Song deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
};



// To Handler statistics-related comtrollers

export const getOverallStatistics = async (req, res) => {
  try {
    const totalSongs = await Song.countDocuments();

    const genresCount = await Song.aggregate([
      { $group: { _id: '$genre', count: { $sum: 1 } } },
    ]);
    const albumsCount = await Song.aggregate([
      { $group: { _id: '$album', count: { $sum: 1 } } },
    ]);
    const artistsCount = await Song.aggregate([
      { $group: { _id: '$artist', count: { $sum: 1 } } },
    ]);

    const artistsAlbumsCount = await Song.aggregate([
      { $group: { _id: { artist: '$artist', album: '$album' }, count: { $sum: 1 } } },
    ]);
 
   const artistsSongsCount = await Song.aggregate([
     { $group: { _id: { artist: "$artist" }, count: { $sum: 1 } } },
   ]);

    // songs in each genre
    const songsInEachGenre = await Song.aggregate([
      { $group: { _id: '$genre', count: { $sum: 1 } } },
    ]);
    // songs in each album
    const songsInEachAlbum = await Song.aggregate([
      { $group: { _id: '$album', count: { $sum: 1 } } },
    ]);

    res.json({
      totalSongs,
      genresCount,
      artistsCount,
      albumsCount,
      songsInEachGenre,
      songsInEachAlbum,
      artistsAlbumsCount,
      artistsSongsCount,
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

