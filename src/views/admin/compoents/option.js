const editorEvents = [
  'load',
  'change',
  'caretChange',
  'focus',
  'blur',
  'keydown',
  'keyup',
  'beforePreviewRender',
  'beforeConvertWysiwygToMarkdown',
];
const defaultValueMap = {
  initialEditType: 'markdown',
  initialValue: '',
  height: '600px',
  previewStyle: 'vertical',
};

export default function useOptions(props, emit) {

  const eventOptions = {};

  editorEvents.forEach((event) => {
    eventOptions[event] = (...args) => {
      emit(event, ...args);
    };
  });

  const options = {
    ...props.options,
    initialEditType: props.initialEditType,
    initialValue: props.initialValue,
    height: props.height,
    previewStyle: props.previewStyle,
    events: eventOptions,
  };

  Object.keys(defaultValueMap).forEach((key) => {
    if (!options[key]) {
      options[key] = defaultValueMap[key];
    }
  });
  return { options }
};
