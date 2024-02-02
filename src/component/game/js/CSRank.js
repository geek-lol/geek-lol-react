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
        this.score = data.score;
        console.log(this.score);
    }
};
export default endScene;

