import React from 'react';
import { SectionMarker } from './SectionMarker';
import { StoryText } from './StoryText';
import { ImageComposition } from './ImageComposition';

export interface StorySectionProps {
  id: string;
  actNumber: string;
  chapterNumber: string;
  eyebrow: string;
  heading: string;
  supportingCopy: string;
  narrativeParagraphs?: string[];
  benchmarks?: { label: string; value: string }[];
  quote?: { text: string; author?: string };
  ctaText?: string;
  onCtaClick?: () => void;
  imageProps: {
    primaryImage: string;
    secondaryImage?: string;
    backdropImage?: string;
    altText: string;
    frameId: string;
    coordinates?: string;
    telemetryTag: string;
    variant?: 'overlap-duo' | 'wide-landscape' | 'tactical-portrait';
    overlapDirection?: 'left' | 'right';
  };
  layoutVariant?: 'text-left' | 'text-right';
}

export const StorySection: React.FC<StorySectionProps> = ({
  id,
  actNumber,
  chapterNumber,
  eyebrow,
  heading,
  supportingCopy,
  narrativeParagraphs,
  benchmarks,
  quote,
  ctaText,
  onCtaClick,
  imageProps,
  layoutVariant = 'text-left',
}) => {
  return (
    <section
      id={id}
      className="relative w-full pt-12 pb-20 md:pt-16 md:pb-28 lg:pt-20 lg:pb-32 bg-[#07080a] border-b border-white/10 select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Editorial Section Marker with Scroll-Reactive Hairline */}
        <SectionMarker
          actNumber={actNumber}
          chapterNumber={chapterNumber}
          eyebrow={eyebrow}
          coordinates={imageProps.coordinates}
        />

        {/* Asymmetrical Editorial Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-center">
          
          {/* Text Story Column (6 Cols) */}
          <div
            className={`lg:col-span-6 flex flex-col justify-center space-y-8 ${
              layoutVariant === 'text-right' ? 'lg:order-2' : 'lg:order-1'
            }`}
          >
            <StoryText
              eyebrow={eyebrow}
              heading={heading}
              supportingCopy={supportingCopy}
              narrativeParagraphs={narrativeParagraphs}
              benchmarks={benchmarks}
              quote={quote}
              ctaText={ctaText}
              onCtaClick={onCtaClick}
            />
          </div>

          {/* Media Visual Composition Column (6 Cols) */}
          <div
            className={`lg:col-span-6 flex items-center justify-center ${
              layoutVariant === 'text-right' ? 'lg:order-1' : 'lg:order-2'
            }`}
          >
            <ImageComposition {...imageProps} />
          </div>

        </div>
      </div>
    </section>
  );
};

export default StorySection;
