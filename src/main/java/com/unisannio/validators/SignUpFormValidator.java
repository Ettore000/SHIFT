package com.unisannio.validators;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

import com.unisannio.entities.User;
import com.unisannio.services.UsersService;

@Component
public class SignUpFormValidator implements Validator {

    @Autowired
    private UsersService usersService;

    @Override
    public boolean supports(@NonNull Class<?> clazz) {
        return User.class.equals(clazz);
    }

    @Override
    public void validate(@NonNull Object target, @NonNull Errors errors) {
        User user = (User) target;
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "username", "Error.username.empty");
        if (user.getUsername().length() < 8 || user.getUsername().length() > 16)
            errors.rejectValue("username", "Error.signup.username.length");
        if (usersService.getUserByUsername(user.getUsername()) != null)
            errors.rejectValue("username", "Error.signup.username.duplicate");
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "email", "Error.email.empty");
        if (!isValidEmailAddress(user.getEmail()))
            errors.rejectValue("email", "Error.signup.email.invalid");
        if (user.getName().length() < 5 || user.getName().length() > 24)
            errors.rejectValue("name", "Error.signup.name.length");
        if (user.getAge() < 0 || user.getAge() > 100)
            errors.rejectValue("age", "Error.signup.age.invalid");
        if (user.getPassword().length() < 8 || user.getPassword().length() > 16)
            errors.rejectValue("password", "Error.signup.password.length");
        if (!user.getPasswordConfirm().equals(user.getPassword()))
            errors.rejectValue("passwordConfirm", "Error.signup.passwordConfirm.coincidence");
    }
    
    private boolean isValidEmailAddress(String email) {
        String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
        return email.matches(emailRegex);
    }
    
}
