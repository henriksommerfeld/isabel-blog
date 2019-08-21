import typography from '../typography';

export default `
  @import url('https://fonts.googleapis.com/css?family=Domine|Open+Sans&display=swap');
  ${typography.createStyles()}
  body {
    margin-top: 20px;
  }
`;
