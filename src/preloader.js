export class Preloader extends Phaser.Scene {
    constructor() {
        super({ key: "Preloader" });
    }

    preload() {
        this.load.setPath("assets");
        this.load.image("logo", "head.png");
        this.load.image("board", "board.png");
        this.load.image("boardBg", "boardBg.png");
        this.load.image("head", "head.png");
        this.load.image("body", "body.png");
        this.load.image("tail", "tail.png");
        this.load.image("mouse", "mouse.png");
    }

    create() {
        const config = {
            image: "logo",
            width: 31,
            height: 25,
            chars: Phaser.GameObjects.RetroFont.TEXT_SET6,
            charsPerRow: 10,
            spacing: { x: 1, y: 1 },
        };
        this.cache.bitmapFont.add(
            "logo",
            Phaser.GameObjects.RetroFont.Parse(this, config)
        );

        this.scene.start("SplashScene");
    }
}
