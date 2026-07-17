export interface GameType {
    _id: string;
    title: string;
    price: number;
    platforms: string[];
    isPopular: boolean;
    isFeatured: boolean;
    category: string;
    image: string;
    stock: number;
}