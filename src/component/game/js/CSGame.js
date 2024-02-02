import React from 'react';
import Phaser from "phaser";
import endScene from "./CSRank";

const greens = Phaser.Display.Color.GetColor(0, 255, 0);
const reds = Phaser.Display.Color.GetColor(255, 0, 0);

let player = null
let playerAttack = null;
let playerAttackTween = null;

let playerScore = 0;
let scoreText = null;
let timeText = null;    let center = null;
let redMinions = null;
let blueMinions = null;

let gametimer = null;
let timeCount =  10000; //180000;
//시간 format 함수
function formatTime(seconds) { // 100000 = 100초 = 1분 40초
    const s = Math.floor(seconds / 1000); // 100초
    const minutes = Math.floor(s/60); // 1
    const remainingSeconds = s % 60; // 40
    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    return formattedTime;
};
//미니언 이동 애니메이션
function MinionTween(twee, target, x,y ){
    const moveT = twee.add({
        targets: target,
        x: x,
        y: y,
        duration: 3000, // 이동에 걸리는 시간 (밀리초)
        ease: 'Linear', // 이동에 사용할 easing 함수
    });
    return moveT
}
//미니언 체력바 애니메이션
const HealthBarsTween =(tweens, target,x,y) => {
    const healthT = tweens.add({
        targets: target,
        x: x,
        y: y,
        duration: 3000, // 이동에 걸리는 시간 (밀리초)
        ease: 'Linear', // 이동에 사용할 easing 함수
    });
    return healthT
}
//랜덤 선택
function getRandomElement(group) {
    // Group 내의 자식 객체들을 배열로 변환
    const childrenArray = group.getChildren();

    // 배열에서 랜덤하게 하나의 객체 선택
    const randomIndex = Phaser.Math.RND.between(0, childrenArray.length - 1);

    // 선택된 객체 반환
    return childrenArray[randomIndex];
}

function createBlueMinion (physics,add,tweens,x,y){
    const blueMinion = physics.add.sprite(x, y, "blueMinion");

    const Attack = add.circle(0,0, 10, 0xFF0000);
    Attack.visible = false;

    const blueHealthBars = [];
    for (let i = 0; i < 5; i++) {
        blueHealthBars[i] = add.rectangle((x-20)+(15*i), y-50, 15, 10);
        blueHealthBars[i].setFillStyle(greens);
    }
    const minionTween = MinionTween(tweens,blueMinion,1000,0);
    const healthBarsTween = HealthBarsTween(tweens,blueHealthBars,1000,-50);

    //롤 블루미니언

    blueMinion.setScale(-0.1, 0.1);
    blueMinion.setData('repeatCount', 0);
    blueMinion.setData('health', 100);
    blueMinion.setData('healthBar', blueHealthBars);
    blueMinion.setData('damage', 20);
    blueMinion.setData('moveTween',minionTween)
    blueMinion.setData('healthBarTween',healthBarsTween)
    blueMinion.setData('attack',Attack)
    blueMinion.setInteractive(); //마우스 이벤트에 응답 가능하게

    return blueMinion
}

function createRedMinion (physics,add,tweens,x,y){
    //롤 레드미니언
    const redMinion = physics.add.sprite(x, y, "redMinion");

    const redHealthBars = [];
    for (let i = 0; i < 5; i++) {
        redHealthBars[i] = add.rectangle(780+(15*i),y-10, 15, 10);
        redHealthBars[i].setFillStyle(greens);
    }

    const redMinionTween = MinionTween(tweens,redMinion,0,600);
    const redHealthBarsTween = HealthBarsTween(tweens,redHealthBars,0,550);

    const Attack = add.circle(0,0, 10, 0xFF0000);
    Attack.visible = false;

    redMinion.setScale(0.1);
    redMinion.setData('repeatCount', 0);
    redMinion.setData('health', 100);
    redMinion.setData('healthBar', redHealthBars);
    redMinion.setData('damage', 20);
    redMinion.setData('moveTween',redMinionTween)
    redMinion.setData('healthBarTween',redHealthBarsTween)
    redMinion.setData('attack',Attack)
    redMinion.setInteractive(); //마우스 이벤트에 응답 가능하게

    return redMinion
}
//미니언 공격
function attackTween(tweens, attack, target, attacker,delay){
    const attacks = tweens.add({
        targets: attack,
        x:0,
        y:0,
        duration: 1800,
        ease: 'Linear',
        paused: true, // 처음에는 일시 정지된 상태로 시작
        delay: delay,
        loop:5,
        onLoop:()=>{
            attacker.getData('attack').visible = false;

            if (target.getData('health')<=0){
                attacks.stop();
            }else {
                attacker.getData('attack').visible = true;
                //미니언 체력수치 깎기
                target.setData('health', target.getData('health') -target.getData('damage'));

                //미니언 체력바 깍기
                const index = 4 - target.getData('repeatCount');
                target.getData('healthBar')[index].setFillStyle(reds);
                target.setData('repeatCount',target.getData('repeatCount')+1);
            }
        },
        onStart: () => {
            // Tween이 시작되기 전에 호출되는 콜백
            attacker.getData('attack').x = attacker.x;
            attacker.getData('attack').y = attacker.y;
            attacker.getData('attack').visible = true;
        },
        onUpdate: () => {
            // Tween이 업데이트될 때마다 호출되는 콜백
            // 현재 this.blueMini의 위치로 업데이트
            attacks.updateTo('x', target.x);
            attacks.updateTo('y', target.y);
        },
        onComplete: ()=>{
            attacker.getData('attack').visible = false;
        }
    });

    return attacks
}

class CsGame extends Phaser.Scene {

    constructor() {
        super('mainScene');
    }

    preload () {
        this.load.image("redMinion", "assets/Chaos_Minion_Melee_Render.png");
        this.load.image("blueMinion", "assets/blueMinion.png");
        this.load.image("player", "assets/temo.png");
        this.load.image("background", "assets/lol_game_back.jpg");
    }
    create () {
        redMinions = this.physics.add.group();
        blueMinions = this.physics.add.group();

        const backImg = this.add.image(500,300,"background");
        backImg.setScale(2);
        center = this.add.rectangle(500,300,10);
        // 게임 화면의 가로, 세로 크기
        const gameWidth = 1000;
        const gameHeight = 600;

        // 카메라를 생성하고 게임 월드에 추가
        this.cameras.main.setBounds(0, 0, gameWidth, gameHeight);
        this.cameras.main.setZoom(1.3);
        this.cameras.main.centerOn(0, 0);

        // 블루 미니언
        for (let i = 0; i < 4; i++) {
            blueMinions.add(createBlueMinion(this.physics,this.add,this.tweens,0,400+(120*i)),true);
        }
        for (let i = 0; i < 4; i++) {
            redMinions.add(createRedMinion(this.physics,this.add,this.tweens,800,(100 * i)),true);
        }

        // player를 클래스의 인스턴스 변수로 선언
        const playerInstance = this.physics.add.sprite(500, 500, "player");
        playerInstance.setScale(0.1);
        playerInstance.setData('damage',25);
        playerInstance.disableBody(true, false);
        playerInstance.setBodySize(100,100);

        player = playerInstance;
        //
        // //카메라가 player 따라다님
        this.cameras.main.startFollow(playerInstance);
        // 플레이어 공격
        playerAttack =  this.add.circle(200,500, 10, 0xFF0000);
        playerAttack.visible = false;

        timeText = this.add.text(150,120,`남은시간:03:00`,{ font: '16px Arial', fill: '#ffffff' });
        timeText.setScrollFactor(0);

        scoreText = this.add.text(150,150,`점수:${playerScore}`,{ font: '16px Arial', fill: '#ffffff' });
        scoreText.setScrollFactor(0);

        //미니언이 공격할 대상 랜덤지정
        blueMinions.children.iterate(bm => {
            const targetRed = getRandomElement(redMinions);
            bm.setData('target', targetRed);
            bm.setData('AttackTween' ,attackTween(this.tweens,bm.getData('attack'),targetRed,bm,1000+bm.y));
        })


        // 게임 루프에서 실행되는 업데이트 로직
        this.input.on('pointerdown', (pointer) => {
            // console.log(`마우스 클릭 : ${pointer.leftButtonDown()}`)
            const worldPoint = this.cameras.main.getWorldPoint(pointer.x, pointer.y);
            // 마우스 클릭한 좌표를 얻습니다.
            if (pointer.leftButtonDown()) {
                const circle = this.add.circle(worldPoint.x,worldPoint.y, 10, 0xFF0000); // 0xFF0000은 빨간색의 16진수 표현입니다.

                // Tween 애니메이션을 사용하여 1초 동안 투명하게 만듭니다.
                this.tweens.add({
                    targets: circle,
                    alpha: 0,
                    duration: 1000,
                    ease: 'Linear'
                });
                // console.log(player);
                const distance = Phaser.Math.Distance.Between(playerInstance.x, playerInstance.y, worldPoint.x, worldPoint.y);
                const speed = 100;

                // 플레이어를 클릭한 좌표로 이동시킵니다.
                // 플레이어를 Tween 애니메이션을 사용하여 이동시킵니다.
                this.tweens.add({
                    targets: playerInstance,
                    x: worldPoint.x,
                    y: worldPoint.y,
                    duration: distance / speed * 1000, // 이동에 걸리는 시간 (밀리초)
                    ease: 'Linear', // 이동에 사용할 easing 함수
                });
            }
        });

        function timerCallback() {
            timeText.text= `남은시간:${formatTime(timeCount)}`;
            timeCount = (timeCount-1000);
        }

        gametimer= this.time.addEvent({
            delay: 1000,      // 밀리초 단위의 지연 시간
            callback: timerCallback,
            callbackScope: this,
            loop: true
        })

    }

    update(){
        console.log('실행중')
        redMinions.children.iterate(redMinion => {
            redMinion.on('pointerdown',(pointer)=>{
                const minionPoint = this.cameras.main.getWorldPoint(pointer.x, pointer.y);
                const distance = Phaser.Math.Distance.Between(player.x, player.y, minionPoint.x, minionPoint.y);
                // 일정한 속도로 이동하도록 duration 계산
                const speed = 200; // 이동 속도 (픽셀/초)
                if(pointer.rightButtonDown()){
                    if (!playerAttackTween||!playerAttackTween.isPlaying()){
                        playerAttackTween = this.tweens.add({
                            targets: playerAttack,
                            x: redMinion.x,
                            y: redMinion.y,
                            duration: distance / speed * 1000,
                            ease: 'Linear',
                            paused: true, // 처음에는 일시 정지된 상태로 시작
                            onStart: () => {
                                // Tween이 시작되기 전에 호출되는 콜백
                                playerAttack.x = player.x;
                                playerAttack.y = player.y;
                                playerAttack.visible = true;

                            },
                            onComplete: ()=>{

                                //미니언 체력바 깍기
                                if (redMinion.getData('repeatCount') <= 4){
                                    //미니언 체력수치 깎기
                                    redMinion.setData('health', redMinion.getData('health') - redMinion.getData('damage'));

                                    const index = 4 - redMinion.getData('repeatCount')
                                    redMinion.getData('healthBar')[index].setFillStyle(reds)
                                    redMinion.setData('repeatCount',redMinion.getData('repeatCount') + 1);
                                    if ( redMinion.getData('health') <= 0){
                                        playerScore += 10;
                                        scoreText.text = `점수: ${playerScore}`;
                                    }
                                }

                                playerAttack.visible = false;
                            }
                        });
                    }

                    if (redMinion.getData('health') > 0){
                        playerAttackTween.play();
                    }
                }

            })
        })
        redMinions.children.iterate((rm)=>{
            if (rm !=null){
                if (rm.getData('moveTween').isPlaying()){
                    const distance = Phaser.Math.Distance.Between(rm.x, rm.y, center.x,  center.y);
                    if (distance <= 200) {
                        rm.getData('moveTween').stop();
                        rm.getData('healthBarTween').stop();
                    }
                } else{
                    if (rm.getData('health') <= 0){
                        rm.getData('healthBar').forEach(h=> h.destroy());
                        rm.destroy();
                        redMinions.remove(rm)
                    }
                }
            }

        });
        blueMinions.children.iterate((bm) => {
            if (bm.getData('moveTween').isPlaying()){
                const distance = Phaser.Math.Distance.Between(bm.x, bm.y, center.x, center.y);
                const bluedistance = Phaser.Math.Distance.Between(bm.getData('target').x, bm.getData('target').y, center.x, center.y);

                if (distance <= 200) {
                    if (bluedistance <= 200){
                        bm.getData('moveTween').stop();
                        bm.getData('healthBarTween').stop();
                    }
                }
            }else{
                if (bm.getData('target') != null){
                    if(bm.getData('target').getData('health') > 0){
                        if(!bm.getData('AttackTween').isPlaying()){
                            bm.getData('AttackTween').play();
                        }
                    } else{
                        bm.getData('AttackTween').stop();
                        bm.getData('attack').visible = false;
                        bm.setData('target',null);
                    }
                }else{
                    const targetRed = getRandomElement(redMinions);
                    bm.setData('target', targetRed);
                    bm.setData('AttackTween' ,attackTween(this.tweens,bm.getData('attack'),targetRed,bm,1000+bm.y));
                }
            }
        });
        if (redMinions.children.entries.length === 0){
            for (let i = 0; i < 4; i++) {
                redMinions.add(createRedMinion(this.physics,this.add,this.tweens,800,(100 * i)),true);
            }
        }

        if (timeCount <=0){
            gametimer.paused = true;
            this.scene.stop();
            this.scene.start('endScene', {score: playerScore});
        }
    }
};

export default CsGame;