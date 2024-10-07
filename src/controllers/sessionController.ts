
import { Request, Response } from 'express';
import { Session } from '../models/sessionsModel';

// Create a new session
export const createSession = async (req: Request, res: Response) => {
  const { clientName, date, status, notes } = req.body;

  if (!clientName || !date || !status) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const session = new Session({
      clientName,
      date: new Date(date),
      status,
      notes,
    });

    await session.save();
    return res.status(201).json(session);
  } catch (err) {
    console.error('Error creating session:', err);  
    return res.status(500).json({ message: 'Error creating session' });
  }
}
// Get all sessions with optional filters
export const getSessions = async (req: Request, res: Response) => {
  const { status } = req.query;
  try {
    const filter = status ? { status } : {};
    const sessions = await Session.find(filter);
    return res.status(200).json(sessions);
  } catch (err) {
    return res.status(500).json({ message: 'Error fetching sessions' });
  }
};

// Get a specific session by ID
export const getSessionById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const session = await Session.findById(id);
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }
    return res.status(200).json(session);
  } catch (err) {
    return res.status(500).json({ message: 'Error fetching session' });
  }
};

// Update session status
export const updateSessionStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { clientName, status, notes, date } = req.body;

  console.log("ID:", id); 
  console.log("Request Body:", req.body); 

  try {
    const updatedFields: any = {};

    
    if (clientName) updatedFields.clientName = clientName;
    if (status) updatedFields.status = status;
    if (notes) updatedFields.notes = notes;
    if (date) updatedFields.date = date;

    
    console.log("Updated Fields:", updatedFields);

    const session = await Session.findByIdAndUpdate(id, updatedFields, { new: true });

    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    return res.status(200).json(session);
  } catch (err) {
    console.error("Error:", err); 
    return res.status(500).json({ message: 'Error updating session' });
  }
};
