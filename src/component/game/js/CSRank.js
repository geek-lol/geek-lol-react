import React, {useState} from 'react';
import Phaser from "phaser";
import {getCurrentLoginUser} from "../../../utils/login-util";
import axios from "axios";

// 토큰 가져오기
const token= getCurrentLoginUser().token;

//요청 URL
const API_URL = "http://localhost:8686/game/cs";

// 요청 헤더 객체
const requestHeader = {
    'content-type': 'application/json',
    'Authorization': `Bearer ${token}`
};

let rankList= [];

const loads = () =>{
    console.log("fetch함니더")
    fetch(API_URL, {
        headers: {"content-type": "application/json"}
    })
        .then(res=> res.json())
        .then(json => {
            console.log(json)
            rankList = json.gameRankList
        })

}

export default class rankScene extends Phaser.Scene {
    constructor() {
        super('rankScene');
    }
    preload () {
    }
    create () {
        loads()
        this.time.delayedCall(1000,()=>{
            this.add.text('80','100',`나의:`,{ font: '20px Arial', fill: '#ffffff' });

            this.add.text('200','200',`순위`,{ font: '20px Arial', fill: '#ffffff' });
            this.add.text('400','200',`닉네임(아이디)`,{ font: '20px Arial', fill: '#ffffff' });
            this.add.text('830','200',`점수`,{ font: '20px Arial', fill: '#ffffff' });
            this.add.text('1100','200',`기록일`,{ font: '20px Arial', fill: '#ffffff' });
            rankList.map((rankList,index)=>{
                this.add.text('210',`${250+(50*index)}`,`${index+1}`,{ font: '20px Arial', fill: '#ffffff' });
                this.add.text('350',`${250+(50*index)}`,`${rankList.userName}(${rankList.userId})`,{ font: '20px Arial', fill: '#ffffff' });
                this.add.text('830',`${250 + (50 * index)}`,`${rankList.score}`,{ font: '20px Arial', fill: '#ffffff' });
                this.add.text('1100',`${250+(50*index)}`,`${rankList.recordDate}`,{ font: '20px Arial', fill: '#ffffff' });
            })
        })




    }
};


