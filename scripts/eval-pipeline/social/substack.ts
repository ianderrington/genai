import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import type { AnnounceResult } from './types';

async function markdownToSimpleHtml(markdown: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(markdown);
  return String(file);
}

/**
 * Substack has no public write API — the only approved path is emailing the
 * account's "post via email" address, which Substack turns into a DRAFT. A
 * human must always open the Substack dashboard and click Publish; this can
 * never be full auto-publish, by design, not by a limitation in this code.
 *
 * Minimal re-implementation of the approach in
 * families/supernal-coding/packages/modules/lib/publishers/substack.ts,
 * without importing it (same cross-repo-dependency rationale as linkedin.ts
 * and x.ts). Self-checks its own credentials, returns {skipped:true, reason}
 * rather than throwing when any are unset.
 */
export async function draftToSubstack(
  title: string,
  bodyMarkdown: string,
): Promise<AnnounceResult> {
  const postAddress = process.env.SUBSTACK_POST_ADDRESS;
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpFrom = process.env.SMTP_FROM;

  if (!postAddress || !smtpHost || !smtpUser || !smtpPass || !smtpFrom) {
    return {
      platform: 'substack',
      skipped: true,
      reason: 'SUBSTACK_POST_ADDRESS/SMTP_* not fully configured',
    };
  }

  const smtpPort = parseInt(process.env.SMTP_PORT ?? '587', 10);
  const html = await markdownToSimpleHtml(bodyMarkdown);

  const nodemailer = (await import('nodemailer')).default;
  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: { user: smtpUser, pass: smtpPass },
  });

  await transporter.sendMail({
    from: smtpFrom,
    to: postAddress,
    subject: title,
    html,
  });

  return { platform: 'substack', skipped: false };
}
