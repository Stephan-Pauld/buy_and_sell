const addToFavourites = (db, userId, itemId) => {
  queryParams = [
    userId,
    itemId,
  ]
  queryString = `
  INSERT INTO user_favourites (user_id, item_id)
  VALUES
  ($1, $2)
  RETURNING *;
  `;
  return db.query(queryString, queryParams);
};

const deleteFavourites = (db, userId, itemId) => {
  queryParams = [
    userId,
    itemId,
  ]
  queryString = `
  DELETE FROM user_favourites
  WHERE user_id = $1 AND item_id = $2;`;
  return db.query(queryString, queryParams);
};

// Check to see if someone has already liked and item and IF they have then unlike else Like and add to favs
const hasLiked = (db, userId, itemId) => {

  queryParams = [
    userId,
    itemId,
  ]
  queryString = `SELECT * FROM user_favourites WHERE user_id = $1 AND item_id = $2;`;
  return db.query(queryString, queryParams);
};


module.exports = {
  hasLiked,
  addToFavourites,
  deleteFavourites,
}