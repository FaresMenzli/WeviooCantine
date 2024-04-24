package com.example.PFE.Back.Repo;

import com.example.PFE.Back.Model.CommandeLine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.Date;
import java.util.List;

public interface CommandeLineRepo  extends JpaRepository<CommandeLine,Long> {

   List<CommandeLine> findByCommandeLineDateBetween(Date startDate, Date endDate);

}
