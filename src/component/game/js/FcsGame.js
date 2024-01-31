import React, {useState, useEffect, useRef} from 'react';
import Phaser from 'phaser';
import '../scss/CSGame.scss';

const greens = Phaser.Display.Color.GetColor(0, 255, 0);
const reds = Phaser.Display.Color.GetColor(255, 0, 0);

const MainScene = ()=> {
    const game = useRef(null);
    let player = null
    let playerAttack = null;
    let playerAttackTween = null;
    let redAttack = null;
    let redAttackTween = null;
    let redMini ={
        minion: null,
        move: null,
        healthBar : null
    };
    let blueMini = ({
        minion: null,
        healthBars: [],
        moveTween : null,
        healthBarTween : null,
        repeatCount : 0
    });
    const blueMinions = [];

    useEffect(() => {
        const config = {
            type: Phaser.AUTO,
            parent: 'phaser-container',
            width: 1000,
            height: 600,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 300 },
                    debug: false
                },
            },
            scene: {
                preload,
                create,
                update,
            },
            scale: {
                mode: Phaser.Scale.RESIZE,
                autoCenter: Phaser.Scale.CENTER_BOTH,
            },
        };

        game.current = new Phaser.Game(config);
        return () => {
            game.current.destroy(true);
        };
    }, []);

    function preload () {
        this.load.image("redMinion", "assets/Chaos_Minion_Melee_Render.png");
        this.load.image("blueMinion", "assets/blueMinion.png");
        this.load.image("player", "assets/temo.png");
        this.load.image("background", "assets/lol_game_back.jpg");
    }
    //미니언 이동 애니메이션
    function MinionTween(twee, target, x,y){
        return twee.add({
            targets: target,
            x: x,
            y: y,
            duration: 3000, // 이동에 걸리는 시간 (밀리초)
            ease: 'Linear', // 이동에 사용할 easing 함수
        });
    }
    //미니언 체력바 애니메이션
    const HealthBarsTween =(tweens, target,x,y) => {
        return tweens.add({
            targets: target,
            x: x,
            y: y,
            duration: 3000, // 이동에 걸리는 시간 (밀리초)
            ease: 'Linear', // 이동에 사용할 easing 함수
        });
    }
    function createBlueMinion (physics,add,tweens,x,y){
        //롤 블루미니언
        const blueMinion = physics.add.sprite(x, y, "blueMinion");
        blueMinion.disableBody(true, false);
        blueMinion.setScale(-0.1, 0.1);
        blueMinion.setData('health', 100);
        blueMinion.setData('damage', 20);
        blueMinion.setInteractive();


        const blueHealthBars = [];
        for (let i = 0; i < 5; i++) {
            blueHealthBars[i] = add.rectangle((x-5)+(15*i), y, 15, 10);
            blueHealthBars[i].setFillStyle(greens);
        }
        const minionTween = MinionTween(tweens,blueMinion,1000,0);
        const healthBarsTween = HealthBarsTween(tweens,blueHealthBars,1000,-50);

        return blueMini = ({
            minion: blueMinion,
            healthBars: blueHealthBars,
            moveTween : minionTween,
            healthBarTween : healthBarsTween,
            repeatCount: 0
        });

    }

    function create () {

        const backImg = this.add.image(500,300,"background");
        backImg.setScale(2);

        // 게임 화면의 가로, 세로 크기
        const gameWidth = 1000;
        const gameHeight = 600;

        // 카메라를 생성하고 게임 월드에 추가
        this.cameras.main.setBounds(0, 0, gameWidth, gameHeight);
        this.cameras.main.setZoom(1.3);
        this.cameras.main.centerOn(0, 0);

        blueMinions[0] = createBlueMinion(this.physics,this.add,this.tweens,40,450);
        blueMinions[1] = createBlueMinion(this.physics,this.add,this.tweens,30,500);
        blueMinions[2] = createBlueMinion(this.physics,this.add,this.tweens,20,550);
        blueMinions[3] = createBlueMinion(this.physics,this.add,this.tweens,10,600);

        console.log(blueMinions)


        //롤 레드미니언
        const redMinion = this.physics.add.sprite(900, 100, "redMinion");
        redMinion.disableBody(true, false);
        redMinion.setScale(0.1);
        redMinion.setData('health', 100);
        redMinion.setData('damage', 20);

        const redHealthBars = [];
        for (let i = 0; i < 5; i++) {
            redHealthBars[i] = this.add.rectangle(880+(15*i),90, 15, 10);
            redHealthBars[i].setFillStyle(greens);
        }

        const redMinionTween = MinionTween(this.tweens,redMinion,0,600);
        const redHealthBarsTween = HealthBarsTween(this.tweens,redHealthBars,0,550);

        redMini = ({
            minion: redMinion,
            move : redMinionTween,
            healthBar : redHealthBarsTween
        })

        // player를 클래스의 인스턴스 변수로 선언
        const playerInstance = this.physics.add.sprite(200, 500, "player");
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

        blueMinions.forEach(blueMini => {
            blueMini.minion.on('pointerdown',(pointer)=>{
                if(pointer.rightButtonDown()){
                    console.log("우클릭 실행됨")
                    if (!playerAttackTween||!playerAttackTween.isPlaying()){
                        playerAttackTween = this.tweens.add({
                            targets: playerAttack,
                            x: blueMini.minion.x,
                            y: blueMini.minion.y,
                            duration: 1500,
                            ease: 'Linear',
                            paused: true, // 처음에는 일시 정지된 상태로 시작
                            onStart: () => {
                                // Tween이 시작되기 전에 호출되는 콜백
                                playerAttack.x = player.x;
                                playerAttack.y = player.y;
                                playerAttack.visible = true;
                                // if (blueMini.minion.getData('health')<=0){
                                //     playerAttackTween.stop();
                                // }
                            },
                            onUpdate: () => {
                                // Tween이 업데이트될 때마다 호출되는 콜백
                                // 현재 this.blueMini의 위치로 업데이트
                                // playerAttackTween.updateTo('x', blueMini.minion.x);
                                // playerAttackTween.updateTo('y', blueMini.minion.y);
                            },
                            onComplete: ()=>{

                                //미니언 체력바 깍기
                                if (repeatCount <= 4){
                                    //미니언 체력수치 깎기
                                    blueMini.minion.setData('health', blueMini.minion.getData('health') - blueMini.minion.getData('damage'));

                                    const index = 4 - blueMini.repeatCount
                                    blueMini.healthBars[index].setFillStyle(reds);
                                    blueMini.repeatCount ++;
                                }

                                playerAttack.visible = false;
                            }
                        });
                    }

                    if (blueMini.minion.getData('health') > 0){
                        playerAttackTween.play();
                    }
                }

            })
        })



        redAttack = this.add.circle(0,0, 10, 0xFF0000);
        redAttack.visible = false;

        let repeatCount = 0;

        //미니언 공격
        redAttackTween = this.tweens.add({
            targets: redAttack,
            x: blueMinions[1].minion.x,
            y: blueMinions[1].minion.y,
            duration: 1800,
            ease: 'Linear',
            paused: true, // 처음에는 일시 정지된 상태로 시작
            loop:5,
            onLoop:()=>{
                if (blueMinions[1].minion.getData('health')<=0){
                    redAttack.visible = false;
                    redAttackTween.stop();
                }

                //미니언 체력수치 깎기
                blueMinions[1].minion.setData('health', blueMinions[1].minion.getData('health') - blueMinions[1].minion.getData('damage'));

                //미니언 체력바 깍기
                console.log(blueMinions[1]);
                const index = 4 - blueMinions[1].repeatCount
                blueMinions[1].healthBars[index].setFillStyle(reds);
                blueMinions[1].repeatCount ++;
            },
            onStart: () => {
                // Tween이 시작되기 전에 호출되는 콜백
                redAttack.x = redMini.minion.x;
                redAttack.y = redMini.minion.y;
                redAttack.visible = true;
            },
            onUpdate: () => {
                // Tween이 업데이트될 때마다 호출되는 콜백
                // 현재 this.blueMini의 위치로 업데이트
                redAttackTween.updateTo('x', blueMini.minion.x);
                redAttackTween.updateTo('y', blueMini.minion.y);
            },
            onComplete: ()=>{
                redAttack.visible = false;
            }
        });
    };

    function update() {

        // 거리가 200 이하이면 해당 Tween 애니메이션을 멈춥니다.
        blueMinions.forEach((bm,index) => {
            const distanceToMini = Phaser.Math.Distance.Between(bm.minion.x, bm.minion.y, redMini.minion.x, redMini.minion.y);
            if (distanceToMini <= 200) {
                bm.moveTween.stop();
                bm.healthBarTween.stop();

                redMini.move.stop();
                redMini.healthBar.stop();

                if (bm.minion.getData('health') > 0) {
                    // Tween이 실행 중이지 않으면 시작
                    if (!redAttackTween.isPlaying()) {
                        redAttackTween.play();
                    }
                } else {
                    bm.minion.destroy();
                    bm.healthBars.forEach(b => {
                        b.destroy();
                    })

                    redAttackTween.resume();
                    redAttack.visible = false;
                }
            }
        })

    }

    const handleContextMenu = (e) => {
        e.preventDefault();
    };

    return (
        <div id={'csgames'} onContextMenu={handleContextMenu}>
            <div id="phaser-container"/>
        </div>
    );
};

export default MainScene;
