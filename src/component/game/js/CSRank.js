import React from 'react';
import Phaser from "phaser";
import CsGame from "./CSGame";


class endScene extends Phaser.Scene {
    constructor() {
        super('rankScene');
    }
    preload () {
    }
    create () {
        this.add.text('500','500',`랭크페이지요!!`,{ font: '36px Arial', fill: '#ffffff' });
    }
};
export default endScene;

