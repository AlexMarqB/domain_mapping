import { Order } from "../entities/order";
import { OrderRepository } from "../repositories/order-repository";
import { ProductRepository } from "../repositories/product-repository";

interface ListSalesHistoryUseCaseRequest {
    start: Date;
    end: Date;
    page: number;
}

interface SalesSummary {
    totalSold: number;
    totalProfit: number;
    bestSellingProductId: string | null;
    bestSellingProductCount: number;
}

export class ListSalesHistoryUseCase {
    constructor(
        private orderRepository: OrderRepository,
        private productRepository: ProductRepository
    ) {}

    async execute({ start, end, page = 1 }: ListSalesHistoryUseCaseRequest): Promise<SalesSummary> {
        const orders = await this.orderRepository.findAllByPeriod(start, end);
        const paginatedOrders = orders.slice((page - 1) * 20, page * 20);
        
        const salesData = await this.aggregateSalesData(paginatedOrders);
        return salesData;
    }

    private async aggregateSalesData(orders: Order[]): Promise<SalesSummary> {
        const productSales = new Map<string, { quantity: number; profit: number }>();
        
        for (const order of orders) {
            for (const item of order.items) {
                const product = await this.productRepository.findProductById(item.product_id); // Acessa o ID único do produto

                if (!product) {
                    throw new Error('Product not found');
                }

                const itemProfit = (item.total_price - product.price) * item.quantity; // Lucro por item

                if (!productSales.has(product.id.toString())) {
                    productSales.set(product.id.toString(), { quantity: 0, profit: 0 });
                }

                const currentSales = productSales.get(product.id.toString())!;
                currentSales.quantity += item.quantity;
                currentSales.profit += itemProfit;
            }
        }

        let totalSold = 0;
        let totalProfit = 0;
        let bestSellingProductId: string | null = null;
        let bestSellingProductCount = 0;

        for (const [productId, sales] of productSales.entries()) {
            totalSold += sales.quantity;
            totalProfit += sales.profit;

            if (sales.quantity > bestSellingProductCount) {
                bestSellingProductCount = sales.quantity;
                bestSellingProductId = productId;
            }
        }

        return {
            totalSold,
            totalProfit,
            bestSellingProductId,
            bestSellingProductCount,
        };
    }
}
