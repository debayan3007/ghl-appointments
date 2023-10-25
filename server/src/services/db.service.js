const db = require('../configs/db.config');

function addData(collection, path, id, doc) {
    const docRef = db.collection(collection).doc(path);
    return docRef.set({
        ...doc,
        id,
    });
}

async function readData(collection, path) {
    const allEvents = await db.collection(collection).get();

    const docs = [];
    allEvents.forEach((doc) => {
        docs.push({
            documentPath: doc.id,
            ...doc.data(),
        });
    });
    return docs;
}

// TODO: has to be merged with readData
async function readSingleData(collection, path) {
    const allEvents = await db.collection(collection).doc(path).get();
    return allEvents;
}

module.exports = {
    addData,
    readData,
    readSingleData,
}; 
