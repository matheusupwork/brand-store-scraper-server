
async function fetchProductCategories() {
    const raw = JSON.stringify({
        "params": {
            "categoryIds": "",
            "subCategoryIds": "",
            "clientId": "chomps",
            "level": 2
        }
    });
    const requestOptions = {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: raw,
        redirect: "follow"
    };

    try {
        const response = await fetch("https://hlc7l6v5w6.execute-api.us-west-2.amazonaws.com/prod/productCategories", requestOptions);
        if (response.status !== 200) throw new Error(`${response.status} ${response.statusText}`);
        return response.json();
    } catch (error) {
        throw error;
    }
}

async function fetchStores({ products, latitude, longitude }) {
    const raw = JSON.stringify({
        "params": {
            "distance": 25,
            "products": products,
            "latitude": latitude,
            "longitude": longitude,
            "client": "chomps",
            "maxStores": 25,
            "textStyleBm": "RESPECTCASINGPASSED"
        }
    });
    const requestOptions = {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: raw,
        redirect: "follow"
    };

    try {
        const response = await fetch("https://hlc7l6v5w6.execute-api.us-west-2.amazonaws.com/prod/knox", requestOptions);
        if (response.status !== 200) throw new Error(`${response.status} ${response.statusText}`);
        return response.json();
    } catch (error) {
        throw error;
    }
}

export async function getStores({ latitude, longitude }) {
    try {
        const { categories } = await fetchProductCategories();
        const products = categories[0].subCategories[0].products.map(p => p.pID);
        const { data } = await fetchStores({ products, latitude, longitude });
        return { stores: data.map(s => ({ id: s.id, name: s.name, address: s.address, city: s.city, state: s.state, postalCode: s.postalCode, phone: s.phone })) };
    } catch (error) {
        throw error;
    }
}