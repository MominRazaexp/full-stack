import { v4 as uuidv4 } from 'uuid';
import * as analyticsModel from '../models/analytics.js';

export const recordAnalyticsEvent = async (req, res) => {
  try {
    let visitorId = req.cookies.visitor_id;
    
    if (!visitorId) {
      visitorId = uuidv4();
      res.cookie('visitor_id', visitorId, { 
        maxAge: 365 * 24 * 60 * 60 * 1000,
        httpOnly: true 
      });
    }

    const { page, eventType, duration } = req.body;
    await analyticsModel.recordEvent(visitorId, page, eventType, duration);
    
    res.json({ success: true, visitorId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const sessionStart = async (req, res) => {
  try {
    let visitorId = req.cookies.visitor_id;
    
    if (!visitorId) {
      visitorId = uuidv4();
      res.cookie('visitor_id', visitorId, { 
        maxAge: 365 * 24 * 60 * 60 * 1000,
        httpOnly: true 
      });
    }

    await analyticsModel.startSession(visitorId);
    res.json({ success: true, visitorId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const sessionEnd = async (req, res) => {
  try {
    const visitorId = req.cookies.visitor_id;
    if (!visitorId) {
      return res.status(400).json({ error: 'No visitor_id found' });
    }

    const { duration } = req.body;
    await analyticsModel.endSession(visitorId, duration);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAnalyticsSummary = async (req, res) => {
  try {
    const summary = await analyticsModel.getSummary();
    const topPages = await analyticsModel.getTopPages();
    res.json({ ...summary, topPages });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};