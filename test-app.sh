#!/bin/bash

echo "🚀 Testing Web3 Daily News Application"
echo "=================================="

echo ""
echo "📊 Testing Backend API..."
echo "Health Check:"
curl -s http://localhost:3001/api/health | jq . || echo "Backend not responding"

echo ""
echo "News API:"
curl -s http://localhost:3001/api/news?limit=1 | jq '.data[0].title' || echo "News API error"

echo ""
echo "Market API:"
curl -s http://localhost:3001/api/market?limit=1 | jq '.data[0].name' || echo "Market API error"

echo ""
echo "Celebrities API:"
curl -s http://localhost:3001/api/celebrities?limit=1 | jq '.data[0].name' || echo "Celebrities API error"

echo ""
echo "🌐 Testing Frontend..."
echo "Frontend should be accessible at: http://localhost:3000"

echo ""
echo "✅ All tests completed!"
echo ""
echo "📝 Manual Testing Steps:"
echo "1. Open http://localhost:3000 in browser"
echo "2. Navigate through pages: Home, News, Celebrities, Market"
echo "3. Test search and filter functionality"
echo "4. Verify data is being scraped and updated"