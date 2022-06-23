import Crate from './crate'

export default class MainScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'test-scene',
    })
  }
  preload(): void {
    this.load.image('crate', '../assets/Crate.png')
  }
  create(): void {
    this.matter.world.setBounds(0, 0, this.scale.width, this.scale.height)

    this.matter.add
      .image(500, 500, 'crate', '', { frictionAir: 0, restitution: 1 })
      .setIgnoreGravity(true)

    new Crate(this, 300, 300)
  }
}
