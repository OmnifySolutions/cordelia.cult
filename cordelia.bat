@echo off
REM Cordelia Command — one-click dashboard launcher.
REM Double-click this file. Close the console window to stop the dashboard.

title Cordelia Command  -  close this window to stop the dashboard

cd /d "%~dp0"

echo.
echo   Cordelia Command
echo   ----------------
echo   serving at http://localhost:8080/command/
echo.
echo   close this window when you're done — it kills the server.
echo.

REM Open the dashboard in the default browser.
REM First "" is the required window-title argument for `start` when the
REM target is in quotes. Browser retries if server isn't quite ready yet.
start "" "http://localhost:8080/command/"

REM Block on the static server in this window; closing it stops the server.
python -m http.server 8080
