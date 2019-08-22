import typography from '../typography';

export default `
  @import url('https://fonts.googleapis.com/css?family=Domine|Open+Sans&display=swap');
  ${typography.createStyles()}
  body {
    margin: 30px 15px;
  }
  .video {
    position: relative; left: 0; top: 0;
  }
  .video-background {
    position: relative;
		top: 0;
		left: 0;
  }
  .video-badge {
    position: absolute;
    top: 1rem;
    left: 1rem;
    height: 2rem;
  }
`;
