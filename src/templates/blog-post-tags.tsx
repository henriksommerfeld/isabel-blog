import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { spacing } from '../constants';
import tagSvg from '../../static/img/tag-grey500.svg';
import { getTagRouteUrl } from '../tags-parser';

interface BlogPostTags {
  tags: string[];
}

export default function BlogPostTags({ tags = [] }: BlogPostTags) {
  const numberOfTags = tags.length;
  if (numberOfTags < 1) return null;

  return (
    <LinksContainer>
      <LinkIconSvg src={tagSvg} alt="" />

      {tags.map((tag, index) => (
        <>
          <Link key={tag + `tag`} to={getTagRouteUrl(tag)}>
            {tag}
          </Link>
          {GetCommaSeparator(index, numberOfTags)}
        </>
      ))}
    </LinksContainer>
  );
}

function GetCommaSeparator(index: number, numberOfTags: number) {
  if (numberOfTags <= index + 1) return null;

  return <CommaWithSpace>,</CommaWithSpace>;
}

const CommaWithSpace = styled('span')`
  padding-right: 0.4em;
`;

const LinkIconSvg = styled('img')`
  margin: 0 0.5em 0 0;
  min-width: 1rem;
`;

const LinksContainer = styled('li')`
  display: flex;
  align-items: center;
  margin-top: ${spacing.paddingDouble};
`;
