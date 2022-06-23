interface Window {
  sizeChanged: () => void
  game: Phaser.Game
}

interface ICratePool extends Phaser.GameObjects.Group {
  initializeWithSize(size: number): void
  spawn(x: number, y: number, key?: string): any
  despawn(crate: Phaser.GameObjects.Image): void
}

declare namespace Phaser.GameObjects {
  interface GameObjectFactory {
    cratePool(): ICratePool
  }
}
