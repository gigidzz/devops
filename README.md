DevOps Final Project: Multi-Service Application Pipeline

Overview

This project demonstrates a DevOps pipeline for a multi-service application consisting of a Node.js backend and a React frontend. It includes:

Docker-based containerization and orchestration

Monitoring via Prometheus and Grafana

Security via Trivy and .env secrets

Incident simulation with a post-mortem analysis

Optional automation tasks

Setup Instructions

1. Prerequisites

Docker & Docker Compose


2. Running the App
# Build and run all services in detached mode
make build
make up

3. Access Services

Frontend: http://localhost:3000

Backend API: http://localhost:3001

Prometheus: http://localhost:9090

Grafana: http://localhost:3002 (admin/admin123)

 Containerized Services

Backend: Node.js Express app with /health and /api/status endpoints

Frontend: React app calling backend APIs

Health checks implemented for both services

📊 Monitoring and Visualization

✅ Prometheus

Configured to scrape backend metrics (like uptime, memory, etc.).

✅ Grafana

Dashboard created (manually or via JSON provisioning)

Visualizes:

Uptime

CPU and memory usage

Backend health checks


📫 Author

Name: Gigi Dzimistarishvili
