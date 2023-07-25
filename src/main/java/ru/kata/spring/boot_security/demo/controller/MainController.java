package ru.kata.spring.boot_security.demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import ru.kata.spring.boot_security.demo.entities.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.security.Principal;
import java.util.Collection;
import java.util.List;

@Controller
public class MainController {

    private UserService userService;

    public MainController(UserService userService) {
        this.userService = userService;
    }

    @ResponseBody
    @GetMapping("/admin/getAllUsers")
    public Collection<User> getAllUsers() {
        return userService.allUsers();
    }

    @ResponseBody
    @GetMapping("/admin/getUser{id}")
    public User getUser(@PathVariable int id) {
        return userService.findById(id).get();
    }

    @GetMapping("/user")
    public String userPage(Principal principal, Model model) {

        User user = userService.findByUsername(principal.getName());
        model.addAttribute("user", user);
        return "user";


    }

    @GetMapping("/admin")
    public String adminPage(Principal principal, Model model) {

        User admin = userService.findByUsername(principal.getName());
        model.addAttribute("admin", admin);

        List<User> users = userService.findAll();
        model.addAttribute("users", users);
        return "admin";
    }

    @ResponseBody
    @PostMapping("admin/create")
    public long create(@RequestBody User newUser) {

        userService.save(newUser);
        long id = userService.findByUsername(newUser.getUsername()).getId();
        return id;
    }

    @ResponseBody
    @PatchMapping("admin/edit")
    public ResponseEntity<HttpStatus> update(@RequestBody User updatedUser) {

        userService.update(updatedUser.getId(), updatedUser);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @ResponseBody
    @PatchMapping("admin/delete/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable long id) {

        userService.deleteById(id);
        return ResponseEntity.ok(HttpStatus.OK);
    }

}
