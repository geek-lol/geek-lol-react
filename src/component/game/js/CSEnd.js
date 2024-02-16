import React from 'react';
import Phaser from "phaser";
import CsGame from "./CSGame";

const createRank =() =>{

}

class endScene extends Phaser.Scene {
    constructor() {
        super('endScene');
    }
    preload () {
    }
    create (data) {
        this.scene.launch('rankScene')

        this.add.rectangle(700,400,500,400,0xFFFF00)
        this.score = data.score;
        this.add.text(600,300,`당신의 점수 ${this.score}`,{ font: '36px Arial', fill: '#000000' })
        const close = this.add.text(550,500,`랭킹보기`,{ font: '36px Arial', fill: '#000000' });
        close.setInteractive();
        const home = this.add.text(750,500,`홈으로`,{ font: '36px Arial', fill: '#000000' });
        home.setInteractive();

        close.on('pointerdown',(pointer)=>{
            this.scene.setVisible(false,'endScene');
        })
        home.on('pointerdown', (pointer)=>{
            this.scene.stop();
            this.scene.setVisible(false,'rankScene')
            this.scene.start('startScene');
        })
    }
};
export default endScene;
