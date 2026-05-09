import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

const MOCK_ROAST_RESULTS = [
  {
    score: -42,
    hexagram: 'Hexagram 21: Shih Ho 噬嗑 (Biting Through)',
    element_imbalance: 'Excess Fire / Deficient Water',
    roast: 'The Dao teaches that the path of least resistance leads to harmony, yet you chose the highway of chaos. Your soul burns with selfish desire while your spirit drowns in the tears of those you\'ve wronged. The cosmos weeps at your audacity. Seek the middle path, or be consumed by your own flames.',
    next_life: 'You shall reincarnate as a cracked iPhone screen—constantly touched but never truly seen.'
  },
  {
    score: -78,
    hexagram: 'Hexagram 6: Sung 讼 (Conflict)',
    element_imbalance: 'Excess Metal / Deficient Wood',
    roast: 'The Great Wheel of Fortune turns against you. Like a stubborn mule refusing the bridle of destiny, you have kicked against the pricks. The I Ching speaks of rigidity leading to destruction. You are a walking disaster in human form, clashing with heaven\'s divine plan. Bow your head, mortal.',
    next_life: 'You shall reincarnate as a plastic shopping bag—useful for 15 minutes, then discarded forever.'
  },
  {
    score: -25,
    hexagram: 'Hexagram 54: Kui 归妹 (The Marrying Maiden)',
    element_imbalance: 'Excess Earth / Deficient Metal',
    roast: 'The Yin and Yang of your nature are catastrophically misaligned. While the sage embraces moderation, you have drowned yourself in excess. The ancient masters would weep seeing your chaos. Even the crickets mock your decisions on summer nights. Redemption awaits those who humble themselves.',
    next_life: 'You shall reincarnate as a single sock in a dryer—forever searching for your match.'
  },
  {
    score: -95,
    hexagram: 'Hexagram 3: Chun 屯 (Difficulty)',
    element_imbalance: 'Excess Water / Deficient Earth',
    roast: 'The Universe conspires against those who defy the natural order. Your hubris has shattered the delicate balance of the five elements within your soul. Like a ship without a rudder, you drift toward the rocks of your own stupidity. The I Ching warns: change your ways or be crushed by the wheel of karma.',
    next_life: 'You shall reincarnate as a autocorrected typo—always there, always wrong, never appreciated.'
  }
];

router.post('/', async (req, res) => {
  try {
    const { sin } = req.body;

    if (!sin || typeof sin !== 'string') {
      return res.status(400).json({ error: 'Sin is required' });
    }

    if (!process.env.DEEPSEEK_API_KEY || process.env.DEEPSEEK_API_KEY === 'your_deepseek_api_key_here') {
      await new Promise(r => setTimeout(r, 2000));
      const mockResult = MOCK_ROAST_RESULTS[Math.floor(Math.random() * MOCK_ROAST_RESULTS.length)];
      return res.json(mockResult);
    }

    const systemPrompt = `You are the 'Supreme Daoist Arbiter'. You possess absolute knowledge of the I Ching and Wu Xing. You speak in flawless English, blending profound ancient Chinese philosophy with ruthless Gen-Z dark humor. The user will confess a sin. Analyze the context (Romance, Greed, Stupidity, etc.).

Output ONLY a JSON object with strictly these keys:

'score': integer (-100 to 0).
'hexagram': A real I Ching hexagram matching their situation (e.g., 'Hexagram 4: Meng 蒙 (Youthful Folly)').
'element_imbalance': Explain their elemental flaw (e.g., 'Excess Fire / Deficient Water').
'roast': A 60-word ruthless critique. Start with a Daoist philosophical concept, then sharply pivot to roasting their specific action using modern slang. Destroy their ego.
'next_life': A highly specific, pathetic object they will reincarnate into.`;

    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: sin }
        ],
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    const result = JSON.parse(content);

    res.json(result);
  } catch (error) {
    console.error('Roast API error:', error);
    res.status(500).json({ error: 'Failed to consult the I Ching' });
  }
});

export default router;