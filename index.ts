export default class SimpleWhiteBoard {
  private ctx: CanvasRenderingContext2D;
  private drawing = false;

  constructor(private canvas: HTMLCanvasElement) {
    this.ctx = this.canvas.getContext('2d')!;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';

    this.canvas.style.backgroundColor = 'white';
    this.canvas.addEventListener('mousemove', this.draw);
    this.canvas.addEventListener('mousedown', this.startDraw);
    this.canvas.addEventListener('mouseup', this.endDraw);

    // for mobile
    this.canvas.addEventListener('touchmove', this.drawTouch);
  }

  dispose = () => {
    this.canvas.removeEventListener('mousemove', this.draw);
    this.canvas.removeEventListener('mousedown', this.startDraw);
    this.canvas.removeEventListener('mouseup', this.endDraw);

    this.canvas.removeEventListener('touchmove', this.drawTouch);
  }

  private startDraw = (event: MouseEvent) => {
    if (event.buttons !== 1) return;

    this.ctx.beginPath();
    this.ctx.moveTo(
      event.offsetX,
      event.offsetY
    );

    this.drawing = true;
  }

  private draw = (event: MouseEvent) => {
    if (!this.drawing) return;

    this.ctx.lineTo(event.offsetX, event.offsetY);
    this.ctx.stroke();
  }

  private drawTouch = (event: TouchEvent) => {
    if (event.touches.length === 1) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (event.touches.length > 1) {
      this.drawing = false;
    }
  }

  private endDraw = () => {
    this.ctx.closePath();
    this.drawing = false;
  }

  erase = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  setLineColor = (color: string) => {
    this.ctx.strokeStyle = color;
  }

  setLineAlpha = (alpha: number) => {
    this.ctx.globalAlpha = alpha;
  }

  setLineWidth = (lineWidth: number) => {
    this.ctx.lineWidth = lineWidth;
  }
}
