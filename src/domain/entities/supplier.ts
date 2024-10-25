import { Entity } from "@/core/entities/entity";
import { Product } from "./product";
import { Optional } from "@/core/types/optional";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

interface SupplierProps {
    name: string;
    email: string;
    phone: string;
    address: string;
    permissions: string[];
    products: Product[];
}

export class Supplier extends Entity<SupplierProps> {
    public static create(props: Optional<SupplierProps, 'products'>, id?: UniqueEntityId): Supplier {
        return new Supplier({
            ...props,
            products: props.products ?? []
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

    get permissions() {
        return this.props.permissions;
    }

    get products() {
        return this.props.products;
    }

    set addProduct(product: Product) {
        this.props.products.push(product);
    }

    set removeProduct(product: Product) {
        this.props.products = this.props.products.filter((p) => p !== product);
    }

}