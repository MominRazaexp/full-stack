import express from 'express';
import * as analyticsController from '../controllers/analyticsController.js';

const router = express.Router();

router.post('/event', analyticsController.recordAnalyticsEvent);
router.post('/session/start', analyticsController.sessionStart);
router.post('/session/end', analyticsController.sessionEnd);
router.get('/summary', analyticsController.getAnalyticsSummary);

export default router;