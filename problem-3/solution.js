db.sales.aggregate([
    // Step 1: Expand the items array so each item is treated as a separate document
    { "$unwind": "$items" },

    // Step 2: Group by store and month, then calculate total revenue and average price
    {
        "$group": {
            "_id": {
                "store": "$store",
                "month": { "$dateToString": { "format": "%Y-%m", "date": "$date" } } // Extract YYYY-MM format
            },
            "totalRevenue": { 
                "$sum": { "$multiply": ["$items.quantity", "$items.price"] } // Revenue = quantity * price
            },
            "averagePrice": { 
                "$avg": "$items.price" // Calculate the average price of items sold
            }
        }
    },

    // Step 3: Format the final output and round the average price to 2 decimal places
    {
        "$project": {
            "_id": 0,                   // Remove _id field
            "store": "$_id.store",       // Store name
            "month": "$_id.month",       // Month in YYYY-MM format
            "totalRevenue": 1,           // Keep total revenue
            "averagePrice": { "$round": ["$averagePrice", 2] } // Round avg price to 2 decimal places
        }
    },

    // Step 4: Sort the results first by store name, then by month (ascending order)
    { "$sort": { "store": 1, "month": 1 } }
])
