import React, { ReactElement } from 'react';
import { Link } from 'gatsby';
import PreviewCompatibleImage from './PreviewCompatibleImage';
import {
  MarkdownRemarkEdge,
  MarkdownRemark,
} from '../../auto-generated/graphql';
import { Jsx, FeaturedImageWithTitle } from '../../my-graphql';

export default function BlogRollItem(post: MarkdownRemark): Jsx {
  if (!post || !post.frontmatter) return null;

  const frontmatter = post.frontmatter;
  const title = frontmatter.title || '';
  const featuredImage = frontmatter.featuredimage;
  const slug = (post.fields && post.fields.slug) || '';
  const date = post.frontmatter.date;

  return (
    <div className="is-parent column is-6" key={post.id}>
      <article className={`blog-list-item tile is-child box notification`}>
        <header>
          <FeaturedImage title={title} image={featuredImage} />
          <p className="post-meta">
            <Link className="title has-text-primary is-size-4" to={slug}>
              {title}
            </Link>
            <span> &bull; </span>
            <span className="subtitle is-size-5 is-block">{date}</span>
          </p>
        </header>
        <p>
          {post.excerpt}
          <br />
          <br />
          <Link className="button" to={slug}>
            Keep Reading →
          </Link>
        </p>
      </article>
    </div>
  );
}

function FeaturedImage({ title, image }: FeaturedImageWithTitle): Jsx {
  if (!image) return null;

  const altText = title ? `featured image thumbnail for post ${title}` : '';

  return (
    <div className="featured-thumbnail">
      <PreviewCompatibleImage
        imageInfo={{
          image: image,
          alt: altText,
        }}
      />
    </div>
  );
}
