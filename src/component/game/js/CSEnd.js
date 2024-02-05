import React from 'react';
import Phaser from "phaser";
import CsGame from "./CSGame";


class endScene extends Phaser.Scene {
    constructor() {
        super('endScene');
    }
    preload () {
    }
    create (data) {
        this.scene.launch('rankScene')
        this.score = data.score;
        this.add.text(500,300,`당신의 점수 ${this.score}`,{ font: '36px Arial', fill: '#ffffff' })

    }
};
export default endScene;
