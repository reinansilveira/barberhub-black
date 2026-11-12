"use client";

import Image from "next/image";
import { GALLERY } from "../site.data";
import { usePinnedGallery } from "../hooks/use-pinned-gallery";

export function PinnedGallery() {
  const { section, track } = usePinnedGallery();

  return (
    <section className="pinned" id="casa" ref={section}>
      <div className="pinned__sticky">
        <div className="pinned__track" ref={track}>
          <div className="pinned__intro">
            <p className="eyebrow">A casa</p>
            <h2 className="title">
              Um lugar feito para
              <br />
              <em>desacelerar.</em>
            </h2>
            <span className="pinned__hint" aria-hidden="true">
              Role →
            </span>
          </div>
          {GALLERY.map((item, index) => (
            <figure
              key={item.image}
              className={`pinned__item pinned__item--${index % 3}`}
            >
              <Image
                src={item.image}
                alt={item.label}
                fill
                sizes="(max-width: 900px) 80vw, 45vw"
              />
              <figcaption>
                <span>0{index + 1}</span> {item.label}
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="pinned__bar" aria-hidden="true">
          <i />
        </div>
      </div>
    </section>
  );
}
