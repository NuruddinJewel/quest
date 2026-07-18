// export interface Order {
//     _id: string;
//     gameTitle: string;
//     price: number;
//     quantity: number;
//     status: "pending" | "approved" | "rejected";
//     purchasedAt: string;
// }

export interface Order {
    _id: string;
    gameId: string;
    gameTitle: string;
    price: number;
    quantity: number;
    buyerId: string;
    buyerName: string;
    buyerEmail: string;
    status: "pending" | "approved" | "rejected";
    purchasedAt: string;
}

export interface PlaceOrderPayload {
    buyerId: string;
    buyerName: string;
    buyerEmail: string;
    quantity: number;
}