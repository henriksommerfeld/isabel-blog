import CMS from 'netlify-cms-app';
import AboutPagePreview from './preview-templates/AboutPagePreview';
import BlogPostPreview from './preview-templates/BlogPostPreview';
import IndexPagePreview from './preview-templates/IndexPagePreview';
import EditorYoutube from './editors/editor-youtube';
import EditorVimeo from './editors/editor-vimeo';
import previewStyles from './previewStyles';

const isDevelopment = process.env.NODE_ENV === 'development';

if (isDevelopment) {
  window.CMS_ENV = 'localhost_development';
  const FileSystemBackend = require('netlify-cms-backend-fs');
  CMS.registerBackend('file-system', FileSystemBackend);
}

CMS.registerEditorComponent(EditorYoutube);
CMS.registerEditorComponent(EditorVimeo);
CMS.registerPreviewStyle(previewStyles, { raw: true });
CMS.registerPreviewTemplate('index', IndexPagePreview);
CMS.registerPreviewTemplate('about', AboutPagePreview);
CMS.registerPreviewTemplate('blog', BlogPostPreview);

CMS.init();
