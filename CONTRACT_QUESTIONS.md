# Contract Questions

## Question 1 — Product Availability and Quantity

In the `/products` and `/products/{sku}` endpoints, the `quantity` field is used to show the available stock of a product. However, the contract does not clearly state whether `quantity` represents the total stock across all warehouses or the stock available at a specific warehouse. Since CampusCore needs to display marketplace product availability, can Team 5 clarify how the `quantity` value should be interpreted when a product is stored in multiple warehouses?

## Question 2 — Discount Amount and Final Selling Price

The `/discounts/{sku}` endpoint allows CampusCore to update a product's discount amount, while the product's selling price is provided through the `sp` field. However, the contract does not explain whether the `sp` returned by `/products` and `/products/{sku}` is the original selling price or the final price after applying the discount. Can Team 5 clarify how CampusCore should calculate or obtain the final price that should be displayed to marketplace users after a discount is applied?

## Question 3 — Missing Error Response for Product Listing

The `/products` endpoint documents only a `200` successful response. If the billing system is unavailable or an error occurs while retrieving the product list, there is no documented error response such as `500`. Since CampusCore will depend on this endpoint to retrieve marketplace products, what response should CampusCore expect when Team 5's product service cannot return the requested data?

## Reflection

Reviewing Team 5's API contract helped us understand that an API contract must clearly define how data should be interpreted by the consuming team. We identified that fields such as `quantity`, `sp`, and `discount` need clear meanings so that CampusCore and Team 5 do not interpret the same data differently. We also learned that an API contract should document error and failure cases, not only successful responses, because the consuming application needs to know what to expect when something goes wrong.
