import ToolBar from './ToolBar';
import SingleEditors from './SingleEditors';
import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Container } from './Editor-Styles';

/**
 *
 * Note Page
 * Props - startData : json data which has to be loaded to the editor. (Not a mandatory prop)
 *
 * A Note contains sections and tabs.
 * Each tab is an array of editors(tiptap editors)
 * Each section is an array of tabs
 *
 *
 */
const MyEditor = ({ startData }: { startData?: any }) => {
  /**
   *Array of sections 
   {
    sectionID : {
      blocks : [ array of editors (tabs)] //Blocks === tabs
    }
   }
   */
  const [sections, setSections] = useState<any>(
    startData && startData.sections ? startData.sections : {}
  );

  /*Toolbar of editors.*/
  const [toolBar, setToolbar] = useState<any>(null);

  /*Store editor objects
   *editor objects are required to convert editor data to html/json
   {
    sectionId : editorObject
   }
   */
  const editorObjects = useRef<any>({});

  /**
   * Create a new section
   */
  const createSection = () => {
    setSections({ ...sections, [uuidv4()]: { blocks: [1] } });
  };

  /**
   * Link the toolbar to the current selected editor
   */
  const handleSelectEditor = (editor: any) => {
    setToolbar(editor);
  };

  /**
   * Convert each sectors & tabs to HTML and logs it
   */
  const handleSave = () => {
    const data: any = {
      sections: {},
    };

    Object.keys(editorObjects.current).map((section: any, i: number) => {
      data.sections[section] = {
        sectionId: section,
        blocks: [],
      };
      console.log(editorObjects.current[section]);
      editorObjects.current[section].map((editor: any, pos: number) => {
        data.sections[section].blocks.push({
          blockId: uuidv4(),
          position: pos,
          content: editor.getHTML(),
        });
      });
    });

    console.log(data);
  };

  return (
    <Container>
      {<ToolBar editor={toolBar} />}

      {Object.keys(sections).map((section, index) => (
        <div style={{ marginTop: '25px' }} key={index}>
          {sections[section].blocks.map((editor: any, i: number) => {
            return (
              <SingleEditors
                selectEditor={handleSelectEditor}
                key={i}
                editorObjects={editorObjects}
                sectionId={section}
                startData={editor.content}
              />
            );
          })}
          <button
            onClick={() => {
              setSections({
                ...sections,
                [section]: { blocks: [...sections[section].blocks, 1] },
              });
            }}>
            New tab
          </button>
        </div>
      ))}
      {sections && (
        <div>
          <button onClick={createSection}>New Section</button>
        </div>
      )}
      {sections && (
        <div>
          <button onClick={handleSave}>Save to DB</button>
        </div>
      )}
    </Container>
  );
};

export default MyEditor;
