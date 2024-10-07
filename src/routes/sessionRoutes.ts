import { Router } from 'express';
import { createSession, getSessions, getSessionById, updateSessionStatus } from '../controllers/sessionController';

const router = Router();

// POST /sessions - Create a new session
router.post('/sessions', createSession);

// GET /sessions - Get all sessions (optional: filter by status)
router.get('/sessions', getSessions);

// GET /sessions/:id - Get a session by ID
router.get('/sessions/:id', getSessionById);

// PUT /sessions/:id/status - Update session status
router.put('/sessions/:id/status', updateSessionStatus);

export default router;
