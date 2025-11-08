@echo off
echo Starting E-Transit Full Stack Application...
echo.

REM Check if Docker is running
echo Checking Docker status...
docker version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Docker is not running! Please start Docker Desktop first.
    pause
    exit /b 1
)

REM Start Docker containers
echo Starting Docker containers from ./docker/docker-compose.yml...
cd /d "docker"
start "Docker Services" cmd /c "docker-compose up"
cd /d ".."

REM Wait a bit for Docker to start
timeout /t 5 /nobreak >nul

REM Start .NET Backend
echo Starting .NET Backend from ./backend/api...
cd /d "backend\api"
start "Backend API" cmd /c "dotnet run"
cd /d "..\.."

REM Wait a bit for backend to start
timeout /t 10 /nobreak >nul

REM Start React Frontend
echo Starting React Frontend from ./frontend/client...
cd /d "frontend\client"
start "React Frontend" cmd /c "npm run dev"
cd /d "..\.."

echo.
echo All services are starting...
echo - Backend API: https://localhost:5011
echo - Frontend: http://localhost:5173
echo - Docker: PGAdmin: http://localhost:8080
echo.
echo Press any key to close this window (services will continue running)...
pause >nul