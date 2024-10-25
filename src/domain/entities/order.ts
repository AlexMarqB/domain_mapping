import { Entity } from "@/core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Item } from "./item";
import { Optional } from "@/core/types/optional";
import cuid from "cuid";

interface OrderProps {
	client_id: UniqueEntityId;
	track_code: string;
	items: Item[];
	status: "PREPARING" | "DELIVERING" | "DELIVERED";
	created_at: Date;
	expected_delivery_date: Date;
}

export class Order extends Entity<OrderProps> {
	public static create(
		props: Optional<OrderProps, "items" | "created_at" | "track_code" | 'status'>,
		id?: UniqueEntityId
	): Order {
		return new Order(
			{
				...props,
				status: props.status ?? "PREPARING",
                items: props.items ?? [],
				track_code: props.track_code ?? cuid(),
				created_at: new Date(),
			},
			id
		);
	}

	get client_id() {
		return this.props.client_id;
	}

	get track_code() {
		return this.props.track_code;
	}

	get items() {
		return this.props.items;
	}

    set addItem(item: Item) {
        this.props.items.push(item);
    }

    set removeItem(item: Item) {
        this.props.items = this.props.items.filter((i) => i !== item);
    }

	get status() {
		return this.props.status;
	}

	set status(value: "PREPARING" | "DELIVERING" | "DELIVERED") {
		this.props.status = value;
	}

	get created_at() {
		return this.props.created_at;
	}

	get expected_delivery_date() {
		return this.props.expected_delivery_date;
	}
}
