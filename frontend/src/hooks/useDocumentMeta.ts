import { useEffect } from 'react';

export function useDocumentMeta(title: string, description?: string) {
  useEffect(() => {
    const fullTitle = title.includes('ALPHORAA')
      ? title
      : `${title} | ALPHORAA AI INNOVATIONS`;
    document.title = fullTitle;

    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'description');
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', description);
    }
  }, [title, description]);
}
