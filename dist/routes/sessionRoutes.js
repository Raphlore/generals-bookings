"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sessionController_1 = require("../controllers/sessionController");
const router = (0, express_1.Router)();
// POST /sessions - Create a new session
router.post('/sessions', sessionController_1.createSession);
// GET /sessions - Get all sessions (optional: filter by status)
router.get('/sessions', sessionController_1.getSessions);
// GET /sessions/:id - Get a session by ID
router.get('/sessions/:id', sessionController_1.getSessionById);
// PUT /sessions/:id/status - Update session status
router.put('/sessions/:id/status', sessionController_1.updateSessionStatus);
exports.default = router;
