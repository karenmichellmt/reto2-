package usa.edu.co.reto2.repositorys;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import usa.edu.co.reto2.model.Chocolate;
import usa.edu.co.reto2.repository.crud.InterfaceChocolate;

/**
 *
 * @author karen
 */
@Repository
public class ChocolateRepository {
    @Autowired
    private InterfaceChocolate repository;

    public List<Chocolate> getAll() {
        return repository.findAll();
    }
    public Optional<Chocolate> getClothe(String reference) {
        return repository.findById(reference);
    }
    
    public Chocolate create(Chocolate clothe) {
        return repository.save(clothe);
    }

    public void update(Chocolate clothe) {
        repository.save(clothe);
    }
    
    public void delete(Chocolate clothe) {
        repository.delete(clothe);
    }
}
