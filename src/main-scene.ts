import 'phaser'

import { KEY_CRATE } from './crate-pool'
// import particleUrl from '../assets/particle.png'
// import gaspUrl from '../assets/gasp.mp3'

const INFO_FORMAT = `Size:      %1
Spawned:   %2
Despawned: %3`

export class MainScene extends Phaser.Scene {
  // private startKey!: Phaser.Input.Keyboard.Key
  // private sprites: { s: Phaser.GameObjects.Image; r: number }[] = []
  private group!: ICratePool
  private infoText!: Phaser.GameObjects.Text

  constructor() {
    super({
      key: 'main-scene',
    })
  }

  preload(): void {
    this.load.image(KEY_CRATE, '../assets/Crate.png')
    // this.startKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
    // this.startKey.isDown = false
    // this.load.image('particle', particleUrl)
    // this.load.audio('gasp', gaspUrl)
  }

  create(): void {
    this.group = this.add.cratePool()
    this.group.initializeWithSize(5)

    this.input.on(
      Phaser.Input.Events.POINTER_DOWN,
      (pointer: { x: number | undefined; y: number | undefined }) => {
        this.spawnCrate(pointer.x, pointer.y)
      }
    )

    this.infoText = this.add.text(16, 16, '')
    // this.add.text(0, 0, 'Press S to restart scene', {
    //   fontSize: '60px',
    //   fontFamily: 'Helvetica',
    // })
    // this.add.image(100, 100, 'particle')
    // for (let i = 0; i < 300; i++) {
    //   const x = Phaser.Math.Between(-64, 800)
    //   const y = Phaser.Math.Between(-64, 600)
    //   const image = this.add.image(x, y, 'particle')
    //   image.setBlendMode(Phaser.BlendModes.ADD)
    //   this.sprites.push({ s: image, r: 2 + Math.random() * 6 })
    // }
  }

  update(): void {
    if (!this.group || !this.infoText) return

    const size = this.group.getLength()
    const used = this.group.getTotalUsed()
    const text = Phaser.Utils.String.Format(INFO_FORMAT, [
      size,
      used,
      size - used,
    ])
    this.infoText.setText(text)

    // if (this.startKey.isDown) {
    //   this.sound.play('gasp')
    //   this.scene.start(this)
    // }
    // for (let i = 0; i < this.sprites.length; i++) {
    //   const sprite = this.sprites[i].s
    //   sprite.y -= this.sprites[i].r
    //   if (sprite.y < -256) {
    //     sprite.y = 700
    //   }
    // }
  }

  private spawnCrate(x = 400, y = 300) {
    if (!this.group) return null

    const crate = this.group.spawn(x, y)

    this.tweens.add({
      targets: crate,
      scale: 5,
      alpha: 0,
      duration: Phaser.Math.Between(500, 1000),
      onComplete: () => {
        this.tweens.killTweensOf(crate!)
        this.group!.despawn(crate!)
      },
    })

    return crate
  }
}
