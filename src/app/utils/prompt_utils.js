import basicPrompts from '../docs/basic-prompts.json';
import toChatPrompt from '../docs/tochat-prompts.json';
import lonLenPrompt from '../docs/lonlen-prompts.json';
import { lapLaSoShort } from './utils';
import { runPrompt } from './gpt_utils';

function section(title, content) {
  if (!content || content.length === 0) return "";
  const text = Array.isArray(content) ? content.join("\n") : content;
  return `# ${title}\n${text}\n`;
}

export function getPromptBeginning() {
  const { context, role, output } = basicPrompts;

  return `
${section("CONTEXT", context)}
${section("ROLE", role)}
${section("OUTPUT FORMAT", output)}
  `.trim();
}

/*
  To chat prompt
*/

export function getToChatPrompt() {
  const beginning = getPromptBeginning();
  const { laso } = basicPrompts;
  const { requirement, representation, guide } = toChatPrompt;

  return `
${beginning}

${section("REQUIREMENTS", requirement)}
${section("GUIDE", guide)}
${section("REPRESENTATION", representation)}
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

/*
  Lớn lên prompt
*/

export function getLonLenPrompt() {
  const beginning = getPromptBeginning();
  const { laso } = basicPrompts;
  const { requirement, representation, guide } = lonLenPrompt;

  return `
${beginning}

${section("REQUIREMENTS", requirement)}
${section("GUIDE", guide)}
${section("REPRESENTATION", representation)}
${section("LÁ SỐ", laso)}
  `.trim();
}

export function getLonLenPromptWithLaso(yinBirthday, yinNamHan) {
  const laso = lapLaSoShort(yinBirthday, yinNamHan);

  return `
${getLonLenPrompt()}

# GENERATED LÁ SỐ
${JSON.stringify(laso, null, 2)}
  `.trim();
}

export async function runPromptLonLen(yinBirthday, yinNamHan) {
  const prompt = getLonLenPromptWithLaso(yinBirthday, yinNamHan);

  return await runPrompt(prompt);
}