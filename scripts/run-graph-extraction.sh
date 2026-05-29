#!/usr/bin/env bash
# 3am knowledge-graph extraction for managen.ai
# Run: bash scripts/run-graph-extraction.sh
set -euo pipefail

GENAI_DIR="$(cd "$(dirname "$0")/.." && pwd)"
DOCS_DIR="$GENAI_DIR/docs"
QMD_DIR="/Users/saiterminal/git/supernal/families/supernal-coding/packages/qmd-entity"
LOG="/tmp/managen-graph-extraction.log"

exec > >(tee -a "$LOG") 2>&1
echo "[$(date)] Starting knowledge-graph extraction"

# ── 0. Memory check ─────────────────────────────────────────────────────────
FREE_PAGES=$(vm_stat | grep "Pages free" | awk '{print $3}' | tr -d '.')
FREE_GB=$(echo "scale=1; $FREE_PAGES * 16384 / 1073741824" | bc 2>/dev/null || echo "?")
echo "[$(date)] Free memory: ~${FREE_GB}GB"

# ── 1. Ollama ────────────────────────────────────────────────────────────────
if ! pgrep -x ollama > /dev/null; then
  echo "[$(date)] Starting Ollama..."
  ollama serve >> /tmp/ollama-extraction.log 2>&1 &
  sleep 8
fi

# Pull model if missing
echo "[$(date)] Ensuring qwen3:4b is available..."
ollama pull qwen3:4b 2>&1 | tail -3

# ── 2. qmd-entity extraction ─────────────────────────────────────────────────
echo "[$(date)] Running entity extraction on $DOCS_DIR"
cd "$QMD_DIR"

# Try built CLI, fall back to tsx
QMD_CLI=""
if [ -f "dist/cli.js" ]; then
  QMD_CLI="node dist/cli.js"
elif command -v tsx &>/dev/null; then
  QMD_CLI="tsx src/cli.ts"
else
  QMD_CLI="npx tsx src/cli.ts"
fi

# Add collection and extract
$QMD_CLI collection add genai "$DOCS_DIR" 2>&1 | tail -5 || true
$QMD_CLI extract --collection genai 2>&1 | tail -10
echo "[$(date)] Extraction complete"

# ── 3. Build graph.json ───────────────────────────────────────────────────────
echo "[$(date)] Building graph.json..."
cd "$GENAI_DIR"

if [ -f "scripts/build-graph.ts" ]; then
  npx tsx scripts/build-graph.ts
elif [ -f "scripts/build-graph.js" ]; then
  node scripts/build-graph.js
fi

# Verify output
if [ -f "public/graph.json" ]; then
  NODE_COUNT=$(python3 -c "import json; d=json.load(open('public/graph.json')); print(len(d['nodes']))" 2>/dev/null || echo "?")
  EDGE_COUNT=$(python3 -c "import json; d=json.load(open('public/graph.json')); print(len(d['edges']))" 2>/dev/null || echo "?")
  echo "[$(date)] graph.json: $NODE_COUNT nodes, $EDGE_COUNT edges"
else
  echo "[$(date)] ERROR: graph.json not created" && exit 1
fi

# ── 4. Commit and push ────────────────────────────────────────────────────────
cd "$GENAI_DIR"
git add public/graph.json
git commit -m "feat(knowledge-graph): $NODE_COUNT nodes, $EDGE_COUNT edges from genai/docs" || echo "Nothing to commit"
git push origin main

# Update supernal submodule pointer
cd /Users/saiterminal/git/supernal
git add families/genai
git commit -m "chore(submodule): advance genai — knowledge graph $NODE_COUNT nodes" || echo "Nothing to commit"

echo "[$(date)] Done. Log: $LOG"
