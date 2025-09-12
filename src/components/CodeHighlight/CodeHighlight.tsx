import { useMemo, type FC } from 'react';
import { createHighlighterCore } from 'shiki/core';
import { createOnigurumaEngine } from 'shiki/engine/oniguruma';
import lightPlus from '@shikijs/themes/light-plus';

interface CodeHighlightProps {
  code: string;
  lang: string;
}

export const CodeHighlight: FC<CodeHighlightProps> = (props) => {
  const html = useMemo(() => {
    return highlighter.codeToHtml(
      props.code,
      { lang: props.lang, theme: 'light-plus' }
    );
  }, [props.code, props.lang]);

  return (
    <div dangerouslySetInnerHTML={{ __html: html }} />
  );
}

CodeHighlight.displayName = 'CodeHighlight';

const highlighter = await createHighlighterCore({
  themes: [
    { ...lightPlus, colors: { ...lightPlus.colors, 'editor.background': 'transparent' } },
  ],
  langs: [
    () => import('@shikijs/langs/typescript'),
    () => import('@shikijs/langs/markdown'),
    () => import('@shikijs/langs/scss'),
  ],
  engine: createOnigurumaEngine(import('shiki/wasm'))
});
