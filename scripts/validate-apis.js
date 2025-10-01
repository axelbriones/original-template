require('dotenv').config();
const fetch = require('node-fetch');

const DOMAINS_TO_TEST = [
    { url: 'http://localhost:3000', name: 'Local Development' },
    { url: 'http://localhost:3001', name: 'Local Development Alt' },
    { url: 'https://gruas-service.web.app', name: 'Firebase Production' },
    { url: 'https://gruas-vip-web.vercel.app', name: 'Vercel Production' }
];

async function validateGoogleMapsAPI(apiKey, type, domain) {
    const headers = {
        'User-Agent': 'GruasVIP-APITest/1.0',
        'Referer': domain.url + '/'
    };

    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=New+York&key=${apiKey}`;
    try {
        const response = await fetch(url, { headers });
        const data = await response.json();
        
        if (data.status === 'OK') {
            console.log(`✅ ${type} API Key is valid for ${domain.name} (${domain.url})`);
            return true;
        } else {
            console.log(`❌ ${type} API Key failed for ${domain.name} (${domain.url})`);
            console.log(`Status: ${data.status}`);
            console.log(`Error: ${data.error_message}`);
            return false;
        }
    } catch (error) {
        console.log(`❌ Error testing ${type} API Key for ${domain.name}:`, error.message);
        return false;
    }
}

async function runValidations() {
    console.log('🔍 Starting API validations across all domains...\n');

    const apisToValidate = [
        { key: process.env.GOOGLE_MAPS_API_KEY, name: 'General Google Maps' },
        { key: process.env.GOOGLE_MAPS_API_KEY_WEB, name: 'Web Google Maps' }
    ];

    for (const api of apisToValidate) {
        console.log(`\n📝 Testing ${api.name}:`);
        for (const domain of DOMAINS_TO_TEST) {
            await validateGoogleMapsAPI(api.key, api.name, domain);
        }
    }

    console.log('\n✨ Validation complete!');
}

// Add error handling for the main execution
runValidations().catch(error => {
    console.error('❌ Validation script failed:', error);
    process.exit(1);
});