import styled from '@emotion/styled';

/**
 * This styles apply to all editors
 * ProseMirror class targets a editor
 */
export const Container = styled.div`
  width: 100%;
  .ProseMirror {
    min-height: 200px;
    background-color: #ffffff;
    color: black;
    padding: 10px;
    /* margin-top: 0.75em; */

    outline: none;
    border-left: 5px solid red;
    &:focus {
      /* outline: none; */
      border-left: none;
    }
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: #0d0d0d;
    color: #fff;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0d0d0d, 0.1);
  }

  hr {
    border-top: 2px solid rgba(#0d0d0d);
    margin: 2rem 0;
  }

  .myDiv {
    background-color: red;
  }
`;
