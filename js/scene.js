/* ================================================================
   SCENE.JS — Three.js Gold Gem Scene
   Floating 3D gold geometric shapes for hero background
   ================================================================ */

(function () {
  'use strict';

  const canvas = document.getElementById('hero-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const W = () => canvas.parentElement.clientWidth;
  const H = () => canvas.parentElement.clientHeight;

  /* ── SCENE / CAMERA / RENDERER ── */
  const scene    = new THREE.Scene();
  const camera   = new THREE.PerspectiveCamera(58, W() / H(), 0.1, 120);
  camera.position.set(0, 0, 6);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(W(), H());
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;

  /* ── LIGHTS ── */
  scene.add(new THREE.AmbientLight(0xffffff, 0.25));

  const pl1 = new THREE.PointLight(0xC9A84C, 4, 18);
  pl1.position.set(4, 4, 4);
  scene.add(pl1);

  const pl2 = new THREE.PointLight(0xF5D78E, 2.5, 14);
  pl2.position.set(-4, -2, 3);
  scene.add(pl2);

  const pl3 = new THREE.PointLight(0x8B6914, 1.5, 10);
  pl3.position.set(0, -4, 2);
  scene.add(pl3);

  /* ── MATERIAL ── */
  const goldMat = (roughness = 0.18, opacity = 1) => new THREE.MeshStandardMaterial({
    color: 0xC9A84C,
    metalness: 0.95,
    roughness,
    transparent: opacity < 1,
    opacity,
  });

  /* ── GEMS ── */
  const gems = [];

  const configs = [
    { geo: new THREE.OctahedronGeometry(0.35, 0),   pos: [-2.8,  1.4, -1.5], speed: [.005, .007, .003], opacity: 0.75, r: 0.14 },
    { geo: new THREE.OctahedronGeometry(0.22, 0),   pos: [ 2.6,  1.9, -2.5], speed: [.007, .004, .006], opacity: 0.60, r: 0.18 },
    { geo: new THREE.IcosahedronGeometry(0.26, 0),  pos: [-1.5, -1.8, -1.2], speed: [.004, .008, .005], opacity: 0.55, r: 0.12 },
    { geo: new THREE.TetrahedronGeometry(0.32, 0),  pos: [ 3.2, -0.6, -3.2], speed: [.006, .003, .008], opacity: 0.45, r: 0.20 },
    { geo: new THREE.OctahedronGeometry(0.16, 0),   pos: [-3.5,  0.3, -2.0], speed: [.008, .006, .004], opacity: 0.50, r: 0.10 },
    { geo: new THREE.OctahedronGeometry(0.28, 0),   pos: [ 1.8, -2.0, -1.4], speed: [.003, .005, .007], opacity: 0.65, r: 0.16 },
    { geo: new THREE.IcosahedronGeometry(0.19, 0),  pos: [-0.8,  2.5, -2.8], speed: [.006, .007, .003], opacity: 0.40, r: 0.14 },
    { geo: new THREE.TetrahedronGeometry(0.22, 0),  pos: [ 3.0,  0.8, -1.8], speed: [.005, .004, .006], opacity: 0.55, r: 0.18 },
    { geo: new THREE.OctahedronGeometry(0.12, 0),   pos: [-2.2,  2.2, -3.5], speed: [.007, .005, .004], opacity: 0.35, r: 0.08 },
    { geo: new THREE.IcosahedronGeometry(0.30, 0),  pos: [ 0.6, -2.8, -2.2], speed: [.004, .006, .008], opacity: 0.50, r: 0.16 },
  ];

  configs.forEach(c => {
    const mesh = new THREE.Mesh(c.geo, goldMat(0.15 + Math.random() * 0.1, c.opacity));
    mesh.position.set(...c.pos);
    mesh.rotation.set(
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2
    );
    scene.add(mesh);
    gems.push({
      mesh,
      rx: c.speed[0] * (Math.random() < .5 ? 1 : -1),
      ry: c.speed[1] * (Math.random() < .5 ? 1 : -1),
      rz: c.speed[2] * (Math.random() < .5 ? 1 : -1),
      floatAmp:   c.r,
      floatSpeed: 0.25 + Math.random() * 0.35,
      baseY: c.pos[1],
    });
  });

  /* ── EDGE WIREFRAMES (subtle overlay gems) ── */
  const wMat = new THREE.LineBasicMaterial({ color: 0xC9A84C, transparent: true, opacity: 0.12 });
  [[-1.2, 3.0, -4], [2.5, -3.5, -5], [-3.8, -2.5, -4]].forEach(pos => {
    const g = new THREE.EdgesGeometry(new THREE.OctahedronGeometry(0.55, 0));
    const l = new THREE.LineSegments(g, wMat);
    l.position.set(...pos);
    scene.add(l);
    gems.push({ mesh: l, rx: .002, ry: .003, rz: .001, floatAmp: .06, floatSpeed: .18, baseY: pos[1] });
  });

  /* ── MOUSE PARALLAX ── */
  let mouse  = { x: 0, y: 0 };
  let target = { x: 0, y: 0 };

  window.addEventListener('mousemove', e => {
    target.x = (e.clientX / window.innerWidth  - 0.5) * 0.6;
    target.y = (e.clientY / window.innerHeight - 0.5) * 0.4;
  }, { passive: true });

  /* ── CLOCK ── */
  const clock = new THREE.Clock();

  /* ── ANIMATE ── */
  function tick() {
    requestAnimationFrame(tick);
    const t = clock.getElapsedTime();

    mouse.x += (target.x - mouse.x) * 0.025;
    mouse.y += (target.y - mouse.y) * 0.025;

    gems.forEach(g => {
      g.mesh.rotation.x += g.rx;
      g.mesh.rotation.y += g.ry;
      g.mesh.rotation.z += g.rz;
      g.mesh.position.y = g.baseY + Math.sin(t * g.floatSpeed) * g.floatAmp;
    });

    camera.position.x += (mouse.x   - camera.position.x) * 0.04;
    camera.position.y += (-mouse.y  - camera.position.y) * 0.04;

    renderer.render(scene, camera);
  }
  tick();

  /* ── RESIZE ── */
  window.addEventListener('resize', () => {
    camera.aspect = W() / H();
    camera.updateProjectionMatrix();
    renderer.setSize(W(), H());
  });

})();
