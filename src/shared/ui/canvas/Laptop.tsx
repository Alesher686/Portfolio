import { Suspense } from "react";

import CanvasLoader from "@/shared/ui/canvasLoader/CanvasLoader.tsx";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { Canvas } from '@react-three/fiber'

const Laptop = () => {
    const laptop = useGLTF('/laptop/scene.gltf');

    return (
        <mesh>
            <ambientLight intensity={1} />
            <directionalLight position={[5, 10, 5]} intensity={1} castShadow />
            <pointLight position={[-5, 5, -5]} intensity={0.5} />
            <group position={[0, -0.5, 0]}>
                <primitive object={laptop.scene} />
            </group>
        </mesh>
    );
};

const LaptopCanvas = () => {
    return (
        <Canvas frameloop={'demand'}
                camera={{ position: [1, 1, 2], fov: 40 }}
                gl={{ preserveDrawingBuffer: false }}
                >
            <Suspense fallback={<CanvasLoader />}>
                <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2} maxAzimuthAngle={Math.PI / 2} />
                <Laptop />
            </Suspense>
            <Preload all />
        </Canvas>
    );
};

export default LaptopCanvas;