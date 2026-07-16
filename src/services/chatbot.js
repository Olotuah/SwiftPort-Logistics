export function getBotResponse(message) {
  const msg = message.toLowerCase();

  if (
    msg.includes("track") ||
    msg.includes("tracking") ||
    msg.includes("package") ||
    msg.includes("shipment")
  ) {
    return {
      type: "tracking",
      text:
        "Sure! Please enter your Tracking ID.\n\nExample:\nSP123456789"
    };
  }

  if (
    msg.includes("price") ||
    msg.includes("cost") ||
    msg.includes("quote") ||
    msg.includes("shipping")
  ) {
    return {
      type: "quote",
      text:
`I'd be happy to help.

Please provide:

📍 Pickup City

📍 Destination City

⚖️ Package Weight

📦 Package Type

and we'll estimate your shipping cost.`
    };
  }

  if (
    msg.includes("office") ||
    msg.includes("location") ||
    msg.includes("branch")
  ) {
    return {
      type: "office",
      text:
`SwiftPort Logistics Offices

🇦🇺 Perth (Head Office)

🇦🇺 Sydney

🇦🇺 Melbourne

🇦🇺 Brisbane

We also partner with international logistics providers worldwide.`
    };
  }

  if (
    msg.includes("support") ||
    msg.includes("agent") ||
    msg.includes("human")
  ) {
    return {
      type: "support",
      text:
`Customer Support

📧 support@swiftportlogistics.org

Business
sales@swiftportlogistics.org

Shipment Enquiries
tracking@swiftportlogistics.org

Our support team usually replies within 24 hours.`
    };
  }

  if (
    msg.includes("custom") ||
    msg.includes("import") ||
    msg.includes("export")
  ) {
    return {
      type: "customs",
      text:
`We can assist with:

✔ Customs Documentation

✔ Import & Export

✔ International Freight

✔ Restricted Goods

Please describe what you need.`
    };
  }

  return {
    type: "default",
    text:
`Hi 👋

I'm SwiftBot AI.

I can help you with:

📦 Shipment Tracking

🚚 Shipping Services

🌍 International Shipping

💰 Shipping Quotes

🏢 Office Locations

📞 Customer Support`
  };
}