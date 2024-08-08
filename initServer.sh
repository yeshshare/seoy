#!/bin/bash

# Verifica se foi passado um parâmetro
if [ -z "$1" ]; then
    echo "Usage: $0 [frontend|service]"
    exit 1
fi

PROJECT_TYPE="$1"

# Define os caminhos dos subprojetos
FRONTEND_PATH="$(dirname "$0")/frontend"
SERVICE_PATH="$(dirname "$0")/service"

# Mostra os caminhos para depuração
echo "Frontend path: $FRONTEND_PATH"
echo "Service path: $SERVICE_PATH"

# Inicia o projeto correspondente
if [ "$PROJECT_TYPE" = "frontend" ]; then
    if [ -d "$FRONTEND_PATH" ]; then
        echo "Starting frontend project"
        cd "$FRONTEND_PATH"
        npm run start
        cd - > /dev/null
    else
        echo "Frontend directory $FRONTEND_PATH does not exist."
    fi
elif [ "$PROJECT_TYPE" = "service" ]; then
    if [ -d "$SERVICE_PATH" ]; then
        echo "Starting service project"
        cd "$SERVICE_PATH"
        npm run dev
        cd - > /dev/null
    else
        echo "Service directory $SERVICE_PATH does not exist."
    fi
else
    echo "Invalid parameter: $PROJECT_TYPE"
    echo "Usage: $0 [frontend|service]"
fi
