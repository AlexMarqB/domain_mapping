import { Entity } from "@/core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

interface ProductProps {
	supplier_id: UniqueEntityId;
	name: string;
	price: number;
	sale_price: number;
	description: string;
	stock: number;
	minimum_stock: number;
	sales_count: number;
}

export class Product extends Entity<ProductProps> {
	public static create(props: ProductProps, id?: UniqueEntityId): Product {
		return new Product(props, id);
	}

	get supplier_id() {
		return this.props.supplier_id;
	}

	get name() {
		return this.props.name;
	}

	get price() {
		return this.props.price;
	}

	get sale_price() {
		return this.props.sale_price;
	}

	get description() {
		return this.props.description;
	}

	get stock() {
		return this.props.stock;
	}

	addStock(value: number) {
		if (value < 0) {
			throw new Error("Value cannot be negative");
		}
		this.props.stock += value;
	}

	removeStock(value: number) {
		if (value < 0) {
			throw new Error("Value cannot be negative");
		}
		if (this.props.stock - value < this.props.minimum_stock) {
			throw new Error("Stock cannot be less than minimum stock");
		}

		this.props.stock -= value;
	}

	get minimum_stock() {
		return this.props.minimum_stock;
	}

	get sales_count() {
		return this.props.sales_count;
	}
}
