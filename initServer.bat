@echo off
setlocal

REM Verifica se foi passado um parâmetro
if "%~1"=="" (
    echo Usage: %0 [frontend|service]
    exit /b 1
)

set "PROJECT_TYPE=%~1"

REM Define os caminhos dos subprojetos
set "FRONTEND_PATH=%~dp0frontend"
set "SERVICE_PATH=%~dp0service"

REM Mostra os caminhos para depuração
echo Frontend path: %FRONTEND_PATH%
echo Service path: %SERVICE_PATH%

REM Inicia o projeto correspondente
if /i "%PROJECT_TYPE%"=="frontend" (
    if exist "%FRONTEND_PATH%" (
        echo Starting frontend project
        cd "%FRONTEND_PATH%"
        npm run start
        cd /d %~dp0
    ) else (
        echo Frontend directory %FRONTEND_PATH% does not exist.
    )
) else if /i "%PROJECT_TYPE%"=="service" (
    if exist "%SERVICE_PATH%" (
        echo Starting service project
        cd "%SERVICE_PATH%"
        npm run start
        cd /d %~dp0
    ) else (
        echo Service directory %SERVICE_PATH% does not exist.
    )
) else (
    echo Invalid parameter: %PROJECT_TYPE%
    echo Usage: %0 [frontend|service]
)

endlocal
