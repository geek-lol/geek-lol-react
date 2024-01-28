import React, { Component } from 'react';
import Phaser from 'phaser';
import '../scss/CSGame.scss';

class MainScene extends Component{
    constructor(pros) {
        super(pros);
        this.player = null; // 플레이어를 클래스의 인스턴스 변수로 선언
        this.redMini = null;
        this.blueMini = null;
    }

    componentDidMount() {
        // Phaser 초기화 및 게임 설정
        const config = {
            type: Phaser.AUTO,
            parent: 'phaser-container',
            width: 1000,
            height: 600,
            scene: {
                preload: this.preload,
                create: this.create,
                update: this.update
            },
            input: {
                // 마우스 오른쪽 버튼 캡처 설정
                rightButtonCapture: true
            }
        };

        this.game = new Phaser.Game(config);
    }

    preload() {
        this.load.image("redMinion", "assets/Chaos_Minion_Melee_Render.png");
        this.load.image("blueMinion", "assets/blueMinion.png");
        this.load.image("player", "assets/temo.png");
        this.load.image("background", "assets/lol_game_back.jpg");
    }

    create() {
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
        this.blueMini = this.add.sprite(20, 500, "blueMinion");
        this.blueMini.setScale(-0.1, 0.1);
        this.blueMini.setData('health', 100);
        this.blueMini.setData('damage', 10);

        this.blueMiniTween = this.tweens.add({
            targets: this.blueMini,
            x: 1000,
            y: 0,
            duration: 10000, // 이동에 걸리는 시간 (밀리초)
            ease: 'Linear', // 이동에 사용할 easing 함수
        });

        //롤 레드미니언
        this.redMini = this.add.sprite(900, 100, "redMinion");
        this.redMini.setScale(0.1);
        this.redMini.setData('health', 100);
        this.redMini.setData('damage', 10);

        this.redMiniTween = this.tweens.add({
            targets: this.redMini,
            x: 0,
            y: 600,
            duration: 10000, // 이동에 걸리는 시간 (밀리초)
            ease: 'Linear', // 이동에 사용할 easing 함수
        });


        // player를 클래스의 인스턴스 변수로 선언
        this.player = this.add.sprite(200, 500, "player");
        this.player.setScale(0.1);
        this.player.setData('damage',10);

        this.cameras.main.startFollow(this.player);



        // 게임 루프에서 실행되는 업데이트 로직
        this.input.on('pointerdown', (pointer) => {
            // console.log(`마우스 클릭 : ${pointer.leftButtonDown()}`)
            // 마우스 클릭한 좌표를 얻습니다.
            if (pointer.leftButtonDown()){
                const worldPoint = this.cameras.main.getWorldPoint(pointer.x, pointer.y);

                const circle = this.add.circle(worldPoint.x,worldPoint.y, 10, 0xFF0000); // 0xFF0000은 빨간색의 16진수 표현입니다.

                // Tween 애니메이션을 사용하여 1초 동안 투명하게 만듭니다.
                this.tweens.add({
                    targets: circle,
                    alpha: 0,
                    duration: 1000,
                    ease: 'Linear'
                });

                const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, worldPoint.x, worldPoint.y);
                const speed = 200;
                // 플레이어를 클릭한 좌표로 이동시킵니다.
                // 플레이어를 Tween 애니메이션을 사용하여 이동시킵니다.
                this.tweens.add({
                    targets: this.player,
                    x: worldPoint.x,
                    y: worldPoint.y,
                    duration: distance / speed * 1000, // 이동에 걸리는 시간 (밀리초)
                    ease: 'Linear', // 이동에 사용할 easing 함수
                });
            } else{
            }

        });
        this.redAttack = this.add.circle(0,0, 10, 0xFF0000);
        this.redAttack.visible = false;


        this.redAttackTween = this.tweens.add({
            targets: this.redAttack,
            x: this.blueMini.x,
            y: this.blueMini.y,
            duration: 5000,
            ease: 'Linear',
            paused: true, // 처음에는 일시 정지된 상태로 시작
            onStart: () => {
                // Tween이 시작되기 전에 호출되는 콜백
                this.redAttack.x = this.redMini.x;
                this.redAttack.y = this.redMini.y;
                this.redAttack.visible = true;
            },
            onUpdate: () => {
                // Tween이 업데이트될 때마다 호출되는 콜백
                // 현재 this.blueMini의 위치로 업데이트
                this.redAttackTween.updateTo('x', this.blueMini.x);
                this.redAttackTween.updateTo('y', this.blueMini.y);
            },
            onComplete: () => {
                // 애니메이션이 완료되면 실행되는 콜백
                this.redAttack.visible = false; // 애니메이션이 완료되면 숨김
            }
        });
    }

    update() {
        const distanceToMini = Phaser.Math.Distance.Between(this.blueMini.x, this.blueMini.y,this.redMini.x, this.redMini.y);
        this.blueworldPoint = this.cameras.main.getWorldPoint(this.blueMini.x, this.blueMini.y);

        // 거리가 200 이하이면 해당 Tween 애니메이션을 멈춥니다.
        if (distanceToMini <= 200) {
            this.blueMiniTween.stop();
            this.redMiniTween.stop();
            if (!this.redAttackTween.isPlaying()) {// 애니메이션이 이미 실행 중이지 않으면 시작
                this.redAttackTween.seek(0);
                this.redAttackTween.resume(); // Tween을 일시 정지에서 다시 시작
            }
        }
    }

    render() {
        return (
            <div id={'csgames'}>
                {/* Phaser 게임이 렌더링될 영역 */}
                <div id="phaser-container" />
            </div>
        );
    }
}

export default MainScene;
