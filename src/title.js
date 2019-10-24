class TitleScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'TitleScene'
    })
  }
  preload() {
    this.load.image('logo', 'assets/sprites/logo.png')
    this.load.image('play', 'assets/sprites/play.png')
    // this.load.image('background1', 'assets/background/plx-1.png')
    // this.load.image('background2', 'assets/background/plx-2.png')
    // this.load.image('background3', 'assets/background/plx-3.png')
    // this.load.image('background4', 'assets/background/plx-4.png')
    // this.load.image('background5', 'assets/background/plx-5.png')
    this.load.image('background1', 'assets/background2/01.png')
    this.load.image('background2', 'assets/background2/02.png')
    this.load.image('background3', 'assets/background2/03.png')
    this.load.image('background4', 'assets/background2/04.png')
    // this.load.image('background5', 'assets/background2/05.png')
    this.load.image('platform', 'assets/sprites/chao.png')
    // this.load.image('platform', 'assets/background2/05.png')
  }
  create() {
    // this.background1 = this.add.tileSprite(400, 300, 512, 256, 'background1')
    // this.background2 = this.add.tileSprite(400, 300, 512, 256, 'background2')
    // this.background3 = this.add.tileSprite(400, 300, 512, 256, 'background3')
    // this.background4 = this.add.tileSprite(400, 300, 512, 256, 'background4')
    // this.background5 = this.add.tileSprite(400, 300, 512, 256, 'background5')

    // this.background1.setScale(1.7, 2.4)
    // this.background2.setScale(1.7, 2.4)
    // this.background3.setScale(1.7, 2.4)
    // this.background4.setScale(1.7, 2.4)

    this.ground = this.add.tileSprite(400, 568, 800, 12, 'platform')
    this.physics.add.existing(this.ground)
    this.ground.body.immovable = true
    this.ground.body.moves = false

    this.logo = this.add.image(400, 180, 'logo')
    this.logo.setScale(1.5)

    let play = this.add.image(400, 400, 'play')
    play.setScale(4)
    play.setInteractive()
    play.on('pointerdown', () => this.scene.start('GameScene'))
    play.on('pointerover', () => play.setTint(0xcccccc))
    play.on('pointerout', () => play.setTint(0xffffff))

    this.cameras.main.setBackgroundColor('#f7f7f7')
  }

  update() {
    // this.background1.tilePositionX += 1
    // this.background2.tilePositionX += 3
    // this.background3.tilePositionX += 5
    // this.background4.tilePositionX += 7
    // this.background5.tilePositionX += 10
    this.ground.tilePositionX += 10
  }
}

export default TitleScene
