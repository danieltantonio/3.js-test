import * as THREE from 'three';
import * as dat from 'dat.gui';

import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

const gui = new dat.GUI();

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.x = 0;
camera.position.z = 1.3;

const guiCamera = gui.addFolder('camera');

guiCamera.add(camera.position, 'x');

scene.add(camera);

let text;
let screenWidth = window.innerWidth;
let screenHeight = window.innerHeight;

if(screenWidth <= 280) {
    camera.position.z = 3.75;
} else if(screenWidth < 360 && screenWidth > 280) {
    camera.position.z = 3;
} else if (screenWidth > 360 && screenWidth < 768) {
    camera.position.z = 3.5;
} else if (screenWidth >= 768 && screenWidth < 1024) {
    camera.position.z = 2.3;
} else if (screenWidth >= 1024) {
    camera.position.z = 1.3;
}

const loader = new FontLoader();
loader.load('./UnifrakturMaguntia_Book.json', font => {
    const textGeo = new TextGeometry("DanielAnton.io", {
        font,
        size: 0.15,
        height: 0.05
    });

    textGeo.center();

    text = new THREE.Mesh(textGeo, new THREE.MeshPhongMaterial( { color: 0xffffff } ));

    text.position.x = 0;
    text.position.y = 0;
    text.position.z = 0;

    const guiText = gui.addFolder('text');

    guiText.add(text.rotation, 'y').min(0).max(3).step(0.01);

    scene.add(text);
});

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

document.body.appendChild(renderer.domElement);

scene.add(new THREE.AmbientLight(0xffffff, 0.5));

window.addEventListener('resize', () => {
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;

    renderer.setSize(screenWidth, screenHeight);
});

const animate = () => {
    requestAnimationFrame(animate);
    text.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();