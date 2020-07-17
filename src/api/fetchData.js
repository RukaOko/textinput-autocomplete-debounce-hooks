import Russia from './Russia';



export const searchRegions = async (searchStr, limit = 5) => {

    const listRegions = [];
    searchStr = searchStr.toLowerCase();

    for (const region of Russia.areas) {
        if (region.name.toLowerCase().includes(searchStr)) {
            const { id, name } = region;
            listRegions.push({ id, name });
            if (listRegions.length === limit) {
                break;
            }
        }
    }
    const promise = new Promise((res, rej) => {
        setTimeout(() => res('finished'), 500);
    });
    await promise;
    return listRegions;
}

export const searchCities = async (id) => {

    const region = Russia.areas.find(region => region.id === id);
    const promise = new Promise((res, rej) => {
        setTimeout(() => res('finished'), 500);
    });
    await promise;
    return region.areas.map(city => city.name);
}
 /*
export default async function fetchData (url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            try {
                const data = await response.json();
                return data;
            } catch(e) {
                console.log('json', e);
                return null;
            }
        } else {
            const e = await response.text();
            console.log('response.ok', e);
            return null;
        }
    } catch(e) {
        console.log('fetch', e);
        return null;
    }
}
*/