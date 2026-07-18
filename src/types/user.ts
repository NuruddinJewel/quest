export interface BuyerUser {
    _id: string;
    name: string;
    email: string;
    totalOrders: number;
    totalSpent: number;
    lastPurchase: string | null;
    joinedAt: string;
}