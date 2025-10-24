export class LiquidSimulation {
  private ctx: CanvasRenderingContext2D;
  private width!: number;
  private height!: number;
  private time = 0;

  constructor(private canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas context não encontrado');
    this.ctx = ctx;

    this.resize();
    window.addEventListener('resize', () => this.resize());
    requestAnimationFrame(() => this.animate());
  }

  private resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  private noise(angle: number, t: number): number {
    const base = Math.sin(angle * 2.4 + t * 0.5) * 18;
    const layer = Math.cos(angle * 3.7 - t * 1.1) * 14;
    const fine = Math.sin(angle * 6.1 + t * 0.8) * 6;
    return (base + layer + fine) * 0.8;
  }

  private drawBlob(x: number, y: number, r: number, t: number) {
    const ctx = this.ctx;
    ctx.beginPath();

    const points: { x: number; y: number }[] = [];
    const step = 0.1;

    for (let i = 0; i < Math.PI * 2; i += step) {
      const offset = this.noise(i, t);
      const nx = x + Math.cos(i) * (r + offset);
      const ny = y + Math.sin(i) * (r + offset * 0.9);
      points.push({ x: nx, y: ny });
    }

    // curva contínua (Catmull–Rom)
    for (let i = 0; i < points.length; i++) {
      const p0 = points[(i - 1 + points.length) % points.length];
      const p1 = points[i];
      const p2 = points[(i + 1) % points.length];
      const p3 = points[(i + 2) % points.length];

      const xc1 = (p0.x + p1.x) / 2;
      const yc1 = (p0.y + p1.y) / 2;
      const xc2 = (p1.x + p2.x) / 2;
      const yc2 = (p1.y + p2.y) / 2;

      if (i === 0) ctx.moveTo(xc1, yc1);
      ctx.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, xc2, yc2);
    }

    ctx.closePath();

    const gradient = ctx.createRadialGradient(x, y, r * 0.25, x, y, r * 1.25);
    gradient.addColorStop(0, 'rgba(96, 165, 250, 1)');
    gradient.addColorStop(0.45, 'rgba(59, 130, 246, 0.9)');
    gradient.addColorStop(1, 'rgba(59, 130, 246, 0.55)');

    ctx.fillStyle = gradient;
    ctx.shadowBlur = 30;
    ctx.shadowColor = 'rgba(59, 130, 246, 0.35)';
    ctx.fill();
  }

  private animate() {
    this.time += 0.012;
    const ctx = this.ctx;

    const bg = ctx.createLinearGradient(0, 0, 0, this.height);
    bg.addColorStop(0, '#E0F2FE'); // azul bem claro no topo (#E0F2FE)
    bg.addColorStop(1, '#BFDBFE'); // tom mais frio embaixo (#BFDBFE)
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, this.width, this.height);

    // blur leve e contraste suave
    ctx.filter = 'blur(2.5px) brightness(1.15) contrast(125%) opacity(0.8)';

    const x = this.width / 2;
    const y = this.height / 2;
    const r = 320;

    const organicTime =
      this.time * 0.7 + Math.sin(this.time * 0.25) * 0.4 + Math.cos(this.time * 0.17) * 0.6;

    this.drawBlob(x, y, r, organicTime);

    ctx.filter = 'none';
    requestAnimationFrame(() => this.animate());
  }
}
