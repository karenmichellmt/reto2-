package usa.edu.co.reto2.repository.crud;

import org.springframework.data.mongodb.repository.MongoRepository;
import usa.edu.co.reto2.model.Chocolate;


/**
 *
 * @author karen
 */
public interface InterfaceChocolate extends MongoRepository<Chocolate, String>{
    
}
