import { Scene } from "phaser";
export class MainScene extends Scene {
    constructor() {
        super("MainScene");
        this.isMobile =
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
            );
        this.score = 0;
    }

    init(data) {
        this.level = data.level;

        this.direction = 1;
        this.cursor;
        this.food;
        this.head;
        this.snake = [];
        this.headX = 250;
        this.headY = 250;
        this.snakeBody;
        this.isGameOver = false;
        this.point = 0;
        this.textScore;

        this.length = this.scale.width;
        this.boardLength = this.length * 0.52;
        this.gridLength = this.boardLength / 14;
        this.sectionVisual = this.boardLength / 12;
    }

    create() {
        this.add
            .image(0, 0, "boardBg")
            .setOrigin(0, 0)
            .setDisplaySize(this.length, this.length);

        this.add
            .image(this.length / 2, this.length / 2, "board")
            .setOrigin(0.5, 0.5)
            .setDisplaySize(this.boardLength, this.boardLength);

        this.head = this.physics.add
            .image(
                this.headX - this.gridLength / 4,
                this.headY - this.gridLength / 4,
                "head"
            )
            .setDisplaySize(this.gridLength * 0.95, this.gridLength * 0.95);
        this.head.setDepth(5);
        this.head.setOrigin(0.5, 0.5);
        this.snake.push(this.head);

        this.snakeBody = this.physics.add.group();
        this.snakeTail();

        this.ScoreText = this.add.text(20, 40, "SCORE", {
            font: "30px Arial",
            fill: "#f0f000",
            fontStyle: "bold",
            stroke: "black",
            strokeThickness: 3,
        });

        this.textScore = this.add
            .text(70, 110, "0", {
                font: "40px Arial",
                fill: "#f0f000",
                fontStyle: "bold",
                stroke: "black",
                strokeThickness: 3,
            })
            .setOrigin(0.5, 0.5);
        let delay = 400;
        if (this.level == 2) {
            delay = 300;
        } else if (this.level == 3) {
            delay = 200;
        }

        this.time.addEvent({
            delay: delay,
            loop: true,
            callback: () => {
                if (!this.isGameOver) {
                    let x = this.head.x;
                    let y = this.head.y;

                    if (this.direction === 0) {
                        x = Phaser.Math.Wrap(
                            x - this.gridLength,
                            this.length / 2 - this.gridLength * 7,
                            this.length / 2 + this.gridLength * 7
                        );
                    } else if (this.direction === 1) {
                        x = Phaser.Math.Wrap(
                            x + this.gridLength,
                            this.length / 2 - this.gridLength * 7,
                            this.length / 2 + this.gridLength * 7
                        );
                    } else if (this.direction === 2) {
                        y = Phaser.Math.Wrap(
                            y - this.gridLength,
                            this.length / 2 - this.gridLength * 7,
                            this.length / 2 + this.gridLength * 7
                        );
                    } else if (this.direction === 3) {
                        y = Phaser.Math.Wrap(
                            y + this.gridLength,
                            this.length / 2 - this.gridLength * 7,
                            this.length / 2 + this.gridLength * 7
                        );
                    }

                    Phaser.Actions.ShiftPosition(this.snake, x, y);
                }
            },
        });
        this.cursor = this.input.keyboard.createCursorKeys();

        this.randomFood();
    }
    update() {
        const { left, right, up, down } = this.cursor;
        if (left.isDown & (this.direction != 1)) {
            this.direction = 0;
        } else if (right.isDown & (this.direction != 0)) {
            this.direction = 1;
        } else if (up.isDown & (this.direction != 3)) {
            this.direction = 2;
        } else if (down.isDown & (this.direction != 2)) {
            this.direction = 3;
        }
    }
    randomFood() {
        let x =
            Phaser.Math.Between(1, 14) * this.gridLength +
            this.length / 2 -
            this.gridLength * 7;
        let y =
            Phaser.Math.Between(1, 14) * this.gridLength +
            this.length / 2 -
            this.gridLength * 7;
        this.food = this.physics.add
            .image(x - this.gridLength / 2, y - this.gridLength / 2, "mouse")
            .setOrigin(0.5, 0.5)
            .setDisplaySize(this.gridLength * 0.95, this.gridLength * 0.95);
        this.physics.add.overlap(this.head, this.food, this.eat, null, this);
    }
    eat() {
        console.log("eat");
        this.food.destroy();
        this.headX = this.head.x;
        this.headY = this.head.y;
        this.randomFood();
        this.fullSnake();
        this.point += 1 * this.level;
        this.textScore.setText(`${this.point}`);
    }
    snakeTail() {
        const part = this.physics.add
            .image(-50, -50, "tail")
            .setDisplaySize(this.gridLength * 0.95, this.gridLength * 0.95);
        part.setOrigin(0.5, 0.5);
        this.snake.unshift(part);
        this.snakeBody.add(part);
    }
    fullSnake() {
        if (!this.isGameOver) {
            const part = this.physics.add
                .image(-50, -50, "body")
                .setDisplaySize(this.gridLength * 0.95, this.gridLength * 0.95);
            part.setOrigin(0.5, 0.5);

            const index = this.snake.length - 1;
            this.snake.splice(index, 0, part);
            this.snakeBody.add(part);

            this.physics.add.overlap(
                this.head,
                this.snakeBody,
                () => {
                    this.isGameOver = true;
                    this.gameOver();
                },
                null,
                this
            );
        }
    }

    gameOver() {
        this.cameras.main.fadeOut(1000, 0, 0, 0);
        setTimeout(() => {
            this.scene.start("GameOverScene", { point: this.point });
        }, 1000);
    }
}
