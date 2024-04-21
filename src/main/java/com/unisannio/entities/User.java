package com.unisannio.entities;

import javax.persistence.*;

@Entity
@Table(name="user")
public class User {
    
    @Id
    @GeneratedValue
    private long id;
    @Column(unique=true)
    private String username;
    private String name;
    private String lastName;
    private int age;
    @Column(unique=true)
    private String email;
    private String role; // user or admin
    private String password;
    @Transient // property not stored in table
    private String passwordConfirm;

    public User(String username, String name, String lastName) {
        super();
        this.username = username;
        this.name = name;
        this.lastName = lastName;
    }

    public User() {}

    public long getId() { return id; }
    protected void setId(long id) { this.id = id; }
    public String getUsername() { return username; }
    protected void setUsername(String username) { this.username = username; }
    public String getName() { return name; }
    protected void setName(String name) { this.name = name; }
    public String getLastName() { return lastName; }
    protected void setLastName(String lastName) { this.lastName = lastName; }
    public int getAge() { return age; }
    protected void setAge(int age) { this.age = age; }
    public String getEmail() { return email; }
    protected void setEmail(String email) { this.email = email; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getPasswordConfirm() { return passwordConfirm; }
    protected void setPasswordConfirm(String passwordConfirm) { this.passwordConfirm = passwordConfirm; }

}
