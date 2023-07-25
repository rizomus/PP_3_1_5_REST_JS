package ru.kata.spring.boot_security.demo.entities;

import lombok.Data;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.Entity;

@Entity
@Data
@Table(name = "roles")
public class Role implements GrantedAuthority {
    @Id
    private String name;

    public Role() {
    }

    public Role(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    @Override
    public String toString() {
        if (this.name == null) return null;
        return this.name.startsWith("ROLE_") ? this.name.substring(5) : this.name;
    }

    @Override
    public String getAuthority() {
        return this.name;
    }
}