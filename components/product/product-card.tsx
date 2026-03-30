import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }: { product: any }) => {
  return (
    <div className="group flex flex-col w-full">
      <Link
        href={`/product/${product.slug}`}
        className="relative aspect-[4/5] w-full overflow-hidden bg-muted"
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </Link>

      <div className="pt-4 flex flex-col gap-1.5">
        <p className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.2em] text-muted-foreground">
          {product.brand}
        </p>

        <Link href={`/product/${product.slug}`}>
          <h3 className="font-serif text-lg sm:text-xl text-foreground line-clamp-1 transition-colors group-hover:text-primary">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center justify-between mt-1">
          <p className="font-sans text-base sm:text-lg text-primary tracking-wide">
            ${product.price}
          </p>

          <div className="flex items-center gap-1 font-sans text-xs text-muted-foreground">
            <span className="text-accent">★</span>
            <span>{product.rating}</span>
            <span className="opacity-60">({product.numReviews})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
