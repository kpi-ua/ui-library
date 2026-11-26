import type { ReactNode } from 'react';

import { Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, Paragraph, Strong, UList } from '../typography';

export const richTextTags = {
  p: (chunks: ReactNode) => <Paragraph>{chunks}</Paragraph>,
  br: () => <br />,
  b: (chunks: ReactNode) => <Strong>{chunks}</Strong>,
  h1: (chunks: ReactNode) => <Heading1>{chunks}</Heading1>,
  h2: (chunks: ReactNode) => <Heading2>{chunks}</Heading2>,
  h3: (chunks: ReactNode) => <Heading3>{chunks}</Heading3>,
  h4: (chunks: ReactNode) => <Heading4>{chunks}</Heading4>,
  h5: (chunks: ReactNode) => <Heading5>{chunks}</Heading5>,
  h6: (chunks: ReactNode) => <Heading6>{chunks}</Heading6>,
  ul: (chunks: ReactNode) => <UList>{chunks}</UList>,
  li: (chunks: ReactNode) => <li>{chunks}</li>,
  tel: (chunks: ReactNode) => (
    <a className="whitespace-nowrap" href={`tel:${chunks}`}>
      {chunks}
    </a>
  ),
  email: (chunks: ReactNode) => (
    <a className="whitespace-nowrap" href={`mailto:${chunks}`}>
      {chunks}
    </a>
  ),
};
