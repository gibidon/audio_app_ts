import { ICard } from './types'
import './index.scss'

import rainBg from './assets/rainy-bg.jpg'
import winterBg from './assets/winter-bg.jpg'
import summerBg from './assets/summer-bg.jpg'

import rainAudio from './assets/sounds/rain.mp3'
import winterAudio from './assets/sounds/winter.mp3'
import summerAudio from './assets/sounds/summer.mp3'

import rainIcon from './assets/icons/cloud-rain.svg'
import winterIcon from './assets/icons/cloud-snow.svg'
import summerIcon from './assets/icons/sun.svg'
import pauseIcon from './assets/icons/pause.svg'

const body = document.querySelector('body')
const cardWrapper = body.querySelector('.card_wrapper') as HTMLElement
const volumeControl = document.querySelector('.volume_control') as HTMLInputElement

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
]

class WeatherCard {
  private rootElem: HTMLElement
  public audio: HTMLAudioElement
  public iconElem: HTMLImageElement
  public icon: string

  constructor(selector: string, audioUrl: string, icon: string) {
    this.rootElem = document.querySelector(selector)
    this.audio = this.rootElem.querySelector('audio')
    this.iconElem = this.rootElem.querySelector('.icon')

    this.audio.src = audioUrl
    this.icon = icon

    this.rootElem.addEventListener('click', () => this.handleClick())
  }
  play() {
    this.audio.play()
  }
  pause() {
    this.audio.pause()
  }

  handleClick() {
    if (this.audio.paused) {
      this.play()
      this.iconElem.src = this.icon
      stopOtherAudios(this.audio)
    } else {
      this.pause()
      this.iconElem.src = pauseIcon
    }
  }
}

const rainCard = new WeatherCard('.rain_card', rainAudio, rainIcon)
const winterCard = new WeatherCard('.winter_card', winterAudio, winterIcon)
const summerCard = new WeatherCard('.summer_card', summerAudio, summerIcon)

const allCards = [rainCard, winterCard, summerCard]

const allAudios = Array.from(document.querySelectorAll('audio'))

function stopOtherAudios(playingAudio: HTMLAudioElement) {
  const cardsToPause = allCards.filter((card) => card.audio !== playingAudio)

  cardsToPause.forEach((card) => {
    console.log('card', card)
    card.audio.pause()

    //for correct icon showing. If audio has not been launched before,icon doesn't change to paused
    if (card.audio.currentTime !== 0.0) {
      card.iconElem.src = pauseIcon
    }
  })
}

volumeControl.addEventListener('input', () => {
  const playingAudio = allAudios.find((audio: HTMLAudioElement) => audio.paused === false)
  playingAudio.volume = Number(volumeControl.value)
})
