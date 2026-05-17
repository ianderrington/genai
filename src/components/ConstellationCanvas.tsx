'use client';

import { useEffect, useRef } from 'react';

const CONCEPTS = [
  'Reasoning', 'Agents', 'RAG', 'LLMs', 'MCP', 'Fine-tuning',
  'Transformers', 'Multimodal', 'Safety', 'Alignment', 'Context',
  'Embeddings', 'Inference', 'Prompting', 'Tools', 'Memory',
  'Planning', 'DeepSeek', 'Claude', 'GPT-5', 'Gemini', 'Llama',
  'RLHF', 'DPO', 'LoRA', 'MoE', 'A2A', 'Sora', 'Veo', 'Qwen',
  'o3', 'Phi-4', 'Grok', 'Mistral', 'FLUX', 'Evals', 'Distill',
];

interface Node {
  x: number; y: number; vx: number; vy: number;
  r: number; label: string; pulse: number; opacity: number;
}

export default function ConstellationCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // labelsRef holds the active label array; starts as CONCEPTS, may be replaced
  // by names from /graph.json once the fire-and-forget fetch completes.
  const labelsRef = useRef<string[]>(CONCEPTS);

  // Fire-and-forget fetch of /graph.json. Runs once on mount with a 2s timeout.
  // On success: replaces labelsRef with node names from the graph.
  // On any failure (missing file, bad JSON, timeout): silently keeps CONCEPTS.
  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 2000);

    (async () => {
      try {
        const res = await fetch('/graph.json', { signal: controller.signal });
        if (!res.ok) return;
        const data = await res.json();
        if (
          !cancelled &&
          data &&
          Array.isArray(data.nodes) &&
          data.nodes.length > 0
        ) {
          const names: string[] = data.nodes
            .map((n: { name?: unknown }) => (typeof n.name === 'string' ? n.name : ''))
            .filter(Boolean);
          if (names.length > 0) {
            labelsRef.current = names;
          }
        }
      } catch {
        // timeout, network error, JSON parse error — stay with CONCEPTS
      } finally {
        clearTimeout(timer);
      }
    })();

    return () => {
      cancelled = true;
      controller.abort();
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0, H = 0, nodes: Node[] = [], animId = 0;

    function resize() {
      W = canvas!.width = canvas!.offsetWidth;
      H = canvas!.height = canvas!.offsetHeight;
    }

    function init() {
      // Snapshot the current label array at init time (supports late-loaded graph data
      // if init is called after the fetch resolves, e.g. on window resize).
      const labels = labelsRef.current;
      nodes = [];
      for (let i = 0; i < 58; i++) {
        nodes.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.28,
          vy: (Math.random() - 0.5) * 0.28,
          r: Math.random() * 1.7 + 1.0,
          label: i < labels.length ? labels[i] : '',
          pulse: Math.random() * Math.PI * 2,
          opacity: Math.random() * 0.38 + 0.52,
        });
      }
    }

    function draw() {
      ctx!.clearRect(0, 0, W, H);

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 158) {
            ctx!.beginPath();
            ctx!.moveTo(nodes[i].x, nodes[i].y);
            ctx!.lineTo(nodes[j].x, nodes[j].y);
            ctx!.strokeStyle = `rgba(99,102,241,${(1 - d / 158) * 0.2})`;
            ctx!.lineWidth = 0.65;
            ctx!.stroke();
          }
        }
      }

      for (const n of nodes) {
        n.pulse += 0.015;
        const g = Math.sin(n.pulse) * 0.11 + 0.89;

        const grad = ctx!.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 5.5);
        grad.addColorStop(0, `rgba(99,102,241,${0.28 * g * n.opacity})`);
        grad.addColorStop(1, 'rgba(99,102,241,0)');
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.r * 5.5, 0, 6.2832);
        ctx!.fillStyle = grad;
        ctx!.fill();

        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.r * g, 0, 6.2832);
        ctx!.fillStyle = `rgba(129,140,248,${n.opacity * g})`;
        ctx!.fill();

        if (n.label) {
          ctx!.font = '10px Inter, system-ui, sans-serif';
          ctx!.fillStyle = `rgba(148,163,184,${n.opacity * 0.46})`;
          ctx!.fillText(n.label, n.x + n.r + 5, n.y + 3.5);
        }

        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -32) n.x = W + 32;
        if (n.x > W + 32) n.x = -32;
        if (n.y < -32) n.y = H + 32;
        if (n.y > H + 32) n.y = -32;
      }

      animId = requestAnimationFrame(draw);
    }

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => { resize(); init(); }, 160);
    };
    window.addEventListener('resize', onResize);

    resize();
    init();
    draw();

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
      aria-hidden="true"
    />
  );
}
