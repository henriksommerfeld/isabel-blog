import React, { useState } from 'react';
import styled from 'styled-components';
import { spacing } from '../constants';
import CommentsButton from './CommentsButton';
import DisqusComments from './DisqusComments';
import { WindowLocation } from '@reach/router';

export interface CommentsProps {
  postTitle: string;
  location: WindowLocation;
}

export default function Comments(props: CommentsProps) {
  const [showComments, setShowComments] = useState(false);

  if (showComments)
    return (
      <CommentsContainer>
        <DisqusComments {...props} />
      </CommentsContainer>
    );

  return (
    <CommentsContainer>
      <CommentsButton clickedHandler={() => setShowComments(true)} />
    </CommentsContainer>
  );
}

const CommentsContainer = styled('div')`
  margin-top: ${spacing.double};
`;
