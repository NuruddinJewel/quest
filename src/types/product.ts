export interface GameProduct {
    _id: string;
    title: string;
    slug: string;
    description: string;
    price: number;
    discountPrice?: number;
    platforms: ("PS2" | "PS3" | "PS4" | "PS5" | "Xbox" | "PC premium")[];
    category: string[];
    imageUrl: string;
    stock: number;
    releaseYear: number;
    isBestseller: boolean;
    rating: number;
}