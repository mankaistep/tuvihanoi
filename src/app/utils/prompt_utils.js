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

function getPromptBeginning() {
  const { context, role, output } = basicPrompts;
  return `
${section(context)}
${section(role)}
${section(output)}
  `.trim();
}

/**
 * Factory để tạo các bộ hàm cho từng loại prompt
 */
function createPromptHandlers(promptConfig) {
  function getPrompt() {
    const beginning = getPromptBeginning();
    const { basics } = basicPrompts;
    const { requirement, representation, guide } = promptConfig;

    return `
${beginning}

${section(requirement)}
${section(guide)}
${section(representation)}
${section(basics)}
    `.trim();
  }

  function getPromptWithLaso(yinBirthday, yinNamHan) {
    const laso = lapLaSoShort(yinBirthday, yinNamHan);
    return `
${getPrompt()}

# LÁ SỐ
${JSON.stringify(laso, null, 2)}
    `.trim();
  }

  async function run(yinBirthday, yinNamHan) {
    const prompt = getPromptWithLaso(yinBirthday, yinNamHan);
    return await runPrompt(prompt);
  }

  return { getPrompt, getPromptWithLaso, run };
}

// Tạo các nhóm hàm cho từng loại prompt
export const luanToChat = createPromptHandlers(toChatPrompt);
export const luanLonLen = createPromptHandlers(lonLenPrompt);
export const luanTinhDuyen = createPromptHandlers(tinhDuyenPrompt);
export const luanSuNghiep = createPromptHandlers(suNghiepPrompt);
