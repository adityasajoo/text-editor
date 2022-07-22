import MyEditor from './Editor/MyEditor';
import styled from '@emotion/styled';
import { useState } from 'react';
import LoadPage from './Editor/LoadPage';

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

/**
 * We have two pages
 * LoadPage - Where we can load data to the editors from a json (Json has a format)
 * Note Page - Where we have the editor
 *
 */
function App() {
  const [showLoadPage, setShowLoadPage] = useState(false);
  const [startData, setStartData] = useState<any>({});
  return (
    <>
      <button onClick={() => setShowLoadPage(!showLoadPage)} style={{margin:"30px"}}>
        {showLoadPage ? 'Go to Editor' : 'Go to load data '}
      </button>
      {showLoadPage ? (
        <LoadPage setStartData={setStartData} />
      ) : (
        <MainContainer>
          <MyEditor startData={startData} />
        </MainContainer>
      )}
    </>
  );
}

export default App;
