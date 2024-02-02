import React, {useState, useEffect, useRef} from 'react';
import Phaser from 'phaser';
import '../scss/CSGame.scss';
import CSGame from "./CSGame";
import StartScene from "./StartScene";
import CSRank from "./CSRank";


const MainScene = ()=> {
    const game = useRef(null);


    useEffect(() => {
        const config = {
            type: Phaser.AUTO,
            parent: 'phaser-container',
            width:1000,
            height: 600,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y:0 },
                    debug: false
                },
            },
            scene: [StartScene,CSGame,CSRank],
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
