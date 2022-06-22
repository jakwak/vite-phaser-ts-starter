/// <reference path="./main.d.ts" />

// import './style.css'

// const app = document.querySelector<HTMLDivElement>('#app')!

// app.innerHTML = `
//   <h1>Hello Vite!</h1>
//   <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
//   <div id="game"></div>
// `;

import 'phaser'
import { MainScene } from './main-scene'

const GameConfig: Phaser.Types.Core.GameConfig = {
  title: 'ExampleGame',
  url: 'https://github.com/digitsensitive/phaser3-typescript',
  version: '2.0',
  width: 800,
  height: 600,
  type: Phaser.AUTO,
  parent: 'app',
  scene: [MainScene],
  input: {
    keyboard: true,
  },
  physics: {
    default: 'matter',
    matter: {
      debug: true,
      enableSleeping: true,
    },
  },
  backgroundColor: '#000000',
  render: { pixelArt: false, antialias: true },
  scale: {
    mode: Phaser.Scale.ScaleModes.NONE,
    width: window.innerWidth,
    height: window.innerHeight,
    // mode: Phaser.Scale.FIT,
    // autoCenter: Phaser.Scale.CENTER_BOTH,
    // // `fullscreenTarget` must be defined for phones to not have
    // // a small margin during fullscreen.
    // fullscreenTarget: 'app',
    // expandParent: false,
  },
  canvasStyle: `display: block; width: 100%; height: 100%;`,
  autoFocus: true,
  callbacks: {
    postBoot: () => {
      window.sizeChanged()
    },
  },
}

window.sizeChanged = () => {
  if (window.game.isBooted) {
    setTimeout(() => {
      window.game.scale.resize(window.innerWidth, window.innerHeight)
      window.game.canvas.setAttribute(
        'style',
        `display: block; width: ${window.innerWidth}px; height: ${window.innerHeight}px;`
      )
    }, 100)
  }
}

window.onresize = () => window.sizeChanged()

window.game = new Phaser.Game(GameConfig)

// export class Game extends Phaser.Game {
//   constructor(config: Phaser.Types.Core.GameConfig) {
//     super(config)
//   }
// }

// window.addEventListener('load', () => {
//   // Expose `_game` to allow debugging, mute button and fullscreen button
//   ;(window as any)._game = new Game(GameConfig)
// })
