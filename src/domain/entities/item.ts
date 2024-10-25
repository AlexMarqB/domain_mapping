import { Entity } from "@/core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

interface ItemProps {
	order_id: UniqueEntityId;
	product_id: UniqueEntityId;
	quantity: number;
    total_price: number;
}

export class Item extends Entity<ItemProps> {
	public static create(props: ItemProps, id?: UniqueEntityId): Item {
		return new Item(props, id);
	}

	get order_id() {
		return this.props.order_id;
	}

	get product_id() {
		return this.props.product_id;
	}

	get quantity() {
		return this.props.quantity;
	}

	set addQuantity(value: number) {
		if (value < 0) {
			throw new Error("Value cannot be negative");
		}
		this.props.quantity += value;
	}

	set removeQuantity(value: number) {
		if (this.props.quantity - value < 1) {
			throw new Error("Quantity cannot be less than 1");
		}
		if (value < 0) {
			throw new Error("Value cannot be negative");
		}

		this.props.quantity -= value;
	}

    get total_price() {
        return this.props.total_price;
    }

    set total_price(value: number) {
        if (value < 0) {
            throw new Error("Value cannot be negative");
        }
        this.props.total_price = value;
    }
}
