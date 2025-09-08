import basicPrompts from '../docs/basic-prompts.json';
import toChatPrompt from '../docs/tochat-prompts.json';
import { lapLaSoShort } from './utils';
import { runPrompt } from './gpt_utils';

function section(title, content) {
  if (!content || content.length === 0) return "";
  const text = Array.isArray(content) ? content.join("\n") : content;
  return `# ${title}\n${text}\n`;
}

export function getPromptBeginning() {
  const { context, role, reasoning, output } = basicPrompts;

  return `
${section("CONTEXT", context)}
${section("ROLE", role)}
${section("REASONING", reasoning)}
${section("OUTPUT FORMAT", output)}
  `.trim();
}

export function getToChatPrompt() {
  const beginning = getPromptBeginning();
  const { laso } = basicPrompts;
  const { requirement, guide } = toChatPrompt;

  return `
${beginning}

${section("REQUIREMENTS", requirement)}
${section("GUIDE", guide)}
${section("LÁ SỐ", laso)}
  `.trim();
}

export function getToChatPromptWithLaso(yinBirthday, yinNamHan) {
  const laso = lapLaSoShort(yinBirthday, yinNamHan);

  return `
${getToChatPrompt()}

# GENERATED LÁ SỐ
${JSON.stringify(laso, null, 2)}
  `.trim();
}

export async function runPromptToChat(yinBirthday, yinNamHan) {
  const prompt = getToChatPromptWithLaso(yinBirthday, yinNamHan);

  return await runPrompt(prompt);
}
