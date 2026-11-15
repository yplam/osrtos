// Fills ```kernel fences in Markdown with real kernel source.
//
//   ```kernel freertos:tasks.c#xTaskPriorityInherit
//   ```
//
// The id after `kernel` names a symbol in src/generated/sim/snippets.json
// (written by the simulator export). The fence becomes a C code block, which
// Astro highlights as usual, followed by a line of upstream attribution.
// An unknown id fails the build.
//
// This is an mdast plugin for Sätteri, Astro's Markdown processor.
import { readFileSync } from 'node:fs';

const snippets = JSON.parse(
  readFileSync(new URL('../generated/sim/snippets.json', import.meta.url), 'utf8'),
);

const escapeHtml = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

export const kernelSnippet = {
  name: 'kernel-snippet',
  code(node, ctx) {
    if (node.lang !== 'kernel') return;
    const id = (node.meta ?? '').trim();
    const snippet = snippets.symbols[id];
    if (!snippet) {
      const known = Object.keys(snippets.symbols).join('\n  ');
      throw new Error(
        `Unknown kernel snippet "${id}". A \`\`\`kernel fence needs one of these ids:\n  ${known}`,
      );
    }
    const kernel = snippets.kernels[snippet.rtos];
    const lines =
      snippet.startLine === snippet.endLine
        ? `line ${snippet.startLine}`
        : `lines ${snippet.startLine}–${snippet.endLine}`;
    ctx.replaceNode(node, [
      { type: 'code', lang: 'c', value: snippet.code },
      {
        type: 'html',
        value:
          `<p class="kernel-source">` +
          `<a href="${escapeHtml(snippet.url)}" target="_blank" rel="noopener noreferrer">` +
          `<code>${escapeHtml(snippet.file)}</code>, ${lines}</a> · ` +
          `${escapeHtml(kernel.name)} ${escapeHtml(kernel.version)} · ` +
          `<a href="${escapeHtml(kernel.licenseUrl)}" target="_blank" rel="noopener noreferrer">` +
          `${escapeHtml(kernel.license)} license</a></p>`,
      },
    ]);
  },
};
