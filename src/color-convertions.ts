export function transparentizeHex(hex: string, opacity: number): string {
  const noHashHex = hex.replace('#', '');
  const r = parseInt(noHashHex.substring(0, 2), 16);
  const g = parseInt(noHashHex.substring(2, 4), 16);
  const b = parseInt(noHashHex.substring(4, 6), 16);

  const result = `rgba(${r}, ${g}, ${b}, ${opacity})`;
  return result;
}
