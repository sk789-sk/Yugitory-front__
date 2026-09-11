import * as SQLite from 'expo-sqlite';


export async function initializeDatabase(){

    const db = await SQLite.openDatabaseAsync('yugiInventory.db');

    await db.execAsync(`CREATE TABLE IF NOT EXISTS releaseSet (
        id INTEGER PRIMARY KEY,
        name TEXT,
        releaseDate TEXT,
        card_count TEXT,
        set_code TEXT,
        set_type TEXT,
        language TEXT,
        sub_category TEXT
        )`)
    await db.execAsync(`CREATE TABLE IF NOT EXISTS card (
        id INTEGER PRIMARY KEY,
        yg_pro_id TEXT, 
        name TEXT,
        description TEXT,
        attack INTEGER,
        defense INTEGER,
        level INTEGER,
        isEffect BOOLEAN,
        isTuner BOOLEAN,
        isFlip BOOLEAN,
        isSpirit BOOLEAN,
        isUnion BOOLEAN,
        isGemini BOOLEAN,
        isPendulum BOOLEAN,
        isRitual BOOLEAN,
        isToon BOOLEAN,
        isFusion BOOLEAN,
        isSynchro BOOLEAN,
        isXYZ BOOLEAN,
        isLink BOOLEAN,
        card_type TEXT,
        card_race TEXT,
        card_attribute TEXT,
        LegalDate TEXT,
        card_image TEXT,
        frameType TEXT,
        hasAltArt BOOLEAN,
        release_set_name TEXT,  
        k_index INTEGER,
        passcode TEXT
        )`)

    await db.execAsync(`CREATE TABLE IF NOT EXISTS cardinSet (
        id INTEGER PRIMARY KEY,
        card_code TEXT,
        rarity TEXT,
        secondary_id TEXT,
        additional_display_text TEXT,
        set_id INTEGER NOT NULL REFERENCES releaseSet(id),
        card_id INTEGER NOT NULL REFERENCES card(id)
        )`)

// alt_art_id REFERENCES altart(id),    
    await db.execAsync(`CREATE TABLE IF NOT EXISTS inventory (
        id INTEGER PRIMARY KEY,
        quantity INTEGER,
        isFirstEd BOOLEAN,
        created_at TEXT, 
        updated_at TEXT,
        cardinSet_id INTEGER NOT NULL REFERENCES cardinSet(id),
        language TEXT
        )`)
//ReleaseSetName should be turned into first release set id. 

        // store date as text and use the date time fuctions make sure it syncs up with the server db


    

    
        // await db.execAsync()


}