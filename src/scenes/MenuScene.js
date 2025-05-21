import { Scene } from "phaser";

export class MenuScene extends Scene {
    constructor() {
        super("MenuScene");
    }

    init() {
        this.cameras.main.fadeIn(1000, 0, 0, 0);
    }

    create() {
        this.background = this.add
            .image(this.scale.width / 2, this.scale.height / 2, "boardBg")
            .setDisplaySize(this.scale.width, this.scale.height);

        const graphics = this.add.graphics();
        graphics.fillStyle(0x000000, 0.8);
        graphics.fillRect(0, 0, this.scale.width, this.scale.height);

        let level = 1;
        // this.scene.start("MainScene", { level: level });

        let borderWidth = 250;
        let borderHeight = 80;

        this.level1Border = this.add.graphics();
        this.level1Border.clear();
        this.level1Border.lineStyle(5, 0xffff00);
        this.level1Border.strokeRect(
            this.scale.width * 0.5 - borderWidth / 2,
            this.scale.height * 0.3 - borderHeight / 2,
            borderWidth,
            borderHeight
        );
        this.level1Border.setVisible(true);

        this.easy = this.add
            .text(this.scale.width * 0.5, this.scale.height * 0.3, "Easy", {
                fontFamily: "Arial",
                fontSize: "36px",
                fontStyle: "bold",
                color: "#f9bf33",
            })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true });
        this.easy.on("pointerdown", () => {
            level = 1;
            this.level1Border.clear();
            this.level1Border.lineStyle(5, 0xffff00);
            this.level1Border.strokeRect(
                this.scale.width * 0.5 - borderWidth / 2,
                this.scale.height * 0.3 - borderHeight / 2,
                borderWidth,
                borderHeight
            );
            this.level1Border.setVisible(true);
            this.level2Border.setVisible(false);
            this.level3Border.setVisible(false);
        });

        this.level2Border = this.add.graphics();
        this.level2Border.setVisible(false);
        this.medium = this.add
            .text(this.scale.width * 0.5, this.scale.height * 0.44, "Medium", {
                fontFamily: "Arial",
                fontSize: "36px",
                fontStyle: "bold",
                color: "#f9bf33",
            })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true });
        this.medium.on("pointerdown", () => {
            level = 2;
            this.level2Border.clear();
            this.level2Border.lineStyle(5, 0xffff00);
            this.level2Border.strokeRect(
                this.scale.width * 0.5 - borderWidth / 2,
                this.scale.height * 0.44 - borderHeight / 2,
                borderWidth,
                borderHeight
            );
            this.level2Border.setVisible(true);
            this.level1Border.setVisible(false);
            this.level3Border.setVisible(false);
        });

        this.level3Border = this.add.graphics();
        this.level3Border.setVisible(false);
        this.hard = this.add
            .text(this.scale.width * 0.5, this.scale.height * 0.58, "Hard", {
                fontFamily: "Arial",
                fontSize: "36px",
                fontStyle: "bold",
                color: "#f9bf33",
            })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true });
        this.hard.on("pointerdown", () => {
            level = 3;
            this.level3Border.clear();
            this.level3Border.lineStyle(5, 0xffff00);
            this.level3Border.strokeRect(
                this.scale.width * 0.5 - borderWidth / 2,
                this.scale.height * 0.58 - borderHeight / 2,
                borderWidth,
                borderHeight
            );
            this.level3Border.setVisible(true);
            this.level1Border.setVisible(false);
            this.level2Border.setVisible(false);
        });

        this.play = this.add
            .text(this.scale.width / 2, this.scale.height * 0.78, "Play", {
                fontFamily: "Arial",
                fontSize: "70px",
                fontStyle: "bold",
                color: "#b3926e",
            })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on("pointerdown", () => {
                this.cameras.main.fadeOut(1000, 0, 0, 0);
                setTimeout(() => {
                    this.scene.start("MainScene", { level: level });
                }, 1000);
            });
        this.play.setColor("#f40839");
    }
}
