export function getBotResponse(message) {
  const msg = message.toLowerCase();

  if (
    msg.includes("track") ||
    msg.includes("tracking") ||
    msg.includes("package")
  ) {
    return {
      type: "tracking",
      text: "Sure! Please enter your Tracking ID (e.g. ABC123)."
    };
  }

  if (
    msg.includes("price") ||
    msg.includes("cost") ||
    msg.includes("quote") ||
    msg.includes("shipping rate")
  ) {
    return {
      type: "quote",
      text:
        "I'd be happy to calculate your shipping cost.\n\nPlease tell me:\n\n• Pickup city\n• Destination city\n• Weight\n• Package type"
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
        "SwiftPort has offices across Nigeria.\n\nWhich city are you looking for?"
    };
  }

  if (
    msg.includes("custom") ||
    msg.includes("prohibited")
  ) {
    return {
      type: "customs",
      text:
        "We can help with customs documentation, prohibited items and import/export regulations. What would you like to know?"
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
        "I'll connect you with one of our customer support representatives shortly."
    };
  }

  return {
    type: "default",
    text:
      "I'm sorry, I didn't quite understand that.\n\nYou can ask me about:\n\n📦 Tracking\n🚚 Shipping\n💰 Quotes\n📍 Office locations\n📄 Customs\n📞 Support"
  };
}