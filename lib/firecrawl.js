import Firecrawl from "@mendable/firecrawl-js";



const firecrawl = new Firecrawl({apikey: process.env.FIRECRAWL_API_KEY});

export async function scrapeProduct(url) {
    try {
        const result = await firecrawl.scrape(url, {
            formats: [{type:"json","schema": {
        "type": "object",
        "required": [
          "productName",
          "currentPrice"
        ],
        "properties": {
          "productName": {
            "type": "string"
          },
          "currentPrice": {
            "type": "string"
          },
          "currencyCode": {
            "type": "string"
          },
          "productImageUrl": {
            "type": "string"
          }
        }
      },
      "prompt": "extract the product name as \"productName\" , current price as a number as \"currentPrice\" , currency code (usd,eur,etc) as\"currencyCode\". product Image URL as \"productImageUrl\" if available"}]
        })

      const extractedData = result.json 
        if(!extractedData || !extractedData.productName) {
            throw new Error("no data extracted from url")
        } 
        return extractedData
    } catch (error) {
       console.error("Firecrawl scrape error:", error);
    throw new error(`Failed to scrape product: ${error.message}`);
    }
}