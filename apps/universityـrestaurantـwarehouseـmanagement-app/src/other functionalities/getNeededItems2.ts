import { pool } from "../db"
export const getNeededItems2 = async (req, res) => {
  
  const {food_id, number_of_food} = req.body; 

    // await pool.query('(SELECT f.name AS food_name, w.name AS item_name, SUM($1*i.amount) AS amount, i.unit FROM prepare p INNER JOIN ingredient i ON p.food_id = i.food_id INNER JOIN warehouse_item w ON i.item_id = w.id INNER JOIN food f ON p.food_id = f.id WHERE p.food_id = $2 GROUP BY f.name, w.name,i.unit) UNION (SELECT f.name, w.name AS item_name, SUM($1*h.amount) AS amount, h.unit FROM prepare p INNER JOIN have h ON p.food_id = h.food_id INNER JOIN warehouse_item w ON h.item_id = w.id INNER JOIN food f ON p.food_id = f.id WHERE p.food_id = $2 GROUP BY w.name, h.unit, f.name)', [number_of_food, food_id],(error, results) => {
     

  //     if (error) {
  //       throw error
  //     }
  //     res.status(200).json(results.rows)
  //   })
  // }
//  const query = `
//       SELECT 
//           f.name AS food_name, 
//           w.name AS item_name, 
//           SUM($1 * COALESCE(i.amount, 0) + $1 * COALESCE(h.amount, 0)) AS amount,
//           COALESCE(i.unit, h.unit) AS unit
//       FROM 
//           prepare p
//           INNER JOIN food f ON p.food_id = f.id
//           LEFT JOIN ingredient i ON p.food_id = i.food_id
//           LEFT JOIN have h ON p.food_id = h.food_id
//           LEFT JOIN warehouse_item w ON i.item_id = w.id OR h.item_id = w.id
//       WHERE 
//           p.food_id = $2
//       GROUP BY 
//           f.name, w.name, COALESCE(i.unit, h.unit)
//     `;
    const query = `
      SELECT 
          w.name AS item_name, 
          SUM($1 * i.amount) AS amount,
          w.unit AS unit
      FROM 
          prepare p
          INNER JOIN ingredient i ON p.food_id = i.food_id
          LEFT JOIN warehouse_item w ON i.item_id = w.id
      WHERE 
          p.food_id = $2
      GROUP BY 
          w.name, w.unit
    `;
    try {
      const results = await pool.query(query, [number_of_food, food_id]);
      res.status(200).json(results.rows);
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'An error occurred while fetching data' });
    }
  };
module.exports = { getNeededItems2 };