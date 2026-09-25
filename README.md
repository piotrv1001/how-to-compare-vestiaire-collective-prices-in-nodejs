# How to Compare Vestiaire Collective Prices in Node.js

This example calls our [Vestiaire Collective Listings Scraper](https://apify.com/piotrv1001/vestiaire-collective-listings-scraper) on Apify. It does not implement a scraper from scratch.

## What this example does

- Searches for three Louis Vuitton Neverfull listings with product details enabled
- Waits for the Actor run to finish
- Fetches its dataset and prints price breakdowns, condition, and availability fields

Search results are not guaranteed to match the requested bag size. Recheck the linked listing before comparing two offers.

## Prerequisites

- Node.js 18 or later
- An Apify account and [API token](https://console.apify.com/settings/integrations)

## Installation

```bash
npm install
```

## Environment setup

Copy `.env.example` to `.env`, then replace the example value with your Apify token. Do not commit `.env`.

## Usage

```bash
npm start
```

## Code example

```js
import { ApifyClient } from 'apify-client';
import 'dotenv/config';

// Set APIFY_TOKEN in your .env file (copy .env.example to get started)
const client = new ApifyClient({
    token: process.env.APIFY_TOKEN,
});

// This small input returned three detailed records in our September 25 sample.
const input = {
    searchQueries: ['Louis Vuitton Neverfull MM'],
    maxItems: 3,
    fetchProductDetails: true,
    country: 'US',
    currency: 'USD',
    language: 'en',
    proxyConfiguration: { useApifyProxy: false },
};

const run = await client.actor('piotrv1001/vestiaire-collective-listings-scraper').call(input);

console.log('Results from dataset');
console.log(`💾 Check your data here: https://console.apify.com/storage/datasets/${run.defaultDatasetId}`);
const { items } = await client.dataset(run.defaultDatasetId).listItems();
items.forEach((item) => {
    console.dir(item);
});

// 📚 Want to learn more? https://docs.apify.com/api/client/js/docs
```

## Example output

[`sample-output.json`](./sample-output.json) contains selected fields from two records in our successful September 25, 2026 sample run. Both returned `inStock: false`, so they are not an available-item shortlist. `priceAmount` matched `pricingBreakdown.fullPrice` in this run; do not add the buyer-service amount again.

An Actor run can finish with an empty dataset if Vestiaire blocks access. Check the run log before treating zero rows as zero matches. Our first residential-proxy attempt failed; the no-proxy input above produced three rows, but a later no-proxy attempt also failed. Neither setting guarantees access.

Useful fields: `id`, `url`, `brand`, `model`, `priceAmount`, `priceCurrency`, `inStock`, `condition`, `pricingBreakdown`, `buyerFees`, and `dutyAndTax`.

## Use cases

- Compare listing prices in one currency without double-counting buyer-service fees
- Filter out listings with uncertain availability
- Shortlist items by condition and exact model or size
- Keep source URLs for a final live-page check

## Try the Actor on Apify

**[Open the Vestiaire Collective Listings Scraper on Apify](https://apify.com/piotrv1001/vestiaire-collective-listings-scraper)**

## Related resources

- [How to compare Vestiaire Collective prices and buyer fees](https://www.falconscrape.com/blog/how-to-compare-vestiaire-collective-prices-and-fees)

## License

MIT
