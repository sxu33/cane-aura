import ProductImages from "@/components/product/product-images";
import ProductPrice from "@/components/product/product-price";
import { Button } from "@/components/ui/button";
import { getProductBySlug } from "@/lib/actions/product.actions";
import { cn } from "@/lib/utils";

import Image from "next/image";

import { notFound } from "next/navigation";
const ProductDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-12 lg:gap-24">
        <div className="md:col-span-3">
          <ProductImages images={product.images} />
        </div>
        <div className="md:col-span-2 flex flex-col justify-center">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
            {product.brand}
          </p>
          <h1 className="font-serif text-4xl lg:text-5xl text-foreground mb-6 leading-tight">
            {product.name}
          </h1>
          <div className="flex items-center gap-4 mb-8 border-b border-border pb-6">
            <ProductPrice
              value={Number(product.price)}
              className="text-3xl text-primary"
            />

            <div className="h-4 w-px bg-border/60" />
            <div className="flex items-center gap-1 text-sm">
              <span className="text-accent text-lg">★</span>
              <span className="font-sans font-medium">{product.rating}</span>
              <span className="text-muted-foreground">{product.numReviews}</span>
            </div>
          </div>
          <div className="space-y-6 mb-10">
            <div>
              <h3 className="text-xs uppercase tracking-widest font-sans font-bold mb-2">
                Description
              </h3>
              <p className="text-muted-foreground font-sans leading-relaxed text-sm lg:text-base ">
                {product.description}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-widest font-sans">
                Status:{" "}
              </span>
              <span
                className={cn(
                  "text-[10px] font-bold uppercase tracking-wider",
                  product.countInStock > 0 ? "text-primary" : "text-destructive"
                )}
              >
                {product.countInStock > 0 ? "In stock" : "Out of stock"}
              </span>
            </div>

            {product.countInStock > 0 && (
              <Button
                size="lg"
                className="w-full uppercase tracking-[0.2em] text-xs py-5"
              >
                Add to Cart
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsPage;
