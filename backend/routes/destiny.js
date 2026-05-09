import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

const MOCK_DESTINY_RESULTS = [
  {
    overview: 'Your soul radiates the mysterious energy of the Wood Dragon, seeking growth through patience. The cosmos has decreed your path shall be one of transformation, where humble beginnings blossom into profound wisdom.',
    wealth: 'The financial stars align in your favor, but beware of impulsive ventures. Your hidden talent lies in strategic planning and negotiation. A legacy awaits those who plant seeds today and wait for seasons to bloom.',
    love: 'Your romantic destiny weaves through cycles of intensity and calm. Your fatal flaw is the tendency to chase rather than attract. True love manifests when you learn to be still and let the river of fate flow naturally.',
    cure: 'Speak less, listen more. Let the ancient waters of patience wash over your restless spirit.'
  },
  {
    overview: 'Born under the sign of the Fire Phoenix, your destiny burns bright yet dangerous. The heavens have crafted a life of passionate extremes, where ashes become the foundation for new beginnings.',
    wealth: 'Your financial karma pulses with electric potential. Hidden talents include creative problem-solving and inspiring others. The universe warns against greed—share your abundance or watch it turn to sand in your hands.',
    love: 'Your romantic destiny burns with fierce intensity. Your fatal flaw is jealousy born from insecurity. When you learn that true love cannot be captured but only surrendered to, your heart shall find its home.',
    cure: 'Cool your flames with meditation. Let the gentle rain restore balance to your scorching heart.'
  },
  {
    overview: 'The Earth Serpent marks your soul with wisdom and endurance. Your path winds through challenges that test your foundations, promising that those who persist shall harvest abundance in their autumn years.',
    wealth: 'Financial stability is your birthright through diligent effort. Hidden talents include nurturing others\' growth and manifesting abundance through hard work. Beware of laziness disguised as patience.',
    love: 'Your romantic destiny thrives on trust and loyalty. Your fatal flaw is possessiveness masquerading as devotion. When you release your grip on those you love, they shall return willingly.',
    cure: 'Ground yourself in daily ritual. Let the mountains teach you stillness amid life\'s storms.'
  }
];

router.post('/', async (req, res) => {
  try {
    const { name, birthDate, birthTime, gender } = req.body;

    if (!name || !birthDate || !birthTime || !gender) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (!process.env.DEEPSEEK_API_KEY || process.env.DEEPSEEK_API_KEY === 'your_deepseek_api_key_here') {
      await new Promise(r => setTimeout(r, 3000));
      const mockResult = MOCK_DESTINY_RESULTS[Math.floor(Math.random() * MOCK_DESTINY_RESULTS.length)];
      return res.json(mockResult);
    }

    const systemPrompt = `You are an ancient Chinese Grandmaster of BaZi (Four Pillars of Destiny), now operating as a Cyber-Daoist oracle. You speak in highly elegant, poetic, and profound English. The user has paid for a premium reading and provided their birth details.

Calculate (or accurately simulate based on the data) their BaZi chart. Provide a deep, insightful, and slightly mysterious fortune-telling reading.

Output ONLY a JSON object with strictly these keys:

'overview': A 40-word poetic summary of their life's energetic blueprint.
'wealth': A 50-word deep analysis of their financial karma, hidden talents, and blocks.
'love': A 50-word analysis of their romantic destiny and fatal flaws in relationships.
'cure': A 30-word practical yet philosophical piece of advice to fix their karma (The Karmic Cure).`;

    const userMessage = `Name: ${name}\nDate of Birth: ${birthDate}\nTime of Birth: ${birthTime}\nGender: ${gender}`;

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
          { role: 'user', content: userMessage }
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
    console.error('Destiny API error:', error);
    res.status(500).json({ error: 'Failed to align the Four Pillars of Destiny' });
  }
});

export default router;