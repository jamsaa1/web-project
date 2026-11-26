
import { 
    addList,
    addListItem,
    getList,
    updateList,
    deleteList,
    deleteListItem
} from "../models/listModel.js";

// post; luo uusi lista
export async function createList(req, res) {
    const { listId, userId, name, isPublic,  } = req.body;

    if (!name) {
        return res.status(400).json({ error: "listan nimi puuttuu" }); 
    }

    const list = await addList(
        listId,
        userId,
        name,
        isPublic
    );

    res.status(201).json(list);
};

// post; lisää elokuva listalle, item on elokuva
export async function addMovieToList(req, res) {
    const { id } = req.params;
    const { movieId } = req.body;

    await addListItem(id, movieId);

    res.status(201).json({
        message: "elokuva lisätty"
    });
};

// get; hae julkista listaa
export async function findList(req, res) {
    getList;
};

// put; muokkaa ja päivitä listaa
export async function editList(req, res) {
    updateList;
};

// delete; poista lista
export async function removeList(req, res) {    
    deleteList;
};

// delete; poista elokuva listalta, item on elokuva
export async function removeListItem(req, res) {
    deleteListItem;
};

