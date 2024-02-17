import React from 'react';
import Phaser from "phaser";
import "../scss/CSGame.scss";


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

            this.add.text(100,150,`미니언 막타 치기 게임`,{ font: '36px NeoDunggeunmo', fill: '#ffffff' });
            const startText = this.add.text(100,300,`게임시작`,{ font: '36px NeoDunggeunmo', fill: '#ffffff' });
            startText.setInteractive();

            startText.on('pointerdown',(pointer)=>{
                this.scene.stop();
                this.scene.start('mainScene');
            })
            const ranking = this.add.text(100,400,`랭킹`,{ font: '36px NeoDunggeunmo', fill: '#ffffff' });
            ranking.setInteractive();
            ranking.on('pointerdown',(pointer)=>{
                this.scene.stop();
                this.scene.start('rankScene');
            })
        }
    };


