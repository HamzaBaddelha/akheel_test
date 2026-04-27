import * as THREE from "three";

export type SceneView = {
  bottom: number;
  height: number;
  camera: THREE.PerspectiveCamera;
};

export type SceneOptions = {
  maxPixelRatio: number;
  antialias: boolean;
  dualView: boolean;
};

export class AirplaneScene {
  private host: HTMLDivElement;
  private readonly handleResize = () => this.onResize();
  readonly views: SceneView[];
  readonly renderer: THREE.WebGLRenderer;
  readonly scene: THREE.Scene;
  readonly light: THREE.PointLight;
  readonly modelGroup: THREE.Group;
  private readonly lookTarget = new THREE.Vector3(0, 5, 0);
  private readonly maxPixelRatio: number;
  private w = 0;
  private h = 0;
  private rafId: number | null = null;
  private isVisible = true;
  private isActive = true;

  constructor(host: HTMLDivElement, model: THREE.Group, options: SceneOptions) {
    this.host = host;
    this.maxPixelRatio = options.maxPixelRatio;
    this.views = options.dualView
      ? [
          {
            bottom: 0,
            height: 1,
            camera: new THREE.PerspectiveCamera(45, 1, 1, 2000),
          },
          {
            bottom: 0,
            height: 0,
            camera: new THREE.PerspectiveCamera(45, 1, 1, 2000),
          },
        ]
      : [
          {
            bottom: 0,
            height: 1,
            camera: new THREE.PerspectiveCamera(45, 1, 1, 2000),
          },
        ];

    this.renderer = new THREE.WebGLRenderer({
      antialias: options.antialias,
      alpha: true,
      powerPreference: "high-performance",
      precision: "mediump",
    });
    this.renderer.shadowMap.enabled = false;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, this.maxPixelRatio));
    this.renderer.setClearAlpha(0);

    this.host.replaceChildren(this.renderer.domElement);

    this.scene = new THREE.Scene();

    this.views.forEach((view, index) => {
      view.camera.position.fromArray([0, 0, 180]);
      view.camera.layers.disableAll();
      view.camera.layers.enable(options.dualView ? index : 0);
      view.camera.lookAt(this.lookTarget);
    });

    this.light = new THREE.PointLight(0xffffff, 0.6);
    this.light.position.set(70, -20, 150);
    this.scene.add(this.light);
    this.scene.add(new THREE.AmbientLight(0xffffff, 1.15));

    const firstMesh = model.children.find(
      (child: THREE.Object3D): child is THREE.Mesh => child instanceof THREE.Mesh
    );

    const line =
      options.dualView && firstMesh
        ? new THREE.LineSegments(
            new THREE.EdgesGeometry(firstMesh.geometry),
            new THREE.LineBasicMaterial({
              color: 0xffffff,
              transparent: true,
              opacity: 0.45,
              depthTest: false,
            })
          )
        : null;

    if (line) {
      line.position.set(0.5, 0.2, -1);
      line.layers.set(1);
    }

    model.layers.set(0);
    this.modelGroup = new THREE.Group();
    this.modelGroup.add(model);
    if (line) this.modelGroup.add(line);
    this.scene.add(this.modelGroup);

    window.addEventListener("resize", this.handleResize);
    this.onResize();
  }

  render = () => {
    if (!this.isActive || !this.isVisible || this.w <= 0 || this.h <= 0) return;

    if (this.views.length === 1) {
      const view = this.views[0];
      this.renderer.setScissorTest(false);
      this.renderer.setViewport(0, 0, this.w, this.h);
      view.camera.aspect = this.w / this.h;
      this.renderer.render(this.scene, view.camera);
      return;
    }

    this.renderer.setScissorTest(true);
    for (const view of this.views) {
      const bottom = Math.floor(this.h * view.bottom);
      const height = Math.floor(this.h * view.height);
      this.renderer.setViewport(0, 0, this.w, this.h);
      this.renderer.setScissor(0, bottom, this.w, height);
      view.camera.aspect = this.w / this.h;
      this.renderer.render(this.scene, view.camera);
    }
  };

  requestRender = () => {
    if (this.rafId !== null || !this.isActive || !this.isVisible) return;
    this.rafId = window.requestAnimationFrame(() => {
      this.rafId = null;
      this.render();
    });
  };

  setVisible(visible: boolean) {
    this.isVisible = visible;
    if (visible) this.requestRender();
  }

  setActive(active: boolean) {
    this.isActive = active;
    if (active) this.requestRender();
  }

  private onResize() {
    this.w = this.host.clientWidth || window.innerWidth;
    this.h = this.host.clientHeight || window.innerHeight;

    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, this.maxPixelRatio));

    this.views.forEach((view) => {
      view.camera.aspect = this.w / this.h;
      const camZ = (window.screen.width - this.w) / 3;
      view.camera.position.z = camZ < 180 ? 180 : camZ;
      view.camera.updateProjectionMatrix();
    });

    this.renderer.setSize(this.w, this.h, false);
    this.requestRender();
  }

  dispose() {
    window.removeEventListener("resize", this.handleResize);
    if (this.rafId !== null) {
      window.cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }

    this.scene.traverse((node: THREE.Object3D) => {
      const maybeDisposable = node as THREE.Object3D & {
        geometry?: THREE.BufferGeometry;
        material?: THREE.Material | THREE.Material[];
      };

      maybeDisposable.geometry?.dispose();
      if (Array.isArray(maybeDisposable.material)) {
        maybeDisposable.material.forEach((material: THREE.Material) => material.dispose());
      } else {
        maybeDisposable.material?.dispose();
      }
    });

    this.renderer.dispose();
    this.renderer.forceContextLoss();
    this.host.replaceChildren();
  }
}
