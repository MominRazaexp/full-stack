import React, { useState, useEffect } from 'react';
import { getAnalyticsSummary } from '../utils/api';
import { useAnalytics } from '../utils/analytics';

function Analytics() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const { trackPageView } = useAnalytics();

  useEffect(() => {
    trackPageView('/analytics');
    loadSummary();
  }, []);

  const loadSummary = async () => {
    try {
      const data = await getAnalyticsSummary();
      setSummary(data);
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-500">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-xl p-8">
        <div className="flex items-center gap-4 mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Analytics Dashboard</h1>
          <img 
            src="https://res.cloudinary.com/proxmaircloud/image/upload/v1764080126/images/ot2fj04zysc9hunx6jkn.png" 
            alt="analytics dashboard image for a todo app"
            className="w-12 h-12 rounded-full object-cover"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white">
            <p className="text-sm font-medium opacity-90">Unique Visitors</p>
            <p className="text-4xl font-bold mt-2">{summary.uniqueVisitors}</p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white">
            <p className="text-sm font-medium opacity-90">Page Views</p>
            <p className="text-4xl font-bold mt-2">{summary.pageViews}</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white">
            <p className="text-sm font-medium opacity-90">Button Clicks</p>
            <p className="text-4xl font-bold mt-2">{summary.buttonClicks}</p>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-6 text-white">
            <p className="text-sm font-medium opacity-90">Avg Session (sec)</p>
            <p className="text-4xl font-bold mt-2">{summary.avgSessionDuration}</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Most Visited Pages</h2>
          {summary.topPages && summary.topPages.length > 0 ? (
            <div className="space-y-3">
              {summary.topPages.map((page, index) => (
                <div key={index} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
                  <span className="font-medium text-gray-900">{page.page}</span>
                  <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {page.views} views
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No page view data yet</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Analytics;