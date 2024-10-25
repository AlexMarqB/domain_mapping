import { ProductRepository } from "../repositories/product-repository";
import { SupplierRepository } from "../repositories/supplier-repository";

export class LowInventoryWarningUseCase {
    constructor(
        private repository: ProductRepository,
        private supplierRepository: SupplierRepository
    ) {}

    async execute() {
        const products = await this.repository.findLowStockProducts();

        const sendEmail = async (email: string) => {
            // send email to supplier
            console.log("Email sent to: ", email);
        }

        products.forEach(async product => {
            const supplier = await this.supplierRepository.findSupplierById(product.supplier_id);

            if (supplier) {
                sendEmail(supplier.email);
            }
        });

        return {lowStockProducts: products.map(product => product.name)}
    }
}