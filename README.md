# Office Snacks Bot: Purchasing Assistant for Slack

A powerful AI assistant that helps your team order office snacks and supplies directly from Slack, with crypto payments and automated delivery.

## 🚀 Key Features

- **Seamless Amazon Purchasing**: Order products directly from Amazon URLs shared in Slack
- **Crypto Payments**: Pay with USDC on Solana for all purchases
- **Multi-Office Support**: Automatically delivers to the correct office location
- **Email Receipts**: Sends confirmation emails with purchase details
- **Conversational Interface**: Natural language ordering experience 
- **Slack Integration**: Works in channels, threads, and direct messages

## 💡 Use Cases

### Office Managers
"I need to order snacks for the Miami office."

### Team Leads
"Can you order these headphones for our new developer? Here's the Amazon link."

### Remote Employees
"We need more La Croix for next week's team meeting."

## 🛠️ How It Works

1. **Share an Amazon Link**: Paste any Amazon product URL in Slack
2. **Specify Office Location**: Choose which office to deliver to
3. **Confirm Purchase**: The bot handles payment with USDC on Solana
4. **Receive Confirmation**: Get an email receipt with order details
5. **Slack Integration**: Interact with the bot in public channels or via direct DM with it

## 🔧 Technology Stack

- **[Vercel AI SDK](https://sdk.vercel.ai/docs)**: Powers the conversational AI interface
- **[GOAT SDK](https://github.com/goat-sdk/goat/)**: Gives agent access to onchain tools and crypto payments
- **[Crossmint Headless Checkout](https://docs.crossmint.com/nft-checkout/headless/guides/physical-good-purchases)**: Handles onchain payments for physical products
- **[Slack API](https://api.slack.com)**: Provides the messaging interface

## 📚 Getting Started

Ready to deploy your own Office Snacks Bot? Check out the [setup guide](SETUP.md).

## 📝 License

MIT
