import React from 'react';

export const ArchitectureGuide: React.FC = () => {
  return (
    <div className="min-h-screen bg-secondary pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif text-white mb-4">Backend Architecture</h2>
          <p className="text-gray-400">
            This application is currently running in a React-only sandbox. 
            To deploy the full-stack version with Python, MySQL, and Docker as requested, 
            use the blueprints below.
          </p>
        </div>

        <div className="space-y-8">
          
          {/* Section 1: Docker Compose */}
          <div className="bg-[#1a1a1a] rounded-lg border border-white/10 p-6">
            <h3 className="text-xl text-primary font-bold mb-4">1. Infrastructure (docker-compose.yml)</h3>
            <p className="text-gray-400 mb-4 text-sm">Orchestrates the React Frontend, Python Backend, and MySQL Database.</p>
            <pre className="bg-black p-4 rounded text-xs text-green-400 overflow-x-auto">
{`version: '3.8'

services:
  # Python Backend (FastAPI)
  api:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=mysql+pymysql://user:password@db/restaurant_db
      - GEMINI_API_KEY=\${GEMINI_API_KEY}
    depends_on:
      - db

  # MySQL Database
  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: restaurant_db
      MYSQL_USER: user
      MYSQL_PASSWORD: password
    ports:
      - "3306:3306"
    volumes:
      - db_data:/var/lib/mysql

  # React Frontend
  frontend:
    build: ./frontend
    ports:
      - "3000:80"
    depends_on:
      - api

volumes:
  db_data:`}
            </pre>
          </div>

          {/* Section 2: Python Backend */}
          <div className="bg-[#1a1a1a] rounded-lg border border-white/10 p-6">
            <h3 className="text-xl text-primary font-bold mb-4">2. Backend Logic (FastAPI + SQLAlchemy)</h3>
            <p className="text-gray-400 mb-4 text-sm">Structure for `backend/main.py`. Handles orders and AI integration.</p>
            <pre className="bg-black p-4 rounded text-xs text-blue-400 overflow-x-auto">
{`from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
import google.generativeai as genai
import os

app = FastAPI()

# Database Setup (Simplified)
# ... engine and sessionlocal code here ...

class OrderCreate(BaseModel):
    items: list[dict]
    total: float

@app.post("/orders/")
def create_order(order: OrderCreate, db: Session = Depends(get_db)):
    # Save to MySQL
    db_order = models.Order(total=order.total)
    db.add(db_order)
    db.commit()
    return {"status": "Order received"}

@app.post("/chat/")
async def chat_with_concierge(message: str):
    # Gemini Integration
    genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
    model = genai.GenerativeModel("gemini-2.5-flash")
    response = model.generate_content(message)
    return {"response": response.text}`}
            </pre>
          </div>

           {/* Section 3: Dockerfile */}
           <div className="bg-[#1a1a1a] rounded-lg border border-white/10 p-6">
            <h3 className="text-xl text-primary font-bold mb-4">3. Containerization (backend/Dockerfile)</h3>
            <pre className="bg-black p-4 rounded text-xs text-purple-400 overflow-x-auto">
{`FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]`}
            </pre>
          </div>

        </div>
      </div>
    </div>
  );
};