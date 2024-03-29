package com.example.PFE.Back.Repo;

import com.example.PFE.Back.Model.CommandeLine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface CommandeLineRepo  extends JpaRepository<CommandeLine,Long> {
}
