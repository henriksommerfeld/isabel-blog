export function matchesRoute(location: any, path: string): boolean {
  if (!location) return false;
  const currentPath = location.pathname;
  if (!currentPath || !path) return false;
  if (currentPath === path) return true;

  const currentPathWithoutTrailingSlash = currentPath.replace(/\/$/, '');
  const pathWithoutTrailingSlash = path.replace(/\/$/, '');

  if (currentPathWithoutTrailingSlash === pathWithoutTrailingSlash) return true;

  if (currentPath.startsWith('/20') && path === '/publicerat') return true;

  return false;
}
