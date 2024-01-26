import React, {useEffect, useRef} from 'react';
import CSGame from "./CSGame";
import Phaser from 'phaser';

const PhaserConfig = () => {
    const game = useRef(null);
    const phaserConfig = {

        // 맵 크기
        width: 800,
        height: 600,
        backgroundColor: 0x000000,
        pixelArt: true, // pixelArt를 사용할 시 true로 해야 이미지가 선명하게 나옴
        physics: {
            default: "arcade", // arcade라는 물리 엔진을 사용할 것임
            arcade: {
                debug: process.env.DEBUG === "true",
            },
        },

        // eslint-disable-next-line no-undef
        type : Phaser.AUTO,

        //배경 투명
        transparent : true,
        scene: {
            preload,
            create,
            update
        }
    };

    // 씬을 만들기 전에 실행
    function preload() {
    }

    // 씬을 생성하기 위해 실행
    function create() {
    }

    // 씬을 갱신하기 위해 실행
    function update() {
    }
    useEffect(() => {
        // game 레퍼런스에 phaserConfig 로 씬을 생성
        // 씬은 game 레퍼런스에 HTMLcanvas를 그리는 식으로 생성된다.
        game.current = new Phaser.Game(phaserConfig);
        // 주의!! 단 한 번만 실행될 수 있도록 신경써야 한다.
        // 두 번 실행되면 가차없이 두 개의 게임 화면이 생긴다.
        // 여기서는 useEffect 의 dependency array에 []를 넣어서 한 번만 실행되도록 했다.
    }, []);

    return (
        <CSGame ref={game} id="gamediv" />
    );
};

export default PhaserConfig;