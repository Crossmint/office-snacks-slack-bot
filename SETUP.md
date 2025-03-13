# Office Snacks Bot Setup Guide

This guide provides detailed instructions for setting up and deploying the Office Snacks Bot.

## Prerequisites

- [Node.js](https://nodejs.org/) 18+ installed
- Slack workspace with admin privileges
- [OpenAI API key](https://platform.openai.com/api-keys)
- [Solana wallet](https://docs.solana.com/wallet-guide) with private key
- [Crossmint API key](https://www.crossmint.com/)
- [Vercel](https://vercel.com) to deploy the bot

## Setup

### 1. Install Dependencies

```bash
npm install
# or
pnpm install
```

### 2. Create a Slack App

1. Go to [https://api.slack.com/apps](https://api.slack.com/apps) and click "Create New App"
2. Choose "From scratch" and give your app a name
3. Select your workspace

### 3. Configure Slack App Settings

#### Basic Information

- Under "App Credentials", note down your "Signing Secret"

#### OAuth & Permissions

- Add the following [Bot Token Scopes](https://api.slack.com/scopes):

  - `app_mentions:read`
  - `assistant:write`
  - `chat:write`
  - `im:history`
  - `im:read`
  - `im:write`

- Install the app to your workspace and note down the "Bot User OAuth Token"

### 4. Set Environment Variables

Create a `.env` file in the root of your project with the following:

```
# Slack Credentials
SLACK_BOT_TOKEN=xoxb-your-bot-token
SLACK_SIGNING_SECRET=your-signing-secret

# OpenAI Credentials
OPENAI_API_KEY=your-openai-api-key

# Solana Wallet
SOLANA_SECRET_KEY=your-solana-private-key
SOLANA_RPC_URL=your-solana-rpc-url

# Crossmint API Key
CROSSMINT_API_KEY=your-crossmint-api-key
```

Replace the placeholder values with your actual tokens.

### 5. Deploy your app

- If building locally, follow steps in the Local Development section to tunnel your local environment and then copy the tunnel URL.
- If deploying to Vercel, follow the instructions in the Production Deployment section and copy your deployment URL.

### 6. Update your Slack App configuration:

Go to your [Slack App settings](https://api.slack.com/apps)

- Select your app
- Go to "Event Subscriptions"
- Enable Events
- Set the Request URL to either your local URL or your deployment URL: (e.g. `https://your-app.vercel.app/api/events`)
- Save Changes
- Under "Subscribe to bot events", add:
  - `app_mention`
  - `assistant_thread_started`
  - `message:im`

> Remember to include `/api/events` in the Request URL.

## Local Development

Use the [Vercel CLI](https://vercel.com/docs/cli) and [untun](https://github.com/unjs/untun) to test out this project locally:

```sh
pnpm i -g vercel
pnpm vercel dev --listen 3000 --yes
```

```sh
npx untun@latest tunnel http://localhost:3000
```

Make sure to modify the subscription URL to the `untun` URL.

> Note: you may encounter issues locally with `waitUntil`. This is being investigated.

## Production Deployment

### Deploying to Vercel

1. Push your code to a GitHub repository

2. Deploy to [Vercel](https://vercel.com):

   - Go to vercel.com
   - Create New Project
   - Import your GitHub repository

3. Add your environment variables in the Vercel project settings:

   - `SLACK_BOT_TOKEN`
   - `SLACK_SIGNING_SECRET`
   - `OPENAI_API_KEY`
   - `SOLANA_SECRET_KEY`
   - `SOLANA_RPC_URL`
   - `CROSSMINT_API_KEY`

4. After deployment, Vercel will provide you with a production URL

5. Update your Slack App configuration:
   - Go to your [Slack App settings](https://api.slack.com/apps)
   - Select your app
   - Go to "Event Subscriptions"
   - Enable Events
   - Set the Request URL to: `https://your-app.vercel.app/api/events`
   - Save Changes
   - Under "Subscribe to bot events", add:
     - `app_mention`
     - `assistant_thread_started`
     - `message:im`

## Usage

The bot will respond to:

1. Direct messages - Send a DM to your bot
2. Mentions - Mention your bot in a channel using `@YourBotName`

The bot maintains context within both threads and direct messages, so it can follow along with the conversation.

### Available Tools

1. **Office Locations**: The bot can retrieve office addresses for delivery.
   - Example: "I need to order snacks for the office"

2. **Amazon Purchasing**: The bot can process purchases from Amazon URLs.
   - Example: "Buy this https://www.amazon.com/Croix-Sparkling-Water-Grapefruit-Count/dp/B01MTDGVVY/"

3. **Financial Information**: The bot can share its wallet address and USDC balance.
   - Example: "What's your wallet address and USDC balance?"

### Extending with New Tools

The chatbot is built with an extensible architecture using the [AI SDK's tool system](https://sdk.vercel.ai/docs/ai-sdk-core/tools-and-tool-calling) and the [GOAT SDK](https://github.com/goat-sdk/goat/). You can easily add new tools such as:

- Knowledge base search
- Database queries
- Custom API integrations
- Company documentation search

Create a new plugin in the `lib/goat` directory following the existing pattern. 