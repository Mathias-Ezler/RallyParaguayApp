import type { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';

export type IntroSlide = {
  id: string;
  icon: ComponentProps<typeof Ionicons>['name'];
  title: string;
  subtitle: string;
  points: string[];
};

export const INTRO_SLIDES: IntroSlide[] = [
  {
    id: 'rally',
    icon: 'flag-outline',
    title: 'El mejor rally del mundo en nuestra tierra',
    subtitle: 'Encontrá el mejor lugar para disfrutar del mejor rally del mundo.',
    points: [
      'Información sobre los tramos del evento',
      'Mapa interactivo y curiosidades por todos los tramos',
      'Información sobre los pilotos',
      'Noticias actualizadas antes y durante el evento',
    ],
  },
  {
    id: 'estacinamiento',
    icon: 'flag-outline',
    title: 'No te pierdas de este gran evento',
    subtitle: 'Encontrá el mejor lugar y a precios accesibles para disfrutar del mejor rally del mundo.',
    points: [
      'Información sobre los mejores lugares para disfrutar del evento',
      'Obten el mejor estacionamiento y servicio',
      'Reserva directamente desde tu celular',
      'Obten la mejor experiencia en simples pasos',
    ],
  },
  {
    id: 'propietarios',
    icon: 'home-outline',
    title: '¿Tenés un establecimiento o servicio?',
    subtitle: 'Si tu propiedad o servicio está cerca o sobre el evento, obtené mejores resultados con JAHA.',
    points: [
      'Visibilidad de tu servicio',
      'Visibilidad de tu propiedad',
      'Contacto directo con los clientes',
      'Muchas más ventajas',
    ],
  },
];