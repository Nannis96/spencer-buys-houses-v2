#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CRON_FILE="$ROOT_DIR/crontab/cron_entries.txt"

if ! command -v crontab >/dev/null 2>&1; then
  echo "crontab command not found. Please install cron or apply the entries manually."
  echo "Cron entries are available at: $CRON_FILE"
  exit 1
fi

echo "Installing cron entries from $CRON_FILE"
(crontab -l 2>/dev/null || true; cat "$CRON_FILE") | crontab -
echo "Installed. Current crontab:"
crontab -l
