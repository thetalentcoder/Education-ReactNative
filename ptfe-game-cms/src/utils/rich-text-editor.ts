export const toolbarOptions = {
  options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'link'],
  inline: {
    inDropdown: false,
    options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace']
  },
  blockType: {
    inDropdown: true,
    options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code']
  },
  fontSize: {
    options: [10, 12, 14, 16, 18, 20, 24, 30]
  },
  fontFamily: {
    options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana']
  },
  list: {
    inDropdown: false,
    options: ['unordered', 'ordered', 'indent', 'outdent']
  },
  textAlign: {
    inDropdown: false,
    options: ['left', 'center', 'right', 'justify']
  },
  link: {
    inDropdown: false,
    showOpenOptionOnHover: true,
    defaultTargetOption: '_blank',
    options: ['link', 'unlink']
  }
};
