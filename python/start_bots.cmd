@echo off
echo Starting AllMySell FastAPI Automation Engine...
echo.

IF NOT EXIST "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

echo Activating virtual environment...
call venv\Scripts\activate.bat

echo Installing dependencies...
pip install -r requirements.txt

echo.
echo ===================================================
echo Automation Engine is running on http://localhost:8000
echo Check the dashboard at /dashboard/automation
echo Press CTRL+C to stop
echo ===================================================
echo.

python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
