import Firecrawl from "@mendable/firecrawl-js";

// Use the default `Firecrawl` class (v2 client). the legacy v1 API is
// still available under `firecrawl.v1` if you ever need it, but for our
// purposes the newer `scrape` method behaves the same way as the old
// `scrapeUrl` endpoint.
const firecrawl = new Firecrawl({
  apiKey: process.env.FIRECRAWL_API_KEY,
});

export async function scrapeProduct(url) {
  try {
    // Use the v2 JSON format for structured extraction.  The old "extract"
    // keyword is not supported by scrape anymore (hence the 400).  A JSON
    // format entry lets us include a prompt + schema directly.
    const result = await firecrawl.scrape(url, {
      // request both a JSON extraction *and* the automatically-detected
      // image URLs – the LLM can miss the image on some layouts, but the
      // built-in `images` format will list every <img> src it finds.
      formats: [
        {
          type: "json",
          prompt:
            "Extract the product name as 'productName', current price as a number as 'currentPrice', currency code (USD, EUR, etc) as 'currencyCode', and product image URL as 'productImageUrl' if available",
          schema: {
            type: "object",
            properties: {
              productName: { type: "string" },
              currentPrice: { type: "number" },
              currencyCode: { type: "string" },
              productImageUrl: { type: "string" },
            },
            required: ["productName", "currentPrice"],
          },
        },
        // also grab every image URL on the page as a fallback
        "images",
      ],
    });

    // JSON output lands in result.json per Document interface
    const extractedData = result.json;

    // if the LLM didn't return an image but the scraper found some
    // candidates, pick the first one as a best effort.
    if (
      extractedData &&
      !extractedData.productImageUrl &&
      Array.isArray(result.images) &&
      result.images.length > 0
    ) {
      extractedData.productImageUrl = result.images[0];
    }

    if (!extractedData || !extractedData.productName) {
      throw new Error("No data extracted from URL");
    }

    return extractedData;
  } catch (error) {
    console.error("Firecrawl scrape error:", error);
    throw new Error(`Failed to scrape product: ${error.message}`);
  }
}
