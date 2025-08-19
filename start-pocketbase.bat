@echo off
echo Starting PocketBase Server...
echo.
echo This will start your local database server.
echo Admin panel will be available at: http://127.0.0.1:8090/_/
echo.
echo Press Ctrl+C to stop the server
echo.

REM Check if pocketbase.exe exists
if not exist "pocketbase.exe" (
    echo ERROR: pocketbase.exe not found!
    echo Please download PocketBase from: https://github.com/pocketbase/pocketbase/releases
    echo Extract the ZIP file to this folder and try again.
    echo.
    pause
    exit /b 1
)

REM Start PocketBase server
pocketbase.exe serve

pause
