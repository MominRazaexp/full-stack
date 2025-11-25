const API_BASE_URL = 'http://localhost:3000/api';

async function fetchWithFallback(url, options = {}) {
  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error('Backend not reachable');
    return await res.json();
  } catch (err) {
    console.warn('Using mock data:', err.message);
    return getMockData(url);
  }
}

function getMockData(url) {
  if (url.includes('/todos')) {
    return [
      { id: 1, text: 'Sample Todo 1', completed: 0 },
      { id: 2, text: 'Sample Todo 2', completed: 1 }
    ];
  }
  if (url.includes('/analytics/summary')) {
    return {
      uniqueVisitors: 5,
      pageViews: 12,
      buttonClicks: 8,
      avgSessionDuration: 45,
      topPages: [
        { page: '/', views: 8 },
        { page: '/analytics', views: 4 }
      ]
    };
  }
  return { message: 'Mock data' };
}

export async function getTodos() {
  return fetchWithFallback(`${API_BASE_URL}/todos`);
}

export async function addTodo(text) {
  return fetchWithFallback(`${API_BASE_URL}/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
}

export async function updateTodo(id, text, completed) {
  return fetchWithFallback(`${API_BASE_URL}/todos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, completed })
  });
}

export async function deleteTodo(id) {
  return fetchWithFallback(`${API_BASE_URL}/todos/${id}`, {
    method: 'DELETE'
  });
}

export async function recordAnalyticsEvent(page, eventType, duration = null) {
  try {
    await fetch(`${API_BASE_URL}/analytics/event`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page, eventType, duration }),
      credentials: 'include'
    });
  } catch (err) {
    console.warn('Analytics tracking failed:', err);
  }
}

export async function startAnalyticsSession() {
  try {
    await fetch(`${API_BASE_URL}/analytics/session/start`, {
      method: 'POST',
      credentials: 'include'
    });
  } catch (err) {
    console.warn('Session start tracking failed:', err);
  }
}

export async function endAnalyticsSession(duration) {
  try {
    await fetch(`${API_BASE_URL}/analytics/session/end`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ duration }),
      credentials: 'include'
    });
  } catch (err) {
    console.warn('Session end tracking failed:', err);
  }
}

export async function getAnalyticsSummary() {
  return fetchWithFallback(`${API_BASE_URL}/analytics/summary`);
}