import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import "./ThreePage.css";

// Spinning Earth with Texture
const SpinningEarth = ({ position, textureUrl }) => {
  const mesh = useRef();

  useFrame(() => {
    mesh.current.rotation.y += 0.005;
  });

  return (
    <mesh ref={mesh} position={position}>
      <sphereGeometry args={[3, 32, 32]} />
      <meshStandardMaterial map={textureUrl} />
    </mesh>
  );
};

// Orbiting Moon with Orbiting Effect
const OrbitingMoon = ({ earthPosition, textureUrl }) => {
  const mesh = useRef();
  const radius = 9;
  const speed = 0.002;

  useFrame(() => {
    const time = performance.now();
    const x = earthPosition[0] + radius * Math.cos(time * speed);
    const z = earthPosition[2] + radius * Math.sin(time * speed);
    mesh.current.position.set(x, 0, z);
    mesh.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial map={textureUrl} />
    </mesh>
  );
};

// Mars Component
const Mars = ({ position, textureUrl }) => {
  const mesh = useRef();

  useFrame(() => {
    mesh.current.rotation.y += 0.003;
  });

  return (
    <mesh ref={mesh} position={position}>
      <sphereGeometry args={[2.5, 32, 32]} />
      <meshStandardMaterial map={textureUrl} />
    </mesh>
  );
};

// Jupiter Component
const Jupiter = ({ position, textureUrl }) => {
  const mesh = useRef();

  useFrame(() => {
    mesh.current.rotation.y += 0.001;
  });

  return (
    <mesh ref={mesh} position={position}>
      <sphereGeometry args={[15, 32, 32]} />
      <meshStandardMaterial map={textureUrl} />
    </mesh>
  );
};

// Saturn Component with Rings
const Saturn = ({ position, planetTextureUrl, ringTextureUrl }) => {
  const planetMesh = useRef();
  const ringMesh = useRef();

  useFrame(() => {
    planetMesh.current.rotation.y += 0.002;
    ringMesh.current.rotation.z += 0.001;
  });

  return (
    <>
      <mesh ref={planetMesh} position={position}>
        <sphereGeometry args={[10, 32, 32]} />
        <meshStandardMaterial map={planetTextureUrl} />
      </mesh>
      <mesh ref={ringMesh} position={position}>
        <ringGeometry args={[12, 18, 64]} />
        <meshStandardMaterial
          map={ringTextureUrl}
          side={THREE.DoubleSide}
          transparent={true}
        />
      </mesh>
    </>
  );
};

// Uranus Component
const Uranus = ({ position, textureUrl }) => {
  const mesh = useRef();

  useFrame(() => {
    mesh.current.rotation.y += 0.002;
    mesh.current.rotation.x += 0.001; // Slight tilt for Uranus
  });

  return (
    <mesh ref={mesh} position={position}>
      <sphereGeometry args={[7, 32, 32]} />
      <meshStandardMaterial map={textureUrl} />
    </mesh>
  );
};

// Neptune Component
const Neptune = ({ position, textureUrl }) => {
  const mesh = useRef();

  useFrame(() => {
    mesh.current.rotation.y += 0.002;
  });

  return (
    <mesh ref={mesh} position={position}>
      <sphereGeometry args={[6, 32, 32]} />
      <meshStandardMaterial map={textureUrl} />
    </mesh>
  );
};

// Venus Component
const Venus = ({ position, textureUrl }) => {
  const mesh = useRef();

  useFrame(() => {
    mesh.current.rotation.y += 0.002;
  });

  return (
    <mesh ref={mesh} position={position}>
      <sphereGeometry args={[2.2, 32, 32]} />
      <meshStandardMaterial map={textureUrl} />
    </mesh>
  );
};

// Mercury Component
const Mercury = ({ position, textureUrl }) => {
  const mesh = useRef();

  useFrame(() => {
    mesh.current.rotation.y += 0.004;
  });

  return (
    <mesh ref={mesh} position={position}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshStandardMaterial map={textureUrl} />
    </mesh>
  );
};


// Main Animation Component
const AnimatedBackground = () => {
  const earthTexture = new THREE.TextureLoader().load("/asset3D/earth_texture_2.jpg");
  const moonTexture = new THREE.TextureLoader().load("/asset3D/moon_texture_best.jpg");
  const marsTexture = new THREE.TextureLoader().load("/asset3D/texture_mars_2.jpg");
  const jupiterTexture = new THREE.TextureLoader().load("/asset3D/texture_jupiter.jpg");
  const saturnTexture = new THREE.TextureLoader().load("/asset3D/texture_saturn.jpg");
  const saturnRingTexture = new THREE.TextureLoader().load("/asset3D/texture_saturn_ring.png");
  const uranusTexture = new THREE.TextureLoader().load("/asset3D/texture_uranus_2.jpg");
  const neptuneTexture = new THREE.TextureLoader().load("/asset3D/texture_neptune.jpg");
  const venusTexture = new THREE.TextureLoader().load("/asset3D/texture_venus.jpg");
  const mercuryTexture = new THREE.TextureLoader().load("/asset3D/texture_mercury.jpg");


  const textures = [
    earthTexture,
    moonTexture,
    marsTexture,
    jupiterTexture,
    saturnTexture,
    saturnRingTexture,
    uranusTexture,
    neptuneTexture,
    venusTexture,
    mercuryTexture,
  ];

  textures.forEach((texture) => {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.minFilter = THREE.LinearFilter;
  });

  return (
    <Canvas shadows>
      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[0, 10, 5]} intensity={1.5} color="lightyellow" castShadow />
      <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={0.8} castShadow />
      <pointLight position={[-10, -10, -10]} color="lightblue" />

      {/* Starry background */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0.5} fade />

      {/* 3D Objects */}
      <SpinningEarth position={[0, 0, 0]} textureUrl={earthTexture} />
      <OrbitingMoon earthPosition={[0, 0, 0]} textureUrl={moonTexture} />
      <Venus position={[-20, 0, 10]} textureUrl={venusTexture} />
      <Mercury position={[-10, 0, 15]} textureUrl={mercuryTexture} />
      <Mars position={[30, 0, -20]} textureUrl={marsTexture} />
      <Jupiter position={[-50, 0, 40]} textureUrl={jupiterTexture} />
      <Saturn position={[80, 0, -50]} planetTextureUrl={saturnTexture} ringTextureUrl={saturnRingTexture} />
      <Uranus position={[-90, 0, 60]} textureUrl={uranusTexture} />
      <Neptune position={[100, 0, -80]} textureUrl={neptuneTexture} />

      {/* Interactive Camera */}
      <OrbitControls enableZoom={true} />
    </Canvas>
  );
};

// Page Component
const ThreePage = () => {
  return (
    <div className="threejs-page">
      <AnimatedBackground />
    </div>
  );
};

export default ThreePage;
