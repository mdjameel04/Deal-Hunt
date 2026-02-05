import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendPriceDropAlert(
  userEmail,
  product,
  oldPrice,
  newPrice
) {
  try {
    const priceDrop = oldPrice - newPrice;
    const percentageDrop = ((priceDrop / oldPrice) * 100).toFixed(1);

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: userEmail,
      subject: `🥳 Price Drop Alert: ${product.name}`,
      html: `<!DOCTYPE html>
      <html>
        <body>
          <h2>Price dropped by ${percentageDrop}%</h2>
          <p><strong>${product.name}</strong></p>
          <p>
            Old: ${product.currency} ${oldPrice.toFixed(2)} <br/>
            New: ${product.currency} ${newPrice.toFixed(2)}
          </p>
          <a href="${product.url}">View Product</a>
        </body>
      </html>`
    });

    if (error) {
      console.error("Resend error:", error);
      return { error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Email error:", error);
    return { error: error.message };
  }
}