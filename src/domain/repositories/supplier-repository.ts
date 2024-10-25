import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Supplier } from "../entities/supplier";

export interface SupplierRepository {
    register(supplier: Supplier): Promise<void>;
    findSupplierById(id: UniqueEntityId): Promise<Supplier | null>;
}