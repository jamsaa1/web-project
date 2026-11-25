
import { 
    addList,
    addListItem,
    getList,
    updateList,
    deleteList
} from "../models/listModel";

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
export async function addListItem(req, res) {
    const { id } = req.params;
    const { movieId } = req.body;

    await addListItem(id, movieId);

    res.status(201).json({
        message: "elokuva lisätty"
    });
};

// get; hae julkista listaa
export async function getList(req, res) {

};

// put; muokkaa ja päivitä listaa
export async function updateList(req, res) {
  
};

// delete; poista lista
export async function deleteList(req, res) {
  
};

// delete; poista elokuva listalta, item on elokuva
export async function deleteListItem(req, res) {
    
};
