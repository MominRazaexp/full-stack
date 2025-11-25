import { getDB } from '../config/db.js';

export const recordEvent = (visitorId, page, eventType, duration = null) => {
  return new Promise((resolve, reject) => {
    const db = getDB();
    db.run(
      'INSERT INTO analytics (visitor_id, page, event_type, duration) VALUES (?, ?, ?, ?)',
      [visitorId, page, eventType, duration],
      function(err) {
        db.close();
        if (err) reject(err);
        else resolve({ id: this.lastID });
      }
    );
  });
};

export const startSession = (visitorId) => {
  return new Promise((resolve, reject) => {
    const db = getDB();
    const now = new Date().toISOString();
    db.run(
      'INSERT INTO sessions (visitor_id, start_time) VALUES (?, ?)',
      [visitorId, now],
      function(err) {
        db.close();
        if (err) reject(err);
        else resolve({ sessionId: this.lastID });
      }
    );
  });
};

export const endSession = (visitorId, duration) => {
  return new Promise((resolve, reject) => {
    const db = getDB();
    const now = new Date().toISOString();
    db.run(
      `UPDATE sessions 
       SET end_time = ?, duration = ? 
       WHERE visitor_id = ? AND end_time IS NULL 
       ORDER BY start_time DESC LIMIT 1`,
      [now, duration, visitorId],
      function(err) {
        db.close();
        if (err) reject(err);
        else resolve({ changes: this.changes });
      }
    );
  });
};

export const getSummary = () => {
  return new Promise((resolve, reject) => {
    const db = getDB();
    
    db.get(
      `SELECT 
        COUNT(DISTINCT visitor_id) as unique_visitors,
        SUM(CASE WHEN event_type = 'page_view' THEN 1 ELSE 0 END) as page_views,
        SUM(CASE WHEN event_type = 'click' THEN 1 ELSE 0 END) as button_clicks
       FROM analytics`,
      [],
      (err, row) => {
        if (err) {
          db.close();
          reject(err);
          return;
        }

        db.get(
          'SELECT AVG(duration) as avg_duration FROM sessions WHERE duration IS NOT NULL',
          [],
          (err2, durationRow) => {
            db.close();
            if (err2) reject(err2);
            else {
              resolve({
                uniqueVisitors: row.unique_visitors || 0,
                pageViews: row.page_views || 0,
                buttonClicks: row.button_clicks || 0,
                avgSessionDuration: Math.round(durationRow.avg_duration || 0)
              });
            }
          }
        );
      }
    );
  });
};

export const getTopPages = () => {
  return new Promise((resolve, reject) => {
    const db = getDB();
    db.all(
      `SELECT page, COUNT(*) as views 
       FROM analytics 
       WHERE event_type = 'page_view' 
       GROUP BY page 
       ORDER BY views DESC 
       LIMIT 5`,
      [],
      (err, rows) => {
        db.close();
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });
};