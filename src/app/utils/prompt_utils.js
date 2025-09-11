import basicPrompts from '../docs/basic-prompts.json';
import toChatPrompt from '../docs/tochat-prompts.json';
import lonLenPrompt from '../docs/lonlen-prompts.json';
import tinhDuyenPrompt from '../docs/tinhduyen-prompts.json';
import suNghiepPrompt from '../docs/sunghiep-prompts.json';
import { lapLaSoShort } from './utils';
import { runPrompt } from './gpt_utils';

function section(content) {
  if (!content || content.length === 0) return "";
  const text = Array.isArray(content) ? content.join("\n") : content;
  return `${text}\n`;
}

export function getPromptBeginning() {
  const { context, role, output } = basicPrompts;

  return `
${section(context)}
${section(role)}
${section(output)}
  `.trim();
}

/*
  To chat prompt
*/

export function getToChatPrompt() {
  const beginning = getPromptBeginning();
  const { basics } = basicPrompts;
  const { requirement, representation, guide } = toChatPrompt;

  return `
${beginning}

${section(requirement)}
${section(guide)}
${section(representation)}
${section(basics)}
  `.trim();
}

export function getToChatPromptWithLaso(yinBirthday, yinNamHan) {
  const laso = lapLaSoShort(yinBirthday, yinNamHan);

  return `
${getToChatPrompt()}

# LÁ SỐ
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
  const { basics } = basicPrompts;
  const { requirement, representation, guide } = lonLenPrompt;

  return `
${beginning}

${section(requirement)}
${section(guide)}
${section(representation)}
${section(basics)}
  `.trim();
}

export function getLonLenPromptWithLaso(yinBirthday, yinNamHan) {
  const laso = lapLaSoShort(yinBirthday, yinNamHan);

  return `
${getLonLenPrompt()}

# LÁ SỐ
${JSON.stringify(laso, null, 2)}
  `.trim();
}

export async function runPromptLonLen(yinBirthday, yinNamHan) {
  const prompt = getLonLenPromptWithLaso(yinBirthday, yinNamHan);

  return await runPrompt(prompt);
}

/*
  Tinh duyen prompt
*/
export function getTinhDuyenPrompt() {
  const beginning = getPromptBeginning();
  const { basics } = basicPrompts;
  const { requirement, representation, guide } = tinhDuyenPrompt;

  return `
${beginning}

${section(requirement)}
${section(guide)}
${section(representation)}
${section(basics)}
  `.trim();
}

export function getTinhDuyenPromptWithLaso(yinBirthday, yinNamHan) {
  const laso = lapLaSoShort(yinBirthday, yinNamHan);

  return `
${getTinhDuyenPrompt()}

# LÁ SỐ
${JSON.stringify(laso, null, 2)}
  `.trim();
}

export async function runPromptTinhDuyen(yinBirthday, yinNamHan) {
  const prompt = getTinhDuyenPromptWithLaso(yinBirthday, yinNamHan);

  return await runPrompt(prompt);
}

/*
  Su nghiep prompt
*/
export function getSuNghiepPrompt() {
  const beginning = getPromptBeginning();
  const { basics } = basicPrompts;
  const { requirement, representation, guide } = suNghiepPrompt;

  return `
${beginning}

${section(requirement)}
${section(guide)}
${section(representation)}
${section(basics)}
  `.trim();
}

export function getSuNghiepPromptWithLaso(yinBirthday, yinNamHan) {
  const laso = lapLaSoShort(yinBirthday, yinNamHan);

  return `
${getSuNghiepPrompt()}

# LÁ SỐ
${JSON.stringify(laso, null, 2)}
  `.trim();
}

export async function runPromptSuNghiep(yinBirthday, yinNamHan) {
  const prompt = getSuNghiepPromptWithLaso(yinBirthday, yinNamHan);

  return await runPrompt(prompt);
}

