export function enhanceWithSsml(text) {
  if (!text.trim()) return '<speak></speak>';

  const escapeXml = (input) =>
    input.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // Random pitch helper, +- range around basePitch
  const randomPitch = (basePitch, range = 2) => {
    const min = basePitch - range;
    const max = basePitch + range;
    const val = (Math.random() * (max - min)) + min;
    return `${val.toFixed(1)}%`;
  };

  // Wrap word with prosody, pitch + optional rate
  const wrapProsody = (word, pitch, rate) => {
    let tag = `<prosody pitch="${pitch}"`;
    if (rate) tag += ` rate="${rate}"`;
    tag += `>${word}</prosody>`;
    return tag;
  };

  // Wrap word with emphasis sometimes
  const wrapEmphasis = (word, level = "moderate") =>
    `<emphasis level="${level}">${word}</emphasis>`;

  const words = text.trim().split(/\s+/);
  const len = words.length;

  // Choose some words to emphasize randomly (about 20%)
  const emphasizeIndices = new Set();
  for (let i = 0; i < len; i++) {
    if (Math.random() < 0.2) emphasizeIndices.add(i);
  }

  for (let i = 0; i < len; i++) {
    const word = escapeXml(words[i]);

    // Vary pitch more dynamically, with base pitch depending on word position
    let basePitch;
    if (len >= 5) {
      if (i === 0) basePitch = 5;
      else if (i === 1) basePitch = 3;
      else if (i >= 2 && i < len - 2) basePitch = -2;
      else basePitch = 3;
    } else if (len === 4) {
      basePitch = i === 0 || i === 3 ? 5 : 3;
    } else if (len === 3) {
      basePitch = i === 0 || i === 2 ? 5 : 1;
    } else if (len === 2) {
      basePitch = 3;
    } else {
      basePitch = 3;
    }

    // Randomize pitch +- 2%
    const pitch = randomPitch(basePitch, 2);

    // Optional: slow down some words for natural pacing (randomly)
    const rate = Math.random() < 0.15 ? "90%" : undefined;

    let wrappedWord = wrapProsody(word, pitch, rate);

    // Emphasize some words randomly for human effect
    if (emphasizeIndices.has(i)) {
      wrappedWord = wrapEmphasis(wrappedWord);
    }

    words[i] = wrappedWord;
  }

  let processed = words.join(' ');

  // Add varied breaks:
  //  - after punctuation (.!?): 300-500ms
  //  - after commas: 150-300ms
  //  - after conjunctions: 150ms (for simple words like "and", "but", "or")
  processed = processed.replace(/([.!?])(\s|$)/g, (match, p1, p2) => {
    const breakTime = 300 + Math.floor(Math.random() * 200); // 300-500ms
    return `${p1}<break time="${breakTime}ms"/>${p2}`;
  });

  processed = processed.replace(/(,)(\s)/g, (match, p1, p2) => {
    const breakTime = 150 + Math.floor(Math.random() * 150); // 150-300ms
    return `${p1}<break time="${breakTime}ms"/>${p2}`;
  });

  // Optional: insert a break after simple conjunctions (and, but, or)
  processed = processed.replace(/\b(and|but|or)\b(\s)/gi, (match, p1, p2) => {
    return `${p1}<break time="150ms"/>${p2}`;
  });

  return `<speak>${processed}</speak>`;
}
