/**
 * Thin Telegram sender for the eval pipeline. Deliberately not routed through
 * supernal-coding's `sc agent-comms telegram`/`agent-msg` — genai is a
 * separate repo/npm project with no existing dependency on supernal-coding
 * tooling, and a GitHub-hosted Actions runner can't assume `sc` is installed.
 * A direct HTTP call to Telegram's Bot API is the whole implementation.
 *
 * Usage: tsx notify-telegram.ts "<message text>"
 * Requires TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID env vars. If either is
 * unset, logs and exits 0 (a missing notify credential must never fail the
 * pipeline run itself).
 */

async function sendTelegramMessage(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.log('[eval-pipeline] TELEGRAM_BOT_TOKEN/TELEGRAM_CHAT_ID not set — skipping notify.');
    return;
  }

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: false }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error(`[eval-pipeline] Telegram notify failed: ${res.status} ${body}`);
    return;
  }

  console.log('[eval-pipeline] Telegram notify sent.');
}

async function main(): Promise<void> {
  const message = process.argv[2];
  if (!message) {
    console.error('[eval-pipeline] notify-telegram: no message argument provided');
    process.exitCode = 1;
    return;
  }
  await sendTelegramMessage(message);
}

main().catch((err) => {
  console.error('[eval-pipeline] notify-telegram failed:', err);
  // Never fail the overall pipeline run just because notify broke.
});
