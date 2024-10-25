### Interview

[DomainExpertInterview](https://efficient-sloth-d85.notion.site/Atividade-Mapeando-o-dom-nio-38963358ffd74289b824ff73b187165d)

## Application Objective

- ERP App
- Main functionalities:
    - Sell products
    - Manage inventory
    - Track orders
    - Connect with suppliers

## Entities

- **Product**
    - Unique identifier
    - supplier?
    - price
    - sale_value
    - Size
    - Color
    - Extra information
    - stock_quantity
    - Sales_volume
    - Product_inventory_histories
- **Product_inventory_history**
    - Unique identifier
    - Product
    - stock_update_quantity
    - stock_update_user
    - stock_update_reason
    - stock_update_date
- **Item**
    - Unique identifier
    - Product
    - Quantity
    - Price
    - Order
- **Order**
    - Unique identifier
    - Client
    - items
    - Status
    - track_code
    - Created_at
    - Time_to_deliver
- **Sales_history**
    - Unique identifier
    - orders
    - total_value
    - created_at
- **Client**
    - Unique identifier
    - Name
    - Email
    - Phone
    - Address
    - orders
- **Supplier**
    - Unique identifier
    - Name
    - Email
    - Phone
    - Address
    - Permissions
    - products

## Use Cases

- sell_product
- track_order
- low_inventory_warning
- history_list_by_date
- most_sold_products (3 products)