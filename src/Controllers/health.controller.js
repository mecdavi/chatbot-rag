// src/controllers/health.controller.js
export function healthCheck(req, res) {
    console.log('Health check endpoint called')
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString()
  })
}
