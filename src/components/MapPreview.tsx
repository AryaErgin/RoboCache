import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { Card, Eyebrow, Heading, Paragraph, Section } from './primitives';

const LazyMapPreviewScene = lazy(() => import('./MapPreviewScene'));

function MapPreview() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (!sectionRef.current || shouldLoad) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '240px 0px' },
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <Section id="map-preview" labelledBy="map-preview-title" className="rc-map-section">
      <div ref={sectionRef} className="rc-map-stack">
        <div className="rc-section-head">
          <Eyebrow>LIVE MAP PREVIEW</Eyebrow>
          <Heading as="h2" id="map-preview-title">
            Robotics geocache platform with proximity-based part discovery
          </Heading>
          <Paragraph muted>
            Teams filter by distance, see regional part availability in real time, and coordinate
            exchange with verified FIRST Robotics Competition teams.
          </Paragraph>
          <div className="rc-map-pill-group" aria-label="Map capabilities">
            <span>Proximity-based discovery</span>
            <span>Regional collaboration</span>
            <span>Real-time part availability</span>
          </div>
        </div>

        <Card className="rc-map-card" as="article">
          <Suspense fallback={<div className="rc-map-skeleton">Loading map preview...</div>}>
            {shouldLoad ? <LazyMapPreviewScene /> : <div className="rc-map-skeleton">Loading map preview...</div>}
          </Suspense>
        </Card>
      </div>
    </Section>
  );
}

export default MapPreview;
