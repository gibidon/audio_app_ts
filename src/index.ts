import { ICard } from './types';
import './index.scss';

import rainBg from './assets/rainy-bg.jpg';
import winterBg from './assets/winter-bg.jpg';
import summerBg from './assets/summer-bg.jpg';

import rainAudio from './assets/sounds/rain.mp3';
import winterAudio from './assets/sounds/winter.mp3';
import summerAudio from './assets/sounds/summer.mp3';

import rainIcon from './assets/icons/cloud-rain.svg';
import winterIcon from './assets/icons/cloud-snow.svg';
import summerIcon from './assets/icons/sun.svg';
import pauseIcon from './assets/icons/pause.svg';

import { delegate } from './utils/delegate';

const body = document.querySelector('body');
const cardWrapper = body.querySelector('.card_wrapper') as HTMLElement;
const volumeControl = document.querySelector('.volume_control') as HTMLInputElement;

const weather_cards: ICard[] = [
  {
    id: 0,
    imageUrl: rainBg,
    audioUrl: rainAudio,
    iconUrl: rainIcon,
  },
  {
    id: 1,
    imageUrl: winterBg,
    audioUrl: winterAudio,
    iconUrl: winterIcon,
  },
  {
    id: 2,
    imageUrl: summerBg,
    audioUrl: summerAudio,
    iconUrl: summerIcon,
  },
];

function createCard({ id, audioUrl, imageUrl, iconUrl }: ICard): HTMLDivElement {
  const cardItem = document.createElement('div');

  cardItem.dataset.id = `${id}`;
  cardItem.classList.add('card');

  const cardImage = document.createElement('img');
  cardImage.src = imageUrl;
  const cardAudio = document.createElement('audio');
  cardAudio.src = audioUrl;
  const cardIcon = document.createElement('img');
  cardIcon.src = iconUrl;
  cardIcon.classList.add('card_icon');

  cardItem.appendChild(cardImage);
  cardItem.appendChild(cardAudio);
  cardItem.appendChild(cardIcon);

  return cardItem;
}

const cardItems = weather_cards.map((card) => createCard(card));

cardItems.forEach((cardItem) => cardWrapper.appendChild(cardItem));

const allAudios = Array.from(document.querySelectorAll('audio'));

function pauseAllAudios(): void {
  allAudios.forEach((audio) => audio.pause());
}

delegate(cardWrapper, '.card', 'click', function (e: MouseEvent) {
  const eventTarget = e.target as HTMLElement;
  const clickedCardItem = eventTarget.closest('.card') as HTMLElement;

  const cardData = weather_cards.find(
    (card) => card.id === Number(clickedCardItem.dataset.id),
  );

  const clickedCardIcon = clickedCardItem.querySelector('.card_icon') as HTMLImageElement;

  const clickedCardAudio = clickedCardItem.querySelector('audio') as HTMLAudioElement;

  if (clickedCardAudio.paused) {
    pauseAllAudios();
    clickedCardAudio.play();
    clickedCardIcon.src = cardData.iconUrl;
  } else {
    clickedCardAudio.pause();
    clickedCardIcon.src = pauseIcon;
  }

  body.style.backgroundImage = `url(${cardData.imageUrl})`;
});

volumeControl.addEventListener('input', () => {
  const playingAudio = allAudios.find(
    (audio: HTMLAudioElement) => audio.paused === false,
  );
  playingAudio.volume = Number(volumeControl.value);
});
