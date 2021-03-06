
// queries.js 
// fix this so that we can actually use it in index.js
class DatabaseQueries {
  connection;

  constructor(connection) { this.connection = connection; }

  getMedicationsByTypeAndInsurance (type, insurance, plan) {
    const sql = `SELECT m.name 
    FROM medications AS m 
        JOIN coverages AS c ON m.id = c.medication_id
        JOIN insurances AS i on i.id = c.medication_id
    
    WHERE 
        m.type = ${type} AND
        i.name = ${insurance} AND 
        i.plan = ${plan}
      `;

      return new Promise((resolve, reject) => {
          this.connection.connect(err => {
              if (err) reject(err);
                  this.connection.query(sql, (err, result, fields) => {
              if (err) reject(err);
                  resolve(result);
        });
      });
    });
  }
}

module.exports = DatabaseQueries;
