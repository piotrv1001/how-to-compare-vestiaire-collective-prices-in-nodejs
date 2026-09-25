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
