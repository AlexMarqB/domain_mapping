import { Item } from "../entities/item";

export interface ItemRepository {
    register(item: Item): Promise<Item>;
    massRegister(items: Item[]): Promise<void>;
    findItemById(id: string): Promise<Item | null>;
    updateItem(item: Item): Promise<void>;
}