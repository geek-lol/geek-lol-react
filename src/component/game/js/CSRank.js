import React, {useState} from 'react';
import Phaser from "phaser";
import {getCurrentLoginUser} from "../../../utils/login-util";
import axios from "axios";
import {formatDate} from "../../../utils/format-date";

// 토큰 가져오기
const token= getCurrentLoginUser().token;
const tokenUserId= getCurrentLoginUser().userId;

//요청 URL
const API_URL = "http://localhost:8686/game/cs";

// 요청 헤더 객체
const requestHeader = {
    'content-type': 'application/json',
    'Authorization': `Bearer ${token}`
};

let rankList= [];
let myRankRecord = null;
const loads = () =>{
    console.log("fetch함니더")
    fetch(API_URL, {
        headers: {"content-type": "application/json"}
    })
        .then(res=> res.json())
        .then(json => {
            console.log(json)
            rankList = json.gameRankList
            addRankKey();
        })

}

const addRankKey= () =>{
    console.log('addRankKey : rankList')
    console.log(rankList)
    const map = rankList.map((rank, index) => ({...rank, rank:index+1}));
    rankList = map;
    const filter = map.filter(rank=> rank.userId === tokenUserId);
    if (filter.length > 0)
        myRankRecord = filter[0];
}

export default class rankScene extends Phaser.Scene {
    constructor() {
        super('rankScene');
    }
    preload () {
        loads();
    }
    create () {

        this.time.delayedCall(1000,()=>{
            const home = this.add.text(80,50,`홈으로`,{ font: '20px Arial', fill: '#ffffff' });
            this.add.text('80','100',`나의 랭킹:`,{ font: '20px Arial', fill: '#ffffff' });
            if(myRankRecord !== null){
                this.add.text('210','100',`${myRankRecord.rank}`,{ font: '20px Arial', fill: '#ffffff' });
                this.add.text('350','100',`${myRankRecord.userName}(${myRankRecord.userId}):`,{ font: '20px Arial', fill: '#ffffff' });
                this.add.text('830','100',`${myRankRecord.score}`,{ font: '20px Arial', fill: '#ffffff' });
                this.add.text('1100','100',`${formatDate(myRankRecord.recordDate)}`,{ font: '20px Arial', fill: '#ffffff' });
            }else{
                this.add.text('210','100',`게임 정보가 없습니다.`,{ font: '20px Arial', fill: '#ffffff' });
            }


            this.add.text('200','200',`순위`,{ font: '20px Arial', fill: '#ffffff' });
            this.add.text('400','200',`닉네임(아이디)`,{ font: '20px Arial', fill: '#ffffff' });
            this.add.text('830','200',`점수`,{ font: '20px Arial', fill: '#ffffff' });
            this.add.text('1100','200',`기록일`,{ font: '20px Arial', fill: '#ffffff' });
            rankList.map((rankList,index)=>{
                this.add.text('210',`${250+(50*index)}`,`${rankList.rank}`,{ font: '20px Arial', fill: '#ffffff' });
                this.add.text('350',`${250+(50*index)}`,`${rankList.userName}(${rankList.userId})`,{ font: '20px Arial', fill: '#ffffff' });
                this.add.text('830',`${250 + (50 * index)}`,`${rankList.score}`,{ font: '20px Arial', fill: '#ffffff' });
                this.add.text('1100',`${250+(50*index)}`,`${formatDate(rankList.recordDate)}`,{ font: '20px Arial', fill: '#ffffff' });
            })

            home.setInteractive();
            home.on('pointerdown', (pointer)=>{
                this.scene.stop();
                this.scene.start('startScene');
            })

        })



    }
};


