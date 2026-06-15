const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// `app.use(cors())` ang papatay sa CORS error ng website mo!
app.use(cors());
app.use(express.json());

// Ito ang bagong API URL na tatawagin ng website mo
app.get('/search-roblox', async (req, res) => {
    const username = req.query.username;
    
    if (!username) {
        return res.status(400).json({ error: "Missing username parameter" });
    }

    try {
        // Ang server mo ngayon ang tatawag sa totoong Roblox API
        const robloxResponse = await fetch(`https://users.roblox.com/v1/users/search?keyword=${username}&limit=10`);
        const data = await robloxResponse.json();
        
        // Ibabalik ng server mo ang data sa website mo nang ligtas
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch from Roblox API" });
    }
});

app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
