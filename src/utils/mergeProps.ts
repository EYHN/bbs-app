import classnames from 'classnames';

export default function mergeProps<A extends {}, B extends {}>(a: A , b: B):
    A & B & { className: string; style: any } {
  a = a || {} as any;
  b = b || {} as any;
  return {
    ...a as any,
    ...b as any,
    className: classnames((a as any).className, (b as any).className),
    style: {
      ...(a as any).style,
      ...(b as any).style
    }
  };
}
