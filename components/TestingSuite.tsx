import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Play, CheckCircle, XCircle, Copy, Code, Server, Smartphone, ShieldCheck } from 'lucide-react';

interface LogEntry {
  id: number;
  text: string;
  type: 'info' | 'success' | 'error' | 'command';
  timestamp: string;
}

export const TestingSuite: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'UNIX' | 'BACKEND' | 'E2E'>('UNIX');
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const addLog = (text: string, type: LogEntry['type'] = 'info') => {
    setLogs(prev => [...prev, {
      id: Date.now(),
      text,
      type,
      timestamp: new Date().toLocaleTimeString()
    }]);
  };

  const runSimulation = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setLogs([]);

    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    try {
      // UNIX PHASE
      addLog('./run_full_suite.sh --env=production', 'command');
      await delay(800);
      addLog('Initializing Unix Test Runner v4.2.0...', 'info');
      await delay(500);
      addLog('Checking dependencies...', 'info');
      await delay(400);
      addLog('✔ Docker Daemon active', 'success');
      addLog('✔ Python 3.10 environment detected', 'success');
      addLog('✔ Node.js v18.0.0 detected', 'success');
      
      await delay(1000);

      // BACKEND PHASE
      addLog('----------------------------------------', 'info');
      addLog('STARTING BACKEND UNIT TESTS (pytest)', 'info');
      addLog('----------------------------------------', 'info');
      await delay(500);
      addLog('collecting ...', 'info');
      await delay(800);
      addLog('tests/test_api.py::test_create_order PASSED [ 20%]', 'success');
      await delay(300);
      addLog('tests/test_api.py::test_get_menu_items PASSED [ 40%]', 'success');
      await delay(300);
      addLog('tests/test_auth.py::test_login_flow PASSED [ 60%]', 'success');
      await delay(400);
      addLog('tests/test_gemini.py::test_concierge_response PASSED [ 80%]', 'success');
      await delay(300);
      addLog('tests/test_db.py::test_transaction_rollback PASSED [100%]', 'success');
      addLog('============ 5 passed in 2.45s ============', 'success');

      await delay(1000);

      // FRONTEND AUTOMATION PHASE
      addLog('----------------------------------------', 'info');
      addLog('STARTING E2E AUTOMATION (Playwright)', 'info');
      addLog('----------------------------------------', 'info');
      await delay(600);
      addLog('Browser: Chromium (Headless)', 'info');
      await delay(500);
      addLog('Running: spec/checkout_flow.spec.ts', 'info');
      await delay(800);
      addLog('✔ User visits homepage', 'success');
      await delay(400);
      addLog('✔ User adds "Chicken Mandi" to cart', 'success');
      await delay(600);
      addLog('✔ User completes auth flow', 'success');
      await delay(500);
      addLog('✔ Payment gateway simulation', 'success');
      await delay(400);
      addLog('✔ Order confirmation displayed', 'success');
      await delay(800);
      
      addLog('All Tests Passed successfully.', 'success');
      addLog('Generating Coverage Report... Done.', 'info');
    } catch (e) {
      addLog('Test Suite Failed.', 'error');
    } finally {
      setIsRunning(false);
    }
  };

  const scripts = {
    UNIX: `#!/bin/bash
# run_tests.sh - Master Test Orchestrator

set -e  # Exit immediately if a command exits with a non-zero status.

echo "🚀 Starting Alpha Mandi Test Suite..."

# 1. Environment Check
echo "Checking Docker containers..."
if [ $(docker ps -q -f name=alpha_mandi_db) ]; then
    echo "✅ Database is up"
else
    echo "❌ Database container missing"
    exit 1
fi

# 2. Backend Linting & Testing
echo "running backend tests..."
cd backend
source venv/bin/activate
flake8 . --count --select=E9,F63,F7,F82 --show-source --statistics
pytest -v --cov=app tests/

# 3. Frontend Testing
echo "running frontend tests..."
cd ../frontend
npm run lint
npm run test:unit
npx playwright test

echo "✨ All tests passed successfully!"`,
    
    BACKEND: `from fastapi.testclient import TestClient
from app.main import app
import pytest

client = TestClient(app)

def test_read_main():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Alpha Mandi API"}

def test_create_order():
    payload = {
        "items": [{"id": 3, "quantity": 2}],
        "total": 50.00,
        "user_id": "test_user_123"
    }
    response = client.post("/orders/", json=payload)
    assert response.status_code == 200
    assert "order_id" in response.json()

@pytest.mark.asyncio
async def test_gemini_integration():
    # Mocking actual AI call for deterministic testing
    from app.services import gemini_service
    gemini_service.get_response = lambda msg: "Mock Response"
    
    response = client.post("/chat/", json={"message": "Hello"})
    assert response.status_code == 200
    assert response.json()["response"] == "Mock Response"`,

    E2E: `import { test, expect } from '@playwright/test';

test('Full Checkout Flow', async ({ page }) => {
  // 1. Visit Home
  await page.goto('http://localhost:3000');
  await expect(page).toHaveTitle(/Alpha Mandi/);

  // 2. Add Item to Cart
  await page.click('text=Order Online');
  await page.click('.menu-item:has-text("Chicken Mandi") >> text=Add');
  
  // 3. Open Cart
  await page.click('button[aria-label="Cart"]');
  await expect(page.locator('text=Chicken Mandi')).toBeVisible();

  // 4. Proceed to Checkout
  await page.click('text=Checkout');

  // 5. Fill Details
  await page.fill('input[placeholder*="Address"]', '123 Test St');
  await page.fill('input[placeholder*="Card"]', '424242424242');

  // 6. Submit
  await page.click('text=Pay Now');

  // 7. Verify Success
  await expect(page.locator('text=Order Confirmed')).toBeVisible();
});`
  };

  return (
    <div className="min-h-screen bg-[#0d1117] pt-24 pb-12 px-4 font-mono text-sm">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-8 border-b border-gray-800 pb-6">
          <div className="bg-green-500/10 p-3 rounded-lg">
            <ShieldCheck className="text-green-500" size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">QA & Automation Suite</h1>
            <p className="text-gray-400">Production-grade testing scripts for Unix, Python, and Playwright.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Script Viewer */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex gap-2 mb-4">
              <TabButton active={activeTab === 'UNIX'} onClick={() => setActiveTab('UNIX')} icon={<Terminal size={14} />} label="run_tests.sh" />
              <TabButton active={activeTab === 'BACKEND'} onClick={() => setActiveTab('BACKEND')} icon={<Server size={14} />} label="test_main.py" />
              <TabButton active={activeTab === 'E2E'} onClick={() => setActiveTab('E2E')} icon={<Smartphone size={14} />} label="e2e_spec.ts" />
            </div>

            <div className="bg-[#161b22] border border-gray-800 rounded-xl overflow-hidden shadow-2xl">
              <div className="flex justify-between items-center px-4 py-2 bg-[#21262d] border-b border-gray-800">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
                <button className="text-gray-400 hover:text-white flex items-center gap-1 text-xs">
                  <Copy size={12} /> Copy
                </button>
              </div>
              <div className="p-4 overflow-x-auto">
                <pre className="text-gray-300 leading-relaxed custom-scrollbar">
                  <code>{scripts[activeTab]}</code>
                </pre>
              </div>
            </div>

            <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-4">
               <h4 className="text-blue-400 font-bold mb-2 flex items-center gap-2"><Code size={16}/> Implementation Guide</h4>
               <p className="text-gray-400 text-xs">
                 These scripts are designed for a CI/CD pipeline (e.g., GitHub Actions or Jenkins). 
                 The <strong>Unix script</strong> acts as the master orchestrator, triggering the <strong>Python backend tests</strong> and <strong>Playwright frontend tests</strong> in Docker containers.
               </p>
            </div>
          </div>

          {/* Terminal Simulator */}
          <div className="lg:col-span-5">
            <div className="bg-[#010409] border border-gray-800 rounded-xl overflow-hidden shadow-2xl h-[600px] flex flex-col">
              <div className="px-4 py-3 bg-[#161b22] border-b border-gray-800 flex justify-between items-center">
                <span className="text-gray-400 text-xs font-bold">TERMINAL - CI/CD RUNNER</span>
                <button 
                  onClick={runSimulation}
                  disabled={isRunning}
                  className={`flex items-center gap-2 px-3 py-1 rounded text-xs font-bold transition-colors ${
                    isRunning 
                      ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  <Play size={12} fill="currentColor" />
                  RUN SUITE
                </button>
              </div>
              
              <div 
                ref={scrollRef}
                className="flex-1 p-4 font-mono text-xs overflow-y-auto space-y-2 custom-scrollbar"
              >
                {logs.length === 0 && !isRunning && (
                  <div className="h-full flex flex-col items-center justify-center text-gray-600">
                    <Terminal size={48} className="mb-4 opacity-50" />
                    <p>Ready to execute test suite...</p>
                    <p className="text-[10px] mt-2">Click "RUN SUITE" to simulate automation</p>
                  </div>
                )}
                
                {logs.map(log => (
                  <div key={log.id} className="flex gap-3">
                    <span className="text-gray-600 shrink-0">[{log.timestamp}]</span>
                    <span className={`${
                      log.type === 'command' ? 'text-yellow-400 font-bold' :
                      log.type === 'success' ? 'text-green-400' :
                      log.type === 'error' ? 'text-red-400' :
                      'text-gray-300'
                    }`}>
                      {log.type === 'command' && '$ '}
                      {log.text}
                    </span>
                  </div>
                ))}
                {isRunning && (
                   <div className="animate-pulse text-primary">_</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TabButton: React.FC<{active: boolean, onClick: () => void, icon: React.ReactNode, label: string}> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
      active 
        ? 'bg-primary text-black' 
        : 'bg-[#21262d] text-gray-400 hover:text-white'
    }`}
  >
    {icon} {label}
  </button>
);