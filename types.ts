
export type VoiceEmotion = 'Alegre' | 'Triste' | 'Autoritária' | 'Calma' | 'Motivacional';
export type VoiceGender = 'Masculino' | 'Feminino';

export type AppLanguage = 
  | 'Português (Angola)' 
  | 'Português (Brasil)'
  | 'Português (Portugal)'
  | 'Inglês (US)'
  | 'Inglês (UK)'
  | 'Francês'
  | 'Espanhol'
  | 'Alemão'
  | 'Italiano'
  | 'Kimbundu' 
  | 'Umbundu' 
  | 'Kikongo' 
  | 'Lingala' 
  | 'Chokwe' 
  | 'Kwanyama' 
  | 'Nyaneka' 
  | 'Ibinda'
  | 'Mandarim'
  | 'Japonês';

export interface ServiceFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
  tag?: string;
}

export enum AppSection {
  HOME = 'home',
  STUDIO = 'studio',
  VISION = 'vision',
  LIVE = 'live',
  PRICING = 'pricing',
  LOGIN = 'login',
  EXPLAINER = 'explainer',
}

export interface VoiceSettings {
  emotion: VoiceEmotion;
  language: AppLanguage;
  voiceType: 'Normal' | 'Infantil' | 'Robô' | 'Personagem';
  gender: VoiceGender;
}
