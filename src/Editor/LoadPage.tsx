import React, { Dispatch, SetStateAction, useState } from 'react';

const LoadPage = ({
  setStartData,
}: {
  setStartData: Dispatch<SetStateAction<any>>;
}) => {
  const [value, setValue] = useState('');
  return (
    <div>
      LoadPage
      <div>
        <textarea value={value} onChange={e => setValue(e.target.value)} />
        <button
          onClick={() => {
            try {
              setStartData(JSON.parse(value));
            } catch (error) {
              setStartData({});
            }
            // console.log(JSON.parse(value));
          }}>
          Add to Note
        </button>
      </div>
    </div>
  );
};

export default LoadPage;
