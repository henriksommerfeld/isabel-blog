import React, { useState, useEffect } from 'react';
import { StyleSheetManager } from 'styled-components';

function StyleInjector({ children }) {
  const [iframeRef, setIframeRef] = useState(null);

  useEffect(() => {
    const iframes = document.getElementsByTagName('iframe');
    const previewIframe = Array.from(iframes).find(x => {
      return x.className.includes('PreviewPaneFrame');      
    });
    const iframeHeadElem = previewIframe.contentDocument.head;
    setIframeRef(iframeHeadElem);
  }, []);

  return (
    iframeRef && (
      <StyleSheetManager target={iframeRef}>{children}</StyleSheetManager>
    )
  );
}

export default function withStyledComponents(Comp) {
  return props => (
    <StyleInjector>
      <Comp {...props} />
    </StyleInjector>
  );
}