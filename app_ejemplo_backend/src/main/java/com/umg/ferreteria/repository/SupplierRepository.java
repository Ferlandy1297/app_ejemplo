package com.umg.ferreteria.repository;

import com.umg.ferreteria.model.Supplier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SupplierRepository extends JpaRepository<Supplier, String> {

    @Query("SELECT s FROM Supplier s WHERE " +
           "LOWER(s.companyName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(s.nit) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(s.contactName) LIKE LOWER(CONCAT('%', :query, '%'))")
    Page<Supplier> searchSuppliers(@Param("query") String query, Pageable pageable);
}
