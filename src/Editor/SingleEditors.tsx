import { BubbleMenu, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { MutableRefObject, useState } from 'react';

interface Props {
  selectEditor: (editor: any) => void;
  editorObjects: MutableRefObject<any>;
  sectionId: string;
  startData: any;
}
function reverse(s: string) {
  return s.split('').reverse().join('');
}

const DateContainer = styled.div<{ isFocused: boolean }>`
  background-color: #ffffff;
  border-left: 5px solid red;
  padding: 5px 20px;

  ${props =>
    props.isFocused &&
    css`
      border-left: none;
    `}

  p {
    margin: 0;
    padding: 5px;
    border-top: 0.5px solid #7d7d7d;
    color: #7d7d7d;
  }
`;

/**
 * Single Editor (tab)
 */
const SingleEditors = ({
  selectEditor,
  editorObjects,
  sectionId,
  startData,
}: Props) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [lastEdited, setLastEdited] = useState<string>('');

  const editor = useEditor({
    extensions: [StarterKit], //don't know what this line does
    content: startData, //Data to load to editor (html data)

    /**
     * Runs when user exits the editor*
     * Set the last updated date
     * and change isFocused state. This state is used to add right border to "not-focused" editors
     */
    onBlur({ editor }) {
      console.log('On Blur', editor.getJSON());
      setIsFocused(false);
      setLastEdited(new Date().toLocaleString());
    },

    /**
     * Runs when user selects the editor
     */
    onFocus() {
      setIsFocused(true);
    },

    /**
     * Runs when the editor is first created
     * Add the editorObject to the editorObject ref (in MyEditor.tsx)
     */
    onCreate({ editor }) {
      console.log('Editor Created');
      if (sectionId in editorObjects.current)
        editorObjects.current[sectionId].push(editor);
      else editorObjects.current[sectionId] = [editor];
    },
  });

  return (
    <div>
      <EditorContent
        editor={editor}
        onClick={() => {
          selectEditor(editor);
        }}
      />
      {editor && (
        <div>
          <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
            <button
              onClick={() => {
                console.log('Add as task');
              }}
              className={editor.isActive('CreateTask') ? 'is-active' : ''}>
              Create Task
            </button>
          </BubbleMenu>
        </div>
      )}
      {lastEdited !== '' && (
        <DateContainer isFocused={isFocused}>
          <p>{lastEdited}</p>
        </DateContainer>
      )}
    </div>
  );
};

export default SingleEditors;
