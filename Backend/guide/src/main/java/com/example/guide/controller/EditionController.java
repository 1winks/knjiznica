package com.example.guide.controller;

import com.example.guide.domain.Edition;
import com.example.guide.dto.EditionDTO;
import com.example.guide.dto.EditionDTO2;
import com.example.guide.service.EditionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@CrossOrigin
@RequestMapping("/api/resources/editions")
public class EditionController {
    @Autowired
    private EditionService editionService;

    @GetMapping("")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public List<Edition> listEditions(){
        return editionService.listAll();
    }

    @GetMapping("available")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public List<EditionDTO2> listAvailableEditions(){
        return editionService.listAllAvailable();
    }

    @PostMapping("/editionsByIds")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public List<EditionDTO2> listEditionsByIds(@RequestBody Set<Long> ids){
        return editionService.listByIds(ids);
    }

    @GetMapping("/{editionId}")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public Edition findEdition(@PathVariable Long editionId){
        return editionService.getEditionById(editionId);
    }

    @PostMapping("/add")
    @PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
    public Edition createEdition(@RequestBody EditionDTO editionDTO) {
        return editionService.createEdition(editionDTO);
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
    public Edition updateEdition(@PathVariable Long id, @RequestBody EditionDTO editionDTO) {
        return editionService.updateEdition(id, editionDTO);
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
    public void deleteEdition(@PathVariable Long id) {
        editionService.deleteEdition(id);
    }
}
