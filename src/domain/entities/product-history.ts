import { Entity } from "@/core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

interface ProductHistoryProps {
    product_id: UniqueEntityId;
    stock_before: number;
    stock_after: number;
    author: UniqueEntityId;
    action: 'REMOVE' | 'ADD';
    date: Date;
}

export class ProductHistory extends Entity<ProductHistoryProps> {
    
        public static create(props: ProductHistoryProps, id?: UniqueEntityId): ProductHistory {
            return new ProductHistory(props, id);
        }
    
        get product_id() {
            return this.props.product_id;
        }
    
        get stock_before() {
            return this.props.stock_before;
        }
    
        get stock_after() {
            return this.props.stock_after;
        }
    
        get author() {
            return this.props.author;
        }
    
        get action() {
            return this.props.action;
        }
    
        get date() {
            return this.props.date;
        }
}