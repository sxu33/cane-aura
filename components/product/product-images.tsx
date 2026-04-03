"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useState } from "react";

const ProductImages = ({ images }: { images: string[] }) => {
  const [current, setCurrent] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full relative bg-muted aspect-[4/5] overflow-hidden">
        <Image
          src={images[current]}
          alt="product Image"
          priority
          fill
          className="object-cover transition-opacity duration-500"
        ></Image>
      </div>

      <div className="flex gap-3">
        {" "}
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={cn(
              "relative w-24 h-24  overflow-hidden cursor-pointer transition-all duration-200 focus:outline-none",
              index === current
                ? "ring-2 ring-primary ring-offset-1 opacity-100 scale-105"
                : "border-transparent opacity-40 hover:opacity-100"
            )}
          >
            <Image
              src={image}
              fill
              alt={`thumbnail${index + 1}`}
              className="object-cover"
            ></Image>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
