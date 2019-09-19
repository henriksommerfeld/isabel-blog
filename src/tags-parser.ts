import { kebabCase } from 'lodash';
import { tagsUrl } from './constants';

export function getUniqueTags(tags: string[] | undefined): string[] {
  if (!tags || !tags.length) return [];
  if (typeof tags === 'string') return [tags];

  const nonEmptyTags = tags.filter(x => x);
  const distinctTags = [...new Set(nonEmptyTags)];

  return distinctTags;
}

export function getTagRouteUrl(tag: string): string {
  return `${tagsUrl}/${kebabCase(tag)}`;
}
