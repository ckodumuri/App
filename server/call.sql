SELECT m.name, m.is_generic, c.restrictions
      FROM medications AS m 
          JOIN coverages AS c ON m.id = c.medication_id
          JOIN insurances AS i ON i.id = c.insurance_id
      
      WHERE 
          m.type = 'ICS' AND
          i.name = 'Anthem' AND 
          i.plan = 'Healthy Indiana Plan Plus'