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

// declare interface ICrate extends Phaser.Physics.Matter.Image {}

// declare namespace Phaser.GameObjects {
//   interface GameObjectFactory {
//     crate(): ICrate
//   }
// }
