const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;

// استخدام CORS للسماح للطلبات من المتصفح
app.use(cors());
app.use(bodyParser.json());

const API_KEY = 'YOUR_ELEVENLABS_API_KEY';  // ضع هنا مفتاح الـ API الخاص بك من ElevenLabs
const API_URL = 'https://api.elevenlabs.io/v1/generate'; // تأكد من أن هذا هو المسار الصحيح API

app.post('/generate-audio', async (req, res) => {
  const { text, voice_id, rate, pitch } = req.body;

  try {
    // إعداد البيانات التي سترسل إلى ElevenLabs API
    const response = await axios.post(API_URL, {
      text: text,
      voice_id: voice_id,
      rate: rate,
      pitch: pitch
    }, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    // إذا تم الحصول على الصوت بنجاح، أرسل الرابط إلى العميل
    const audioUrl = response.data.audioUrl;  // تأكد من أن API ترجع الرابط الصوتي بهذا الشكل
    res.json({ audioUrl });

  } catch (error) {
    console.error('Error generating audio:', error);
    res.status(500).json({ error: 'حدث خطأ أثناء توليد الصوت' });
  }
});

// تشغيل الخادم على المنفذ 3000
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
