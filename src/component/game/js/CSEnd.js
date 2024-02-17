import React from 'react';
import Phaser from "phaser";
import CsGame from "./CSGame";
import {CSGAME_RANK_URL} from "../../../config/host-config";
import {getCurrentLoginUser} from "../../../utils/login-util";

const createRank =(score) =>{
    const payload = {
        score : score
    }
    fetch(CSGAME_RANK_URL, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            'Authorization': `Bearer ${getCurrentLoginUser().token}`
        },
        body: JSON.stringify(payload)
    }).then(r =>r.json())
 }

class endScene extends Phaser.Scene {
    constructor() {
        super('endScene');
    }
    preload () {
    }
    create (data) {
        createRank(data.score);
        // this.scene.launch('rankScene')

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
            // this.scene.setVisible(false,'rankScene')
            this.scene.start('startScene');
        })
    }
};
export default endScene;
