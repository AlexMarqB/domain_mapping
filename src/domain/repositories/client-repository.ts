import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Client } from "../entities/client";

export interface ClientRepository {
    register(client: Client): Promise<void>;
    findClientById(id: UniqueEntityId): Promise<Client | null>;
}