"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSessionStatus = exports.getSessionById = exports.getSessions = exports.createSession = void 0;
const sessionsModel_1 = require("../models/sessionsModel");
// Create a new session
const createSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { clientName, date, status, notes } = req.body;
    if (!clientName || !date || !status) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    try {
        const session = new sessionsModel_1.Session({
            clientName,
            date: new Date(date),
            status,
            notes,
        });
        yield session.save();
        return res.status(201).json(session);
    }
    catch (err) {
        console.error('Error creating session:', err);
        return res.status(500).json({ message: 'Error creating session' });
    }
});
exports.createSession = createSession;
// Get all sessions with optional filters
const getSessions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { status } = req.query;
    try {
        const filter = status ? { status } : {};
        const sessions = yield sessionsModel_1.Session.find(filter);
        return res.status(200).json(sessions);
    }
    catch (err) {
        return res.status(500).json({ message: 'Error fetching sessions' });
    }
});
exports.getSessions = getSessions;
// Get a specific session by ID
const getSessionById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const session = yield sessionsModel_1.Session.findById(id);
        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }
        return res.status(200).json(session);
    }
    catch (err) {
        return res.status(500).json({ message: 'Error fetching session' });
    }
});
exports.getSessionById = getSessionById;
// Update session status
const updateSessionStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { clientName, status, notes, date } = req.body;
    console.log("ID:", id);
    console.log("Request Body:", req.body);
    try {
        const updatedFields = {};
        if (clientName)
            updatedFields.clientName = clientName;
        if (status)
            updatedFields.status = status;
        if (notes)
            updatedFields.notes = notes;
        if (date)
            updatedFields.date = date;
        console.log("Updated Fields:", updatedFields);
        const session = yield sessionsModel_1.Session.findByIdAndUpdate(id, updatedFields, { new: true });
        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }
        return res.status(200).json(session);
    }
    catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ message: 'Error updating session' });
    }
});
exports.updateSessionStatus = updateSessionStatus;
