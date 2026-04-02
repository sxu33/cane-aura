"use server";

import { prisma } from "@/lib/prisma";
import { convertToPlainObject } from "../utils";
import { Product } from "@/types";

export async function getLatestProducts(): Promise<Product[]> {
  const data = await prisma.product.findMany({
    take: 8,
    orderBy: { createdAt: "desc" },
  });
  return convertToPlainObject(data) as Product[];
}
