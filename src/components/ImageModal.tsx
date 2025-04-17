"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import Image from "next/image";

type ImageModalProps = {
  images: string[];
  selectedIndex: number;
  onClose: () => void;
  setSelectedIndex: (index: number) => void;
};

export default function ImageModal({
  images,
  selectedIndex,
  onClose,
  setSelectedIndex,
}: ImageModalProps) {
  const src = images[selectedIndex];

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && selectedIndex < images.length - 1)
        setSelectedIndex(selectedIndex + 1);
      if (e.key === "ArrowLeft" && selectedIndex > 0)
        setSelectedIndex(selectedIndex - 1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex, images.length, onClose, setSelectedIndex]);

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="modal-content"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={src}
            alt="Expanded"
            width={900}
            height={600}
            style={{ objectFit: "contain", borderRadius: "8px" }}
          />

          <div className="modal-buttons">
            <button onClick={onClose}>x</button>
            <a href={src} download target="_blank" rel="noopener noreferrer">
              download
            </a>
            <a href={src} target="_blank" rel="noopener noreferrer">
              open
            </a>
            <button
              onClick={() => setSelectedIndex(selectedIndex - 1)}
              disabled={selectedIndex === 0}
              style={{ opacity: selectedIndex === 0 ? 0.5 : 1 }}
            >
              prev
            </button>
            <button
              onClick={() => setSelectedIndex(selectedIndex + 1)}
              disabled={selectedIndex === images.length - 1}
              style={{
                opacity: selectedIndex === images.length - 1 ? 0.5 : 1,
              }}
            >
              next
            </button>
          </div>

          <div
            className="modal-thumbnails"
            style={{
              display: "flex",
              gap: "0.5rem",
              marginTop: "1rem",
              overflowX: "auto",
            }}
          >
            {images.map((thumb, idx) => (
              <Image
                key={idx}
                src={thumb}
                alt={`Thumbnail ${idx + 1}`}
                width={60}
                height={60}
                onClick={() => setSelectedIndex(idx)}
                style={{
                  cursor: "pointer",
                  opacity: idx === selectedIndex ? 1 : 0.5,
                  border:
                    idx === selectedIndex ? "2px solid #000" : "1px solid #ccc",
                  borderRadius: "6px",
                  flexShrink: 0,
                }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
