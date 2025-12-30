import { scrapeProduct } from "@/lib/firecrawl";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { sendPriceDropAlert } from "@/lib/email"; // adjust path if needed

// --------------------
// GET (health check)
// --------------------
export async function GET() {
  return NextResponse.json({
    message: "Price check endpoint is working. Use POST to trigger.",
  });
}

// --------------------
// POST (cron job)
// --------------------
export async function POST(req) {
  try {
    /* --------------------
       1. CRON SECURITY
    -------------------- */
    const authHeader = req.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET_KEY;

    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    /* --------------------
       2. SUPABASE (ADMIN)
       BYPASS RLS
    -------------------- */
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY
    );

    /* --------------------
       3. FETCH PRODUCTS
    -------------------- */
    const { data: products, error: productsError } = await supabase
      .from("products")
      .select("*");

    if (productsError) throw productsError;

    console.log(`Found ${products.length} products to check`);

    /* --------------------
       4. RESULT TRACKER
    -------------------- */
    const results = {
      total: products.length,
      updated: 0,
      failed: 0,
      priceChanges: 0,
      alertsSent: 0,
    };

    /* --------------------
       5. PROCESS PRODUCTS
    -------------------- */
    for (const product of products) {
      try {
        // 🔹 Scrape live data
        const productData = await scrapeProduct(product.url);

        if (!productData?.currentPrice) {
          results.failed++;
          continue;
        }

        const newPrice = parseFloat(productData.currentPrice);
        const oldPrice = parseFloat(product.current_price);

        /* --------------------
           6. UPDATE PRODUCT
        -------------------- */
        await supabase
          .from("products")
          .update({
            current_price: newPrice,
            currency: productData.currencyCode || product.currency,
            name: productData.productName || product.name,
            image_url:
              productData.productImageUrl || product.image_url,
            updated_at: new Date().toISOString(),
          })
          .eq("id", product.id);

        /* --------------------
           7. PRICE CHANGE
        -------------------- */
        if (oldPrice !== newPrice) {
          await supabase.from("price_history").insert({
            product_id: product.id,
            price: newPrice,
            currency: productData.currencyCode || product.currency,
          });

          results.priceChanges++;

          /* --------------------
             8. PRICE DROP ALERT
          -------------------- */
          if (newPrice < oldPrice) {
            // alert
            const {
              data: { user },
            } = await supabase.auth.admin.getUserById(
              product.user_id
            );

            if (user?.email) {
                //send email
              const emailResult = await sendPriceDropAlert(
                user.email,
                product,
                oldPrice,
                newPrice
              );

              if (emailResult?.success) {
                results.alertsSent++;
              }
            }
          }
        }

        results.updated++;
      } catch (productError) {
        console.error(
          `Error processing product ${product.id}:`,
          productError
        );
        results.failed++;
      }
    }

    /* --------------------
       9. FINAL RESPONSE
    -------------------- */
    return NextResponse.json({
      success: true,
      message: "Price check completed",
      results,
    });
  } catch (error) {
    console.error("Cron job error:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
