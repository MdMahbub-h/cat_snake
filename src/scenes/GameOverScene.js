import { Scene } from "phaser";

export class GameOverScene extends Scene {
    constructor() {
        super("GameOverScene");
    }

    init(data) {
        this.cameras.main.fadeIn(500, 0, 0, 0);
        this.score = data.point;
    }

    create() {
        this.add
            .image(0, 0, "boardBg")
            .setOrigin(0, 0)
            .setDisplaySize(this.scale.width, this.scale.height);
        const graphics = this.add.graphics();
        graphics.fillStyle(0x000000, 0.8);
        graphics.fillRect(0, 0, this.scale.width, this.scale.height);

        this.ScoreText = this.add
            .text(
                this.scale.height / 2,
                this.scale.height * 0.3,
                "YOUR SCORE",
                {
                    font: "50px Arial",
                    fill: "#f0f000",
                    fontStyle: "bold",
                    stroke: "#f40839",
                    strokeThickness: 3,
                }
            )
            .setOrigin(0.5, 0.5);

        this.textScore = this.add
            .text(this.scale.height / 2, this.scale.height * 0.45, this.score, {
                font: "100px Arial",
                fill: "#f0f000",
                fontStyle: "bold",
                stroke: "#f40839",
                strokeThickness: 3,
            })
            .setOrigin(0.5, 0.5);
        this.rePlay = this.add
            .text(
                this.scale.height / 2,
                this.scale.height * 0.75,
                "PLAY AGAIN",
                {
                    font: "40px Arial",
                    fill: "#f0f000",
                    fontStyle: "bold",
                    stroke: "#f40839",
                    strokeThickness: 3,
                }
            )
            .setOrigin(0.5, 0.5)
            .setInteractive({ useHandCursor: true });

        this.input.on("pointerdown", () => {
            this.cameras.main.fadeOut(500, 0, 0, 0);
            setTimeout(() => {
                this.scene.start("MenuScene");
            }, 500);
        });
    }
}
