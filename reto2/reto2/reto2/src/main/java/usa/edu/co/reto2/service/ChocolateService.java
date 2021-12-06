package usa.edu.co.reto2.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import usa.edu.co.reto2.model.Chocolate;
import usa.edu.co.reto2.repositorys.ChocolateRepository;

/**
 *
 * @author karen
 */
@Service
public class ChocolateService {
    
    @Autowired
    private ChocolateRepository repository;

    public List<Chocolate> getAll() {
        return repository.getAll();
    }

    public Optional<Chocolate> getClothe(String reference) {
        return repository.getClothe(reference);
    }

    public Chocolate create(Chocolate accesory) {
        if (accesory.getReference() == null) {
            return accesory;
        } else {
            return repository.create(accesory);
        }
    }

    public Chocolate update(Chocolate accesory) {

        if (accesory.getReference() != null) {
            Optional<Chocolate> accesoryDb = repository.getClothe(accesory.getReference());
            if (!accesoryDb.isEmpty()) {
                
                if (accesory.getReference()!= null) {
                    accesoryDb.get().setReference(accesory.getReference());
                }
                
                if (accesory.getCategory() != null) {
                    accesoryDb.get().setCategory(accesory.getCategory());
                }
                
                if (accesory.getDescription() != null) {
                    accesoryDb.get().setDescription(accesory.getDescription());
                }
                if (accesory.getPrice() != 0.0) {
                    accesoryDb.get().setPrice(accesory.getPrice());
                }
                if (accesory.getQuantity() != 0) {
                    accesoryDb.get().setQuantity(accesory.getQuantity());
                }
                if (accesory.getPhotography() != null) {
                    accesoryDb.get().setPhotography(accesory.getPhotography());
                }
                accesoryDb.get().setAvailability(accesory.isAvailability());
                repository.update(accesoryDb.get());
                return accesoryDb.get();
            } else {
                return accesory;
            }
        } else {
            return accesory;
        }
    }

    public boolean delete(String reference) {
        Boolean aBoolean = getClothe(reference).map(accesory -> {
            repository.delete(accesory);
            return true;
        }).orElse(false);
        return aBoolean;
    }

}