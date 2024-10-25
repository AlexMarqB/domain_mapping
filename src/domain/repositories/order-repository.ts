import { Optional } from "@/core/types/optional";
import { Order } from "../entities/order";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Item } from "../entities/item";

export interface createOrderProductProps {
    productId: UniqueEntityId;
    quantity: number;
}

export interface OrderRepository {
    create(props: Optional<Order, "items" | "created_at" | "track_code" | 'status'>,): Promise<void>;
    createOrderItems(order: Order, items: Item[]): Promise<void>;
    findById(id: UniqueEntityId): Promise<Order | null>;
    findByTrackingCode(trackingCode: string): Promise<Order | null>;
    findAllByPeriod(start: Date, end: Date): Promise<Order[]>;
    findAllByStatus(status: 'PREPARING' | 'DELIVERING' | 'DELIVERED'): Promise<Order[]>;
    findAllByClientId(clientId: string): Promise<Order[]>;
}