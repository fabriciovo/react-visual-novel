import React, { useEffect } from "react";
import { Game, Scene, Spawner, Text } from "react-phaser-fiber";
import { Group, Image } from "react-phaser-fiber";
import Platform from "./Platform";
import Player from "./Player";
import Star from "./Star";
import Phaser from "phaser";
import { selectPhaser } from "../../Redux/phaserSlice";
import { useSelector } from "react-redux";
import Spike from "./Spike";
import SpikeSpawner from "./SpikeSpawner";
export default function PhaserComponent() {
  const { colision } = useSelector(selectPhaser);

  useEffect(() => {
    console.log(colision);
  }, [colision]);

  return (
    <Game
      width={520}
      height={380}
      pixelArt={true}
      physics={{
        default: "arcade",
        arcade: {
          gravity: {
            y: 300,
          },
          // debug: true,
        },
      }}
      scale={{

        autoCenter: Phaser.Scale.CENTER_BOTH,
      }}
    >
      <Scene
        sceneKey="main"
        onPreload={(scene) => {
          scene.load.image("background", "background_phaser_game.png");
          scene.load.image("ground", "platform.png");
          scene.load.image("star", "star.png");
          scene.load.image("spike", "enemy-phaser.png");
          scene.load.spritesheet("jarvis", "jarvis-phaser.png", {
            frameWidth: 20,
            frameHeight: 16,
          });
        }}
        renderLoading={(progress) => (
          <Text
            x={0}
            y={0}
            text={`Loading... (${progress * 100}%)`}
            style={{ color: "white" }}
          />
        )}
      >
        <Image x={260} y={190} texture="background" />
        <Player x={40} y={300} />
        <Group name="platforms">
          <Platform x={0} y={413} scale={3} physicsType="static" />
        </Group>
        <Group name="stars">
          {colision && (
            <>
              {Array.from({ length: 11 }).map((_, index) => (
                <Star key={index} x={12 + index * 70} y={200} />
              ))}
            </>
          )}
        </Group>

        <Spawner>
          <SpikeSpawner />
        </Spawner>
      </Scene>
    </Game>
  );
}