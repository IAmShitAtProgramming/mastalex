@echo off
title Mastalex Local Server
echo ===================================================
echo Uruchamianie lokalnego serwera Mastalex (Localhost)
echo ===================================================
cd /d "%~dp0"
set PATH=%~dp0.bin\node-v22.11.0-win-x64;%PATH%
call npm run dev
pause
