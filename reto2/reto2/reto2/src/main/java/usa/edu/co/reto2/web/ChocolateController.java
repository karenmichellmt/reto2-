package usa.edu.co.reto2.web;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import usa.edu.co.reto2.model.Chocolate;
import usa.edu.co.reto2.service.ChocolateService;

/**
 *
 * @author karen
 */
@RestController
@RequestMapping("/api/chocolate")
@CrossOrigin("*")
public class ChocolateController {
    
    @Autowired
    private ChocolateService chocolateService;

    @GetMapping("/all")
    public List<Chocolate> getAll() {
        return chocolateService.getAll();
    }
    
    @GetMapping("/{reference}")
    public Optional<Chocolate> getClothe(@PathVariable("reference") String reference) {
        return chocolateService.getClothe(reference);
    }

    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)
    public Chocolate create(@RequestBody Chocolate producto) {
        return chocolateService.create(producto);
    }
    
    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Chocolate update(@RequestBody Chocolate producto) {
        return chocolateService.update(producto);
    }

    @DeleteMapping("/{reference}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("reference") String reference) {
        return chocolateService.delete(reference);
    }
  
}
