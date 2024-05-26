import pool from "../ultis/pgDB";
export async function fetchDatafromDB(){
    try {
        const client = await pool.connect();
        console.log('Connected to database');
        const res = await client.query('SELECT * FROM flight');
        client.release()
        return res.rows
    } catch(error){
        console.log("error fetching data from DB:", error);
        throw error
    }
}

export async function fetchLocation(){
    try{
        const client = await pool.connect();
        console.log('Connected to database');
        const res = await client.query('select location.locationid,location.city,location.country,airport.name from location join airport on location.locationid = airport.locationid');
        client.release();
        return res.rows
    }catch(error){
        console.log("error fetching data from DB:", error);
        throw error
    }
}