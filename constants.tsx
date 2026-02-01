
import { ServiceFeature } from './types';

export const FEATURES: ServiceFeature[] = [
  {
    id: 'emotions',
    title: 'Voz com Emoção Controlável',
    description: 'Escolha tons alegres, tristes, autoritários ou calmos para seus vídeos e anúncios.',
    icon: 'fa-face-smile-beam'
  },
  {
    id: 'cloning',
    title: 'Clonagem de Voz',
    description: 'Grave 1-3 minutos e tenha sua voz digitalizada para qualquer texto.',
    icon: 'fa-id-card-clip'
  },
  {
    id: 'vision-read',
    title: 'Leitura de Fotos (OCR)',
    description: 'Tire uma foto de qualquer documento e a IA lê o texto em voz alta instantaneamente.',
    icon: 'fa-camera',
    tag: 'Novo'
  },
  {
    id: 'vision-explain',
    title: 'Explicação de Imagens',
    description: 'A IA descreve e explica o que está acontecendo em uma foto ou ambiente.',
    icon: 'fa-eye',
    tag: 'Novo'
  },
  {
    id: 'african-langs',
    title: 'Línguas Africanas',
    description: 'Suporte exclusivo para Kimbundu, Umbundu, Kikongo, Lingala, Chokwe e mais.',
    icon: 'fa-earth-africa',
    tag: 'Diferencial'
  },
  {
    id: 'business',
    title: 'Voz para Negócios',
    description: 'Atendimento telefônico 24h e respostas automáticas profissionais.',
    icon: 'fa-briefcase'
  },
  {
    id: 'clean-audio',
    title: 'Limpeza de Áudio',
    description: 'Remova ruídos, ecos e melhore vozes fracas instantaneamente.',
    icon: 'fa-wand-magic-sparkles'
  },
  {
    id: 'documents',
    title: 'Leitura de Documentos',
    description: 'Converta PDFs, Word e textos longos em áudio de alta fidelidade.',
    icon: 'fa-file-pdf'
  }
];

export const EMOTIONS = ['Alegre', 'Triste', 'Autoritária', 'Calma', 'Motivacional'];
export const GENDERS = ['Feminino', 'Masculino'];
export const LANGUAGES = [
  'Português (Angola)', 
  'Português (Brasil)',
  'Português (Portugal)',
  'Inglês (US)',
  'Inglês (UK)',
  'Francês',
  'Espanhol',
  'Alemão',
  'Italiano',
  'Kimbundu', 
  'Umbundu', 
  'Kikongo', 
  'Lingala', 
  'Chokwe', 
  'Kwanyama', 
  'Nyaneka', 
  'Ibinda',
  'Mandarim',
  'Japonês'
];
export const VOICE_TYPES = ['Normal', 'Infantil', 'Robô', 'Personagem'];
