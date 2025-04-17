"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const totalFotos = 7;
const images = Array.from(
  { length: totalFotos },
  (_, i) => `/conference/foto${i + 1}.jpg`
);

export default function Gallery() {
  return (
    <section className="gallery">
      {images.map((src, idx) => (
        <motion.div
          key={idx}
          className="gallery-item"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
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
    </section>
  );
}
