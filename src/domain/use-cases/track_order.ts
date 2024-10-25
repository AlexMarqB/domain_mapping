import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { OrderRepository } from "../repositories/order-repository";

export class TrackOrderUseCase {
    constructor(private repository: OrderRepository) {}
    
    async execute(orderId: UniqueEntityId) {
       const order = await this.repository.findById(orderId);
       
         if (!order) {
              throw new Error('Order not found');
         }

         return {
            trackingCode: order.track_code,
            status: order.status,
            createdAt: order.created_at,
            expectedDeliveryDate: order.expected_delivery_date
         }
    }
}