@echo off
REM Cordelia Command — one-click dashboard launcher.
REM Double-click this file to open the operator dashboard.
REM Close the resulting console window to stop the server.

title Cordelia Command  -  close this window to stop the dashboard

cd /d "%~dp0"

echo.
echo   Cordelia Command
echo   ----------------
echo   serving at http://localhost:8080/command/
echo.
echo   close this window when you're done — it kills the server.
echo.

REM Open the dashboard in the default browser (slight delay so server is ready).
start "" "" http://localhost:8080/command/

REM Start the static server in the foreground; closing this window stops it.
python -m http.server 8080
