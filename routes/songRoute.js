import express from 'express';
import {
  getAllSongs,
  getSingleSong,
  createSong,
  updateSong,
  deleteSong,
  getOverallStatistics,
} from '../controllers/songController.js';

const router = express.Router();

// Song routes
router.get('/', getAllSongs);
router.post('/', createSong);
router.post("/id", getSingleSong);
router.put('/:id', updateSong);
router.delete('/:id', deleteSong);
router.get("/overall", getOverallStatistics);

export default router;

