#!/bin/bash

# Tên ứng dụng bạn đã dùng khi start pm2
APP_NAME="agri-ecommerce"

# In ra bước hiện tại
echo "🔄 Stopping current PM2 app: $APP_NAME"
pm2 stop $APP_NAME
pm2 delete $APP_NAME

echo "⬇ Pulling latest code from Git..."
git pull origin main

echo "📦 Installing dependencies..."
npm install

echo "⚒ Building Next.js app..."
npm run build

echo "🚀 Starting app with PM2..."
PORT=3055 pm2 start npm --name "$APP_NAME" -- start

echo "✅ Deployment complete!"
pm2 save
