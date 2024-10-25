import { Entity } from "@/core/entities/entity";
import { Order } from "./order";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";

interface ClientProps {
    name: string;
    email: string;
    phone: string;
    address: string;
    orders: Order[];
}

export class Client extends Entity<ClientProps> {
    public static create(props: Optional<ClientProps, 'orders'>, id?: UniqueEntityId): Client {
        return new Client({
            ...props,
            orders: props.orders ?? []
        }, id);
    }

    get name() {
        return this.props.name;
    }

    get email() {
        return this.props.email;
    }

    get phone() {
        return this.props.phone;
    }

    get address() {
        return this.props.address;
    }

    get orders() {
        return this.props.orders;
    }

    set addOrder(order: Order) {
        this.props.orders.push(order);
    }

    set removeOrder(order: Order) {
        this.props.orders = this.props.orders.filter((o) => o !== order);
    }
}