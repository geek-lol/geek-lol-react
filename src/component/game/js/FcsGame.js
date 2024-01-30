import React, {useState, useEffect, useRef} from 'react';
import Phaser from 'phaser';
import '../scss/CSGame.scss';

const greens = Phaser.Display.Color.GetColor(0, 255, 0);
const reds = Phaser.Display.Color.GetColor(255, 0, 0);

const MainScene = ()=> {
    const game = useRef(null);
    const [player, setPlayer] = useState(null);
    let redAttackTween = null;
    let redMini ={
        minion: null,
        move: null,
        healthBar : null
    };
    let blueMini = ({
        minion: null,
        move: null,
        healthBar : null
    });

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
                    debug: false,
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


        //롤 블루미니언
        const blueMinion = this.physics.add.sprite(20, 500, "blueMinion");
        blueMinion.disableBody(true, false);
        blueMinion.setScale(-0.1, 0.1);
        blueMinion.setData('health', 100);
        blueMinion.setData('damage', 20);


        const blueHealthBars = [];
        for (let i = 0; i < 5; i++) {
            blueHealthBars[i] = this.add.rectangle(15*i, 450, 15, 10);
            blueHealthBars[i].setFillStyle(greens);
        }
        const minionTween = MinionTween(this.tweens,blueMinion,1000,0);
        const healthBarsTween = HealthBarsTween(this.tweens,blueHealthBars,1000,-50);

        blueMini = ({
            minion: blueMinion,
            move : minionTween,
            healthBar : healthBarsTween
        });

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

        setPlayer(playerInstance);
        //
        // //카메라가 player 따라다님
        this.cameras.main.startFollow(playerInstance);

        // 게임 루프에서 실행되는 업데이트 로직
        this.input.on('pointerdown', (pointer) => {
            // console.log(`마우스 클릭 : ${pointer.leftButtonDown()}`)
            // 마우스 클릭한 좌표를 얻습니다.
            if (pointer.leftButtonDown()) {
                const worldPoint = this.cameras.main.getWorldPoint(pointer.x, pointer.y);
                console.log(worldPoint)

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

        const redAttack = this.add.circle(0,0, 10, 0xFF0000);
        redAttack.visible = false;

        let repeatCount = 0;

        //미니언 공격
        redAttackTween = this.tweens.add({
            targets: redAttack,
            x: blueMini.minion.x,
            y: blueMini.minion.y,
            duration: 1800,
            // delay:1000,
            ease: 'Linear',
            paused: true, // 처음에는 일시 정지된 상태로 시작
            loop:5,
            onLoop:()=>{
                if (blueMini.minion.getData('health')<=0){
                    redAttack.visible = false;
                    redAttackTween.stop();
                }

                //미니언 체력수치 깎기
                blueMini.minion.setData('health', blueMini.minion.getData('health') - blueMini.minion.getData('damage'));

                //미니언 체력바 깍기
                const index = 4-repeatCount
                blueHealthBars[index].setFillStyle(reds);
                repeatCount ++;
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
        const distanceToMini = Phaser.Math.Distance.Between(blueMini.minion.x, blueMini.minion.y, redMini.minion.x, redMini.minion.y);

        // 거리가 200 이하이면 해당 Tween 애니메이션을 멈춥니다.
        if (distanceToMini <= 200) {
            blueMini.move.stop();
            blueMini.healthBar.stop();
            redMini.move.stop();
            redMini.healthBar.stop();

            if (blueMini.minion.getData('health') > 0) {
                // Tween이 실행 중이지 않으면 시작
                if (!redAttackTween.isPlaying()) {
                    redAttackTween.play();
                }
            } else {
                redAttackTween.destroy();
            }
        }
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
