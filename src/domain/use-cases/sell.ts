import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { ItemRepository } from "../repositories/item-repository";
import {
	createOrderProductProps,
	OrderRepository,
} from "../repositories/order-repository";
import { ProductRepository } from "../repositories/product-repository";
import { ClientRepository } from "../repositories/client-repository";
import { Item } from "../entities/item";
import { Order } from "../entities/order";
import dayjs from "dayjs";
import { ProductHistory } from "../entities/product-history";

interface SellRequest {
	clientId: UniqueEntityId;
	productsProps: createOrderProductProps[];
}

export class SellUseCase {
	constructor(
		private clientRepository: ClientRepository,
		private orderRepository: OrderRepository,
		private itemRepository: ItemRepository,
		private productRepository: ProductRepository
	) {}

	async execute({ clientId, productsProps }: SellRequest) {
		const client = await this.clientRepository.findClientById(clientId);

		if (!client) {
			throw new Error("Client not found");
		}

		const order = Order.create({
			client_id: clientId,
			expected_delivery_date: dayjs().add(7, "day").toDate(),
		});

		await this.orderRepository.create(order);

		const items = [];
		const updates = [];
		const updateRegisters = [];

		for (const { productId, quantity } of productsProps) {
			const productEntity = await this.productRepository.findProductById(
				productId
			);
			if (!productEntity) {
				throw new Error("Product not found");
			}
			let originalStock = productEntity.stock;
			let newStock = productEntity.stock - quantity;
			if (newStock < productEntity.minimum_stock) {
				throw new Error("Product out of stock");
			}
			productEntity.removeStock(quantity);
			updates.push(productEntity);

			const register = ProductHistory.create({
				product_id: productId,
				action: "REMOVE",
				author: clientId,
				date: new Date(),
				stock_after: originalStock,
				stock_before: newStock,
			});
			updateRegisters.push(register);

			const item = Item.create({
				order_id: order.id,
				product_id: productEntity.id,
				quantity: quantity,
				total_price: productEntity.price * quantity,
			});

			items.push(item);
		}

        // Atualizando os produtos
		await this.productRepository.massUpdateProducts(updates);

        await this.productRepository.massCreateProductHistory(updateRegisters);

        // Registrando os itens
		await this.itemRepository.massRegister(items);

        // Registrando os itens no pedido
		await this.orderRepository.createOrderItems(order, items);

        // Buscando o pedido atualizado
        return await this.orderRepository.findById(order.id);
	}
}
