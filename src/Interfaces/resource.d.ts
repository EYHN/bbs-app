interface IResource {
  type: string;
  src: string;
  size: number;
}

interface IImageResource {
  type: 'image';
  src: string;
  size: number;
  width: number;
  height: number;
  thumb?: string;
  dominantColor?: string;
}
