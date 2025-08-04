export function enhanceWithSsml(text) {
  if (!text.trim()) return '<speak></speak>';

  const escapeXml = (input) =>
    input.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // Helpers for randomizing within ranges
  const randomBetween = (min, max) => Math.random() * (max - min) + min;
  const randomChoice = (arr) => arr[Math.floor(Math.random() * arr.length)];

  // Wrap word with prosody including pitch, rate, volume
  const wrapProsody = (word, { pitch, rate, volume }) => {
    let tag = `<prosody`;
    if (pitch) tag += ` pitch="${pitch}"`;
    if (rate) tag += ` rate="${rate}"`;
    if (volume) tag += ` volume="${volume}"`;
    tag += `>${word}</prosody>`;
    return tag;
  };

  // Wrap with emphasis with variable levels
  const wrapEmphasis = (word) => {
    const levels = ['strong', 'moderate', 'reduced'];
    const level = randomChoice(levels);
    return `<emphasis level="${level}">${word}</emphasis>`;
  };

  // Wrap with whisper effect sometimes
  const wrapWhisper = (word) => `<amazon:effect name="whispered">${word}</amazon:effect>`;

  // Detect simple punctuation marks to split sentences/phrases for better phrasing
  const phraseSplitRegex = /([.!?])/g;
  const rawPhrases = text
    .split(phraseSplitRegex)
    .reduce((acc, val, i, arr) => {
      if (phraseSplitRegex.test(val)) {
        acc[acc.length - 1] += val;
      } else if (val.trim()) {
        acc.push(val.trim());
      }
      return acc;
    }, []);

  // Parameters for speech rate and pitch base ranges
  const baseRateRange = [30, 45]; // overall slower speech rate range (30% to 45%)
  const basePitchRange = [-5, 5]; // percent

  // Function to generate prosody params for a word, influenced by position & phrase length
  function getProsodyParams(wordIndex, phraseLength) {
    const rate = `${randomBetween(...baseRateRange).toFixed(1)}%`;

    const pitchShift =
      wordIndex < 2 ? randomBetween(2, 6) :
      wordIndex > phraseLength - 3 ? randomBetween(-6, -2) :
      randomBetween(-2, 2);
    const pitch = `${pitchShift.toFixed(1)}%`;

    const volumes = ['medium', 'x-loud', 'loud', 'soft', 'x-soft'];
    const volume = randomChoice(volumes);

    return { pitch, rate, volume };
  }

  // Main processing per phrase
  let processedPhrases = rawPhrases.map(phrase => {
    const words = phrase.split(/\s+/);
    const len = words.length;

    // Choose words to emphasize (~25%)
    const emphasizeIndices = new Set();
    for (let i = 0; i < len; i++) {
      if (Math.random() < 0.25) emphasizeIndices.add(i);
    }

    // Some words get whispered (~5%)
    const whisperIndices = new Set();
    for (let i = 0; i < len; i++) {
      if (Math.random() < 0.05) whisperIndices.add(i);
    }

    // Wrap words with prosody/emphasis/whisper
    const wrappedWords = words.map((wordRaw, i) => {
      const word = escapeXml(wordRaw);

      let prosodyParams = getProsodyParams(i, len);

      let wrapped = wrapProsody(word, prosodyParams);

      if (whisperIndices.has(i)) {
        wrapped = wrapWhisper(wrapped);
      } else if (emphasizeIndices.has(i)) {
        wrapped = wrapEmphasis(wrapped);
      }

      return wrapped;
    });

    // Insert breaks naturally:
    // - Insert a 350ms break after every 4 or 5 words (randomly chosen), except the last word
    // - Longer breaks after conjunctions
    // Insert commas naturally:
// - Insert a comma after every 4 or 5 words (randomly chosen), except last word
// - Optionally keep commas after conjunctions for natural phrasing

const conjunctions = new Set(['and', 'but', 'or', 'because', 'however', 'so', 'then']);
let result = [];

let commaInterval = 4 + Math.floor(Math.random() * 2); // randomly 4 or 5

for (let i = 0; i < wrappedWords.length; i++) {
  result.push(wrappedWords[i]);

  if (i === wrappedWords.length - 1) break; // no comma after last word

  const lowerWord = words[i].toLowerCase();

  if (conjunctions.has(lowerWord)) {
    // Insert a comma after conjunctions
    result.push(',');
  } else if ((i + 1) % commaInterval === 0) {
    // Insert a comma after every 4 or 5 words
    result.push(',');
    // re-randomize commaInterval for variation
    commaInterval = 4 + Math.floor(Math.random() * 2);
  }
  // else: no comma inserted here
}


    return result.join(' ');
  });

  // Join phrases with a slightly longer break (700-900ms) for sentence boundary
  const finalSsml = processedPhrases.join(() => {
    const pause = 700 + Math.floor(Math.random() * 200);
    return `<break time="${pause}ms"/>`;
  });

  return `<speak>${finalSsml}</speak>`;
}
