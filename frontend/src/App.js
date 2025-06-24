
// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

function App() {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState({});
  const [health, setHealth] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchHealth, 10000); // Check health every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [usersResponse, statusResponse, healthResponse] = await Promise.all([
        axios.get(`${API_BASE_URL}/api/users`),
        axios.get(`${API_BASE_URL}/api/status`),
        axios.get(`${API_BASE_URL}/health`)
      ]);

      setUsers(usersResponse.data);
      setStatus(statusResponse.data);
      setHealth(healthResponse.data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchHealth = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/health`);
      setHealth(response.data);
    } catch (err) {
      console.error('Health check failed:', err);
    }
  };

  const simulateError = async () => {
    try {
      await axios.get(`${API_BASE_URL}/api/error`);
    } catch (err) {
      alert('Error simulated successfully! Check the backend logs.');
    }
  };

  if (loading) {
    return (
      <div className="App">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>🚀 DevOps Pipeline Demo</h1>
        <p>Multi-Service Application with Monitoring</p>
      </header>

      <main className="App-main">
        {error && (
          <div className="error-banner">
            <h3>⚠️ Connection Error</h3>
            <p>{error}</p>
            <button onClick={fetchData}>Retry</button>
          </div>
        )}

        <section className="status-section">
          <h2>📊 System Status</h2>
          <div className="status-grid">
            <div className="status-card">
              <h3>Backend Service</h3>
              <div className={`status-indicator ${status.status === 'running' ? 'healthy' : 'unhealthy'}`}>
                {status.status === 'running' ? '✅ Running' : '❌ Down'}
              </div>
              <p>Version: {status.version}</p>
              <p>Last Updated: {status.timestamp}</p>
            </div>

            <div className="status-card">
              <h3>Health Check</h3>
              <div className={`status-indicator ${health.status === 'healthy' ? 'healthy' : 'unhealthy'}`}>
                {health.status === 'healthy' ? '✅ Healthy' : '❌ Unhealthy'}
              </div>
              <p>Uptime: {Math.floor(health.uptime || 0)}s</p>
              <p>Environment: {health.environment}</p>
            </div>
          </div>
        </section>

        <section className="users-section">
          <h2>👥 Users Data</h2>
          <div className="users-grid">
            {users.map(user => (
              <div key={user.id} className="user-card">
                <h3>{user.name}</h3>
                <p>{user.email}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="actions-section">
          <h2>🔧 Actions</h2>
          <div className="actions-grid">
            <button onClick={fetchData} className="action-btn refresh">
              🔄 Refresh Data
            </button>
            <button onClick={simulateError} className="action-btn error">
              💥 Simulate Error
            </button>
            <a 
              href={`${API_BASE_URL}/metrics`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="action-btn metrics"
            >
              📈 View Metrics
            </a>
          </div>
        </section>
      </main>

      <footer className="App-footer">
        <p>DevOps Pipeline Project - Monitoring & Containerization Demo</p>
      </footer>
    </div>
  );
}

export default App;