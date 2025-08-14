Write-Host "Starting PocketBase Server..." -ForegroundColor Green
Write-Host ""
Write-Host "This will start your local database server." -ForegroundColor Yellow
Write-Host "Admin panel will be available at: http://127.0.0.1:8090/_/" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Red
Write-Host ""

# Check if pocketbase.exe exists
if (-not (Test-Path "pocketbase.exe")) {
    Write-Host "ERROR: pocketbase.exe not found!" -ForegroundColor Red
    Write-Host "Please download PocketBase from: https://github.com/pocketbase/pocketbase/releases" -ForegroundColor Yellow
    Write-Host "Extract the ZIP file to this folder and try again." -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Press Enter to continue"
    exit 1
}

# Start PocketBase server
Write-Host "Starting server..." -ForegroundColor Green
& .\pocketbase.exe serve

Read-Host "Press Enter to continue"
