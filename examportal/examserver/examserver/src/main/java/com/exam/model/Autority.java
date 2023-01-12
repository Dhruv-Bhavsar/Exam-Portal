package com.exam.model;

import org.springframework.security.core.GrantedAuthority;

public class Autority implements GrantedAuthority {

    private String authority;

    public Autority(String authority) {
        this.authority = authority;
    }

    @Override
    public String getAuthority() {
        return this.authority;
    }
}
