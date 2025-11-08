@echo off
echo Stopping all E-Transit services...
echo.

REM Stop Docker containers and remove volumes
echo Stopping Docker containers and removing volumes...
cd /d "docker"
docker-compose down -v
cd /d ".."

REM Also remove any orphaned volumes that might have been created
echo Removing any orphaned volumes...
docker volume prune -f >nul 2>&1 && echo Removed orphaned Docker volumes

REM Stop .NET Backend - Comprehensive approach
echo Stopping .NET Backend...

REM Method 1: Kill by specific ports (our known backend ports)
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5011') do (
    taskkill /PID %%a /F >nul 2>&1 && echo Stopped process on port 5011 (PID: %%a)
)

for /f "tokens=5" %%a in ('netstat -ano ^| findstr :7261') do (
    taskkill /PID %%a /F >nul 2>&1 && echo Stopped process on port 7261 (PID: %%a)
)

REM Method 2: Kill any dotnet process that might be our backend
timeout /t 1 /nobreak >nul
taskkill /F /IM dotnet.exe >nul 2>&1 && echo Stopped all dotnet processes

REM Stop React Frontend
echo Stopping React Frontend...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5173') do (
    taskkill /PID %%a /F >nul 2>&1 && echo Stopped process on port 5173 (PID: %%a)
)
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do (
    taskkill /PID %%a /F >nul 2>&1 && echo Stopped process on port 3000 (PID: %%a)
)

REM Kill any remaining node processes
timeout /t 1 /nobreak >nul
taskkill /F /IM node.exe >nul 2>&1 && echo Stopped all node processes

echo.
echo All E-Transit services have been stopped and Docker volumes cleaned up!
echo.
pause