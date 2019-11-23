class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'GameScene'
    })

    // this.player
    this.player2
    this.isGameOver = false
    this.meats
    this.bombs
    this.cactos
    this.characterScale = 5
    this.meatScale = 4
    this.bombScale = 4
    this.cactoScale = 4
    this.score = 0
    this.scoreText
    this.gameOverText
    this.timedEvent
    this.timedEvent1
    this.timedEvent2
  }

  preload() {
    // this.load.image('background1', 'assets/background/plx-1.png')
    // this.load.image('background2', 'assets/background/plx-2.png')
    // this.load.image('background3', 'assets/background/plx-3.png')
    // this.load.image('background4', 'assets/background/plx-4.png')
    // this.load.image('background5', 'assets/background/plx-5.png')
    this.load.image('background1', 'assets/background2/01.png')
    this.load.image('background2', 'assets/background2/02.png')
    this.load.image('background3', 'assets/background2/03.png')
    this.load.image('background4', 'assets/background2/04.png')
    this.load.image('background5', 'assets/background2/05.png')
    this.load.image('platform', 'assets/sprites/chao.png')
    this.load.image('restart', 'assets/sprites/restart.png')
    this.load.image('gameover', 'assets/sprites/gameover2.png')
    this.load.image('meat', 'assets/sprites/meat.png')
    this.load.image('cacto1', 'assets/sprites/cactos/1.png')
    this.load.image('cacto2', 'assets/sprites/cactos/2.png')
    this.load.image('cacto3', 'assets/sprites/cactos/3.png')
    this.load.image('cacto4', 'assets/sprites/cactos/4.png')
    this.load.image('cacto5', 'assets/sprites/cactos/5.png')
    this.load.image('cacto6', 'assets/sprites/cactos/6.png')
    this.load.image('cacto7', 'assets/sprites/cactos/7.png')
    this.load.spritesheet('doux', 'assets/sprites/doux.png', {frameWidth: 23.8, frameHeight: 17})
    this.load.spritesheet('bomb', 'assets/sprites/bombs.png', {frameWidth: 14.5, frameHeight: 12})
    this.load.spritesheet('dino', 'assets/sprites/dino.png', {frameWidth: 44, frameHeight: 46})
    this.load.spritesheet('dinoAbaixado', 'assets/sprites/dino_abaixado.png', {frameWidth: 59, frameHeight: 30})
    this.load.spritesheet('dinoCompleto', 'assets/sprites/dinoCompleto.png', {frameWidth: 50, frameHeight: 46})
    this.load.audio('music', 'assets/music.mp3')
    this.load.audio('death', 'assets/death.mp3')
    this.load.audio('pickup', 'assets/pickup.wav')
  }

  create() {
    // this.background1 = this.add.tileSprite(400, 300, 512, 256, 'background1')
    // this.background2 = this.add.tileSprite(400, 300, 512, 256, 'background2')
    // this.background3 = this.add.tileSprite(400, 300, 512, 256, 'background3')
    // this.background4 = this.add.tileSprite(400, 300, 512, 256, 'background4')

    // this.background1.setScale(1.7, 2.4)
    // this.background2.setScale(1.7, 2.4)
    // this.background3.setScale(1.7, 2.4)
    // this.background4.setScale(1.7, 2.4)

    // Cria o chão
    this.ground = this.add.tileSprite(400, 568, 800, 12, 'platform')
    this.physics.add.existing(this.ground)
    this.ground.body.immovable = true
    this.ground.body.moves = false

    // this.player = this.physics.add.sprite(100, 450, 'doux')
    // this.player.getBounds()

    // this.player.setBounce(0.2)
    // this.player.setCollideWorldBounds(true)
    // this.player.setScale(this.characterScale)
    // this.player.setSize(13, 17, 0, 0)

    // Cria o jogador
    this.player2 = this.physics.add.sprite(200, 400, 'dinoCompleto')
    this.player2.getBounds()
    this.player2.setBounce(0.2)
    this.player2.setCollideWorldBounds(true)
    this.player2.setScale(2)
    this.player2.setSize(25, 40, 0, 0)

    // Cria carnes
    this.meats = this.physics.add.group()

    // Cria bombas
    this.bombs = this.physics.add.group()

    // Cria cactos
    this.cactos = this.physics.add.group()

    // Eventos de criar carne, bombas e cactos
    this.timedEvent = this.time.addEvent({ delay: 1000, callback: onEvent, callbackScope: this, loop: true})
    this.timedEvent1 = this.time.addEvent({ delay: 10000, callback: onEvent1, callbackScope: this, loop: true})
    this.timedEvent2 = this.time.addEvent({ delay: 3000, callback: onEvent2, callbackScope: this, loop: true})

    // Música
    let music = this.sound.add('music')
    music.setLoop(true)
    music.play()

    function onEvent() {
      this.timedEvent.reset({ delay: Phaser.Math.Between(1000 ,5000), callback: onEvent, callbackScope: this, loop: true})
      let meat = this.meats.create(800, Phaser.Math.Between(200, 485), 'meat')
      meat.setScale(this.meatScale)
      meat.setCircle(6.5)
      meat.setBounceY(Phaser.Math.FloatBetween(0.6, 1.2))
      this.meats.setVelocityX(Phaser.Math.Between(-1000, -300))
    }

    function onEvent1() {
      this.timedEvent1.reset({ delay: Phaser.Math.Between(3000 ,5000), callback: onEvent1, callbackScope: this, loop: true})
      let bomb = this.bombs.create(800, Phaser.Math.Between(300, 485), 'bomb')
      bomb.setScale(this.bombScale)
      bomb.setCircle(5)
      bomb.anims.play('boom', true)
      bomb.setBounceY(1.2)
      this.bombs.setVelocityX(Phaser.Math.Between(-1000, -300))
    }

    function onEvent2() {
      this.timedEvent2.reset({ delay: Phaser.Math.Between(3000 ,5000), callback: onEvent2, callbackScope: this, loop: true})
      let cacto = this.cactos.create(800, 480, 'cacto1')
      cacto.setScale(this.cactoScale)
      // cacto.setCircle(5)
      // cacto.setBounceY(1.2)
      this.cactos.setVelocityX(-500)
    }

    // this.anims.create({
    //   key: 'run',
    //   frames: this.anims.generateFrameNumbers('doux', { start: 3, end: 9 }),
    //   frameRate: 10,
    //   repeat: -1
    // })

    this.anims.create({
      key: 'run2',
      frames: this.anims.generateFrameNumbers('dinoCompleto', { start: 2, end: 3 }),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'run3',
      frames: this.anims.generateFrameNumbers('dinoCompleto', { start: 5, end: 6 }),
      frameRate: 10,
      repeat: -1
    })

    // this.anims.create({
    //   key: 'hurt',
    //   frames: this.anims.generateFrameNumbers('doux', { start: 14, end: 16 }),
    //   frameRate: 10,
    //   repeat: -1
    // })

    this.anims.create({
      key: 'hurt2',
      frames: this.anims.generateFrameNumbers('dinoCompleto', { start: 4, end: 4 }),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'boom',
      frames: this.anims.generateFrameNumbers('bomb', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    })

    function collectMeat (player, meat) {
      meat.destroy()
      let pickup = this.sound.add('pickup')
      pickup.play()
      this.score += 100
      this.scoreText.setText('SCORE: ' + this.score)
    }

    function hitBomb (player, bomb) {
      bomb.destroy()
      music.stop()
      let death = this.sound.add('death')
      death.play()
      this.physics.pause()
      this.isGameOver = true
      this.timedEvent.paused = true
      this.timedEvent1.paused = true
      // this.player.setTint(0xff0000)
      // this.player.anims.play('hurt')
      this.player2.anims.play('hurt2')
      let restart = this.add.image(400, 350, 'restart')
      restart.setScale(4)
      restart.setInteractive()
      restart.on('pointerdown', () => {
        // document.getElementById('topusers').innerHTML = ''
        this.scene.start('GameScene')
        this.isGameOver = false
        this.score = 0
        // fetch(`https://cryptic-crag-84668.herokuapp.com/users`)
        //   .then(res => res.json())
        //   .then((data) => {
        //     data.sort(function(a, b) {return b.score - a.score})
        //     let topTen = data.slice(0, 10)
        //     topTen.forEach(user => {
        //       let userscores = `<h3>${user.username} - ${user.score}</h3>`
        //       document.getElementById('topusers').innerHTML += userscores
        //     })
        //   })
      })
      restart.on('pointerover', () => restart.setTint(0xcccccc))
      restart.on('pointerout', () => restart.setTint(0xffffff))
      this.gameover = this.add.image(400, 180, 'gameover')
      this.gameover.setScale(2)
      // let user_id = localStorage.getItem('user_id')

      // fetch(`https://cryptic-crag-84668.herokuapp.com/users` + `/${user_id}`)
      //   .then(res => res.json())
      //   .then((data) => {
      //     if(data.score < this.score) {
      //       fetch(`https://cryptic-crag-84668.herokuapp.com/users` + `/${user_id}`, {
      //         method: 'PATCH',
      //         headers: {
      //           'Accept': 'application/json',
      //           'Content-Type': 'application/json'
      //         },
      //         body: JSON.stringify({
      //           'score': this.score
      //         })
      //       })
      //     }
      //   })
    }

    this.scoreText = this.add.text(16, 16, 'SCORE: 0', { fontFamily: 'arcadeclassic', fontSize: '32px', fill: '#545454' })

    // this.physics.add.collider(this.player, this.ground)
    this.physics.add.collider(this.player2, this.ground)
    this.physics.add.collider(this.meats, this.ground)
    this.physics.add.collider(this.bombs, this.ground)
    this.physics.add.collider(this.cactos, this.ground)
    // this.physics.add.overlap(this.player, this.meats, collectMeat, null, this)
    this.physics.add.overlap(this.player2, this.meats, collectMeat, null, this)
    // this.physics.add.collider(this.player, this.bombs, hitBomb, null, this)
    this.physics.add.collider(this.player2, this.bombs, hitBomb, null, this)
    // this.cameras.main.startFollow(this.player, true, 0.05, 0.05)
    this.cameras.main.startFollow(this.player2, true, 0.05, 0.05)
    this.cameras.main.setBounds(0, 0, 800, 600)
    this.cameras.main.setBackgroundColor('#f7f7f7')
  }

  update() {
    if (this.isGameOver === false) {
      this.score += 1
      this.scoreText.setText('SCORE: ' + this.score)
      let cursors = this.input.keyboard.createCursorKeys()
      // this.player.anims.play('run', true)
      // this.player2.anims.play('run3', true)
      if (cursors.right.isDown) {
        // this.player.setVelocityX(200)
        // this.player.flipX = false
        this.player2.setVelocityX(200)
        this.player2.flipX = false
      }
      else if (cursors.left.isDown) {
        // this.player.setVelocityX(-260)
        this.player2.setVelocityX(-260)
      }
      else {
        // this.player.setVelocityX(0)
        this.player2.setVelocityX(0)
      }

      if (cursors.down.isDown) {
        this.player2.anims.play('run3' ,true)
      } else {
        this.player2.anims.play('run2', true)
      }

      // if (cursors.up.isDown && this.player.body.touching.down) {
      //   this.player.setVelocityY(-600);
      // }
      if (cursors.up.isDown && this.player2.body.touching.down) {
        this.player2.setVelocityY(-600);
    }

      // this.background1.tilePositionX += 1
      // this.background2.tilePositionX += 3
      // this.background3.tilePositionX += 5
      // this.background4.tilePositionX += 7
      // this.background5.tilePositionX += 10
      this.ground.tilePositionX += 10
  }
}
}

export default GameScene
