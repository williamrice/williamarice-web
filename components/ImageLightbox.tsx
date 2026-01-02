"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface ImageLightboxProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  className?: string;
  priority?: boolean;
}

export default function ImageLightbox({
  src,
  alt,
  fill = false,
  width,
  height,
  sizes,
  className = "",
  priority = false,
}: ImageLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Thumbnail - clickable */}
      <div
        onClick={() => setIsOpen(true)}
        className="cursor-zoom-in overflow-hidden"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsOpen(true);
          }
        }}
        aria-label={`View ${alt} in full size`}
      >
        {fill ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            className={`${className} transform hover:scale-105 transition-transform duration-500`}
            priority={priority}
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes={sizes}
            className={`${className} transform hover:scale-105 transition-transform duration-500`}
            priority={priority}
          />
        )}
      </div>

      {/* Lightbox Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fadeIn"
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-gray-800/80 text-white hover:bg-gray-700 transition-colors"
            aria-label="Close lightbox"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Image container */}
          <div
            className="relative max-w-7xl max-h-[90vh] w-full h-full p-4 cursor-zoom-out"
            onClick={(e) => {
              // Only close if clicking the container, not the image
              if (e.target === e.currentTarget) {
                setIsOpen(false);
              }
            }}
          >
            <div className="relative w-full h-full">
              <Image
                src={src}
                alt={alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
          </div>

          {/* ESC key to close */}
          <div
            className="hidden"
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setIsOpen(false);
              }
            }}
          />
        </div>
      )}
    </>
  );
}
