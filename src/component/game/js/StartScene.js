import React from 'react';
import Phaser from "phaser";


export default class StartScene extends Phaser.Scene {
        constructor() {
            super('startScene');
        }

        preload () {
            this.load.image("startBack","assets/Teemo_0.jpg");
        }
        create () {
            const backImg = this.add.image(500,500,"startBack");
            backImg.setScale(1.5);

            this.add.text(200,200,`미니언 막타 치기 게임`);
            const startText = this.add.text(200,400,`게임시작`);
            startText.setInteractive();

            startText.on('pointerdown',(pointer)=>{
                this.scene.stop();
                this.scene.start('mainScene');
            })
            this.add.text(200,500,`랭킹`);
        }
    };


