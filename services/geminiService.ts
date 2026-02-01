
import { GoogleGenAI, Modality } from "@google/genai";

// Correctly initialize GoogleGenAI with a named parameter using the process.env.API_KEY directly.
const getAIClient = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

function encode(bytes: Uint8Array): string {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number = 24000,
  numChannels: number = 1
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

export async function generateTTS(
  text: string, 
  instruction: string, 
  voiceName: 'Kore' | 'Puck' | 'Charon' | 'Fenrir' | 'Zephyr' = 'Kore'
): Promise<AudioBuffer | null> {
  const ai = getAIClient();
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `${instruction}: ${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      const audioData = decode(base64Audio);
      return await decodeAudioData(audioData, audioContext);
    }
  } catch (error) {
    console.error("TTS Generation Error:", error);
  }
  return null;
}

export async function generateExplanation(topic: string): Promise<string | null> {
  const ai = getAIClient();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Você é um professor didático. Explique o seguinte tópico de forma curta, clara e interessante para ser lida em voz alta: ${topic}`,
    });
    // Access the text property directly instead of calling a text() method.
    return response.text || null;
  } catch (error) {
    console.error("Explanation Error:", error);
    return null;
  }
}

export async function analyzeImage(
  base64Image: string,
  mode: 'read' | 'explain'
): Promise<string | null> {
  const ai = getAIClient();
  const prompt = mode === 'read' 
    ? "Extraia apenas o texto desta imagem. Se houver muito texto, resuma o essencial para ser lido em voz alta."
    : "Explique detalhadamente o que está nesta imagem, as cores, objetos e o contexto geral.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          { inlineData: { data: base64Image, mimeType: 'image/jpeg' } },
          { text: prompt }
        ]
      }
    });
    // Access the text property directly instead of calling a text() method.
    return response.text || null;
  } catch (error) {
    console.error("Vision Analysis Error:", error);
    return null;
  }
}

export function playAudioBuffer(buffer: AudioBuffer) {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
  const source = audioContext.createBufferSource();
  source.buffer = buffer;
  source.connect(audioContext.destination);
  source.start();
}
