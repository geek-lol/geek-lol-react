import React from 'react';
import Phaser from "phaser";


export default class endScene extends Phaser.Scene {
    constructor() {
        super('startScene');
    }

    preload () {
        this.load.image("startBack","assets/Teemo_0.jpg");
    }
    create () {
    }
};


