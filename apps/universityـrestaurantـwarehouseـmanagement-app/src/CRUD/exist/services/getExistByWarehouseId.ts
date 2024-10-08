import { pool } from "../../../db"

export const getExistByWarehouseId = (req, res) => {
    const warehouse_id = parseInt(req.params.warehouse_id)
  
    pool.query('SELECT e.warehouse_id, w.name AS warehouse_name, e.item_id, i.name AS item_name, e.amount, i.unit, i.price AS price_per_unit, i.price * e.amount AS total_price, i.type FROM exist e INNER JOIN warehouse w ON e.warehouse_id = w.id INNER JOIN warehouse_item i ON e.item_id = i.id WHERE warehouse_id = $1', [warehouse_id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
  }

module.exports = {getExistByWarehouseId}

// INSERT INTO warehouse (name, address, manager_name, manager_id, manager_phone_number) 
//    VALUES ('warehouse 1', 'Hamedan', 'ali alavi', '12345', '09181112222');

//    INSERT INTO restuarant (name, type, address, capacity, number_of_staff, manager_name, manager_id, manager_phone_number, supplier_warehouse_id) 
//    VALUES ('centeral restruarant', 'type 1', 'Bu ali sina university - 16 azar street', 500, 30, 'ahmad ahmadi', 
//     '16789', '09181113333', 1);

// value={userName}
// required
// onChange={(e) => setUserName(e.target.value)}


// - dateInput
// - searchable