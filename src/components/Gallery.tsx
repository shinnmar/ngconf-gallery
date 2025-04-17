"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import ImageModal from "./ImageModal";

const totalFotos = 19;

export default function Gallery() {
  const [images, setImages] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    const generated = Array.from(
      { length: totalFotos },
      (_, i) => `/conference/foto${i + 1}.jpg`
    );
    setImages(generated);
  }, []);

  return (
    <section className="gallery">
      {images.map((src, idx) => (
        <motion.div
          key={idx}
          className="gallery-item"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          onClick={() => setSelectedIndex(idx)}
        >
          <Image
            src={src}
            alt={`Foto ${idx + 1}`}
            width={600}
            height={400}
            className="gallery-img"
            style={{ objectFit: "cover" }}
          />
        </motion.div>
      ))}

      {selectedIndex !== null && (
        <ImageModal
          images={images}
          selectedIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
          setSelectedIndex={setSelectedIndex}
        />
      )}
    </section>
  );
}
