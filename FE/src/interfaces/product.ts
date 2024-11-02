// Type variants
export interface TVariants {
    color: string;
    stock: number;
    price: number;
    thumbnail: string;
    _id: string;
}


// Type product
export interface TProduct {
    _id: string;
    title: string;
    category: {};
    description: string;
    sizes: [];
    slug: string;
    variants: TVariants[];
}