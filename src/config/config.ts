export default () => ({
  OPENAI: {
    PATH: process.env.OPENAI_PATH,
    KEY: process.env.OPENAI_API_KEY,
    ORGANIZATION: process.env.OPENAI_ORGANIZATION,
  },
  VOICE: {
    PATH: process.env.ELEVENLABS_PATH,
    KEY: process.env.ELEVENLABS_API_KEY,
    POST: process.env.TEXT_TO_VOICE,
  },
});
