#!/usr/bin/env bash

wait_for_port() {
  timeout=$1
  cmd=$2

  start_time=$(date +%s)

  while true; do
    if $cmd; then
      break
    else
      current_time=$(date +%s)
      elapsed_time=$((current_time - start_time))
      if [ $elapsed_time -ge $timeout ]; then
        echo "Error: Service did not become available within the allotted time"
        exit 1
      fi

      echo "Waiting for service to become available..."
      sleep 5
    fi
  done
}

wait_for_port 30 "curl -sSf http://127.0.0.1:3001/health"