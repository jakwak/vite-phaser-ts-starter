export default class Crate extends Phaser.Physics.Matter.Image {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene.matter.world, x, y, '')
    scene.add.existing(this)

    this.setBody({ width: 100, height: 100 })
    this.setSize(100, 100)
    this.setIgnoreGravity(true)
    // this.setFixedRotation()

    scene.events.on('update', this.update, this)
    this.cursors = scene.input.keyboard.createCursorKeys()
  }

  update(): void {
    if (this.cursors.left.isDown) {
      this.setVelocityX(-10)
    } else if (this.cursors.right.isDown) {
      this.setVelocityX(10)
    } else {
      this.setVelocityX(0)
    }

    if (this.cursors.up.isDown) {
      this.setVelocityY(-10)
    } else if (this.cursors.down.isDown) {
      this.setVelocityY(10)
    } else {
      this.setVelocityY(0)
    }
  }
}
