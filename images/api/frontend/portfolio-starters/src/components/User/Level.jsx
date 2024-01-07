import { OrbitControls, Environment, Sky, Sphere } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Canvas } from "@react-three/fiber";
import Player from "./Player.jsx";
import { Physics, RigidBody, BallCollider } from "@react-three/rapier";
import * as THREE from "three";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const floor1Material = new THREE.MeshStandardMaterial({ color: "limegreen" });

function BlockStart({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      <mesh
        geometry={boxGeometry}
        material={floor1Material}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        receiveShadow
      ></mesh>
    </group>
  );
}

function Block({ position = [0, 0, 0], scale = [4, 0.2, 4] }) {
  return (
    <group position={position}>
      <mesh
        geometry={boxGeometry}
        material={floor1Material}
        position={[0, -0.1, 0]}
        scale={scale}
        receiveShadow
      ></mesh>
    </group>
  );
}

export function BlockEnd({ position = [0, 0, 0] }) {
  const [isAsleep, setIsAsleep] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const navigate = useNavigate();

  const handleWin = () => {
    setIsWin(true);

    setTimeout(1000);

    navigate("/win");
  };

  return (
    <group position={position}>
      <RigidBody
        colliders="hull"
        name="test"
        onSleep={() => setIsAsleep(true)}
        onWake={() => setIsAsleep(false)}
        onCollisionEnter={({ target, other }) => {
          console.log(
            `${target.rigidBodyObject.name} collided with ${other.rigidBodyObject.name}`
          );

          if (
            other.rigidBodyObject &&
            other.rigidBodyObject.name === "Player"
          ) {
            console.log("Player collided with BlockEnd");
            handleWin();
          }
        }}
      >
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={isAsleep ? "white" : "blue"} />
        </mesh>
      </RigidBody>
    </group>
  );
}

export default function Level() {
  return (
    <Canvas
      style={{
        position: "absolute",
        height: "100%",
        width: "100%",
        top: "0px",
        left: "0px",
      }}
    >
      <Perf position="top-left" />
      {/* <color attach="background" args={["#171720"]} /> */}

      <Sky />

      <directionalLight castShadow position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      {/* floor */}
      <Physics debug={false}>
        <RigidBody type="fixed">
          <BlockStart />
          <BlockStart position={[0, 0, -6]} />
          <Block scale={[2, 0.2, 2]} position={[0, 0, -12]} />
          {/* <Block scale={[0.5, 0.2, 4]} position={[0, 0, -14]} />
          <Block scale={[0.5, 1, 0.2]} position={[0, 0.5, -14]} />
          <Block scale={[0.5, 1, 0.2]} position={[0, 0.5, -16]} />

          <Block scale={[0.5, 1, 0.5]} position={[-0.2, 0.5, -17]} />
          <Block scale={[0.5, 1.2, 0.5]} position={[0.2, 0.5, -18]} />
          <Block scale={[0.5, 1.4, 0.5]} position={[-0.2, 0.5, -19]} />

          <BlockStart position={[0, 0, -21]} /> */}
        </RigidBody>

        <BlockEnd position={[0, 10, -6]} />

        <Player />
      </Physics>
    </Canvas>
  );
}
