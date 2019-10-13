import CMS from 'netlify-cms-app';
import AboutPagePreview from './preview-templates/AboutPagePreview';
import BlogPostPreview from './preview-templates/BlogPostPreview';
import IndexPagePreview from './preview-templates/IndexPagePreview';
import PublishedPagePreview from './preview-templates/PublishedPagePreview';
import PressImagesPagePreview from './preview-templates/PressImagesPagePreview';
import EditorYoutube from './editors/editor-youtube';
import EditorVimeo from './editors/editor-vimeo';
import EditorSoundCloud from './editors/editor-soundcloud';
import previewStyles from './previewStyles';
import withStyledComponents from './withStyledComponentsRendered';

const isDevelopment = process.env.NODE_ENV === 'development';

if (isDevelopment) {
  window.CMS_ENV = 'localhost_development';
  const FileSystemBackend = require('netlify-cms-backend-fs');
  CMS.registerBackend('file-system', FileSystemBackend);
}

CMS.registerEditorComponent(EditorYoutube);
CMS.registerEditorComponent(EditorVimeo);
CMS.registerEditorComponent(EditorSoundCloud);
CMS.registerPreviewStyle(previewStyles, { raw: true });
CMS.registerPreviewTemplate('index', withStyledComponents(IndexPagePreview));
CMS.registerPreviewTemplate('about', withStyledComponents(AboutPagePreview));
CMS.registerPreviewTemplate('blog', withStyledComponents(BlogPostPreview));
CMS.registerPreviewTemplate(
  'published',
  withStyledComponents(PublishedPagePreview)
);
CMS.registerPreviewTemplate(
  'pressimages',
  withStyledComponents(PressImagesPagePreview)
);
CMS.registerPreviewTemplate(
  'cookies',
  withStyledComponents(PublishedPagePreview)
);
CMS.registerPreviewTemplate(
  'website',
  withStyledComponents(PublishedPagePreview)
);

CMS.init();
