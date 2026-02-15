const http = require('http');

const options = {
    hostname: 'cosylab.iiitd.edu.in',
    port: 6969,
    path: '/recipe2-api/search-recipe/2800',
    method: 'GET',
    headers: {
        'Authorization': 'Bearer 4XqTpXTJYrk6m02mrMZOwnFspFIbl0WWim1fT2q-WxeO7TCn'
    }
};

const req = http.request(options, res => {
    let data = '';
    res.on('data', chunk => {
        data += chunk;
    });
    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            console.log("Keys in detailData:", Object.keys(json));
            if (json.recipe) {
                console.log("Keys in recipe:", Object.keys(json.recipe));
                console.log("Processes:", json.recipe.Processes);

                // Check for potential instruction fields
                const potentialinstructionFields = Object.keys(json.recipe).filter(k =>
                    k.toLowerCase().includes('step') ||
                    k.toLowerCase().includes('instruction') ||
                    k.toLowerCase().includes('direction') ||
                    k.toLowerCase().includes('method') ||
                    k.toLowerCase().includes('desc')
                );
                console.log("Potential instruction fields:", potentialinstructionFields);
                potentialinstructionFields.forEach(f => {
                    let val = json.recipe[f];
                    if (typeof val === 'string' && val.length > 200) val = val.substring(0, 200) + '...';
                    console.log(`${f}:`, val);
                });
            }
        } catch (e) {
            console.error("Error parsing JSON:", e.message);
            console.log("Raw data:", data.substring(0, 500));
        }
    });
});

req.on('error', error => {
    console.error("Request error:", error);
});

req.end();
