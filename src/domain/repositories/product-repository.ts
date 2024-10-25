import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Product } from "../entities/product";
import { ProductHistory } from "../entities/product-history";

export interface ProductRepository {
    register(product: Product): Promise<void>;
    findProductById(id: UniqueEntityId): Promise<Product | null>;
    updateProduct(product: Product): Promise<void>;
    findLowStockProducts(): Promise<Product[]>;
    massUpdateProducts(products: Product[]): Promise<void>;

    //Product history
    createProductHistory(productHistory: ProductHistory): Promise<void>;
    massCreateProductHistory(productHistories: ProductHistory[]): Promise<void>;
}