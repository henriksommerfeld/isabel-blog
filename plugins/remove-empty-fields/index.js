// https://stackoverflow.com/questions/54292012/handle-empty-strings-as-image-paths-when-using-gatsby-transformer-sharp
// https://www.gatsbyjs.org/docs/files-gatsby-looks-for-in-a-plugin/

let fieldsToRemove = [];

const deleteFieldsRecursive = node => {
  fieldsToRemove.forEach(fieldToRemove => {
    if (node[fieldToRemove] === '') {
      delete node[fieldToRemove];
    }
  });

  if (typeof node === 'object') {
    Object.values(node).forEach(subNode => {
      deleteFieldsRecursive(subNode);
    });
  }
};

exports.onCreateNode = ({ node }, configOptions) => {
  fieldsToRemove = configOptions.fieldsToRemove;
  console.log('TCL: exports.onCreateNode -> fieldsToRemove', fieldsToRemove);

  if (node.internal.type === 'MarkdownRemark') {
    if (!node.frontmatter) {
      return;
    }

    deleteFieldsRecursive(node);
  }
};
