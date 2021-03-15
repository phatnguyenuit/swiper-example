export const classnames = (...args: any[]) => {
  const classes = args.map((arg) => {
    if (typeof arg === 'string') return arg;
    if (Array.isArray(arg)) return arg.flat();
    if (typeof arg === 'object') {
      return Object.entries(arg).map(([key, value]) => {
        if (value) return key;
        return '';
      });
    }
    return '';
  });
  return classes.flat().filter(Boolean).join(' ');
};
