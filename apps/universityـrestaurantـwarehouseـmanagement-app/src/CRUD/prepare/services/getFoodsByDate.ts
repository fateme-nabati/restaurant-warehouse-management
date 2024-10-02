import { pool } from '../../../db';

export const getFoodsByDate = (req, res) => {
  const restaurant_id = parseInt(req.params.restaurant_id);

  pool.query(
    `SELECT date, jsonb_agg(jsonb_build_object('id', f.id, 'name', f.name)) AS foods  FROM prepare p JOIN food f ON p.food_id = f.id WHERE p.restaurant_id = $1 GROUP BY date ORDER BY date;`,
    [restaurant_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      console.log(results.rows);
      results.rows.map((row) => {
        const originalDate = new Date(row.date);
        originalDate.setDate(originalDate.getDate() + 1);
        row.date = originalDate.toISOString().split('T')[0];
      });
      const foodsByDate = results.rows.map((row) => ({
        date: row.date,
        foods: row.foods,
      }));

      res.status(200).json(foodsByDate);
    }
  );
};

module.exports = { getFoodsByDate };

// 'meal', p.meal, 'reserved_no', p.reserved_no, 'bought_daily_no', p.bought_daily_no, 'cooked_no', p.cooked_no, 'delivered_no', p.delivered_no
