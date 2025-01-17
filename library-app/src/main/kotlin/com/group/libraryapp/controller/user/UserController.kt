package com.group.libraryapp.controller.user

import com.group.libraryapp.dto.user.request.UserCreateRequest
import com.group.libraryapp.dto.user.request.UserUpdateRequest
import com.group.libraryapp.dto.user.response.UserLoanHistoryResponse
import com.group.libraryapp.dto.user.response.UserResponse
import com.group.libraryapp.service.user.UserService
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@CrossOrigin(origins = ["*"])
class UserController(
    private val userService: UserService,
) {
//    @GetMapping(value = ["/user/loan", "/user/register", "/user/list", "/history"])
//    fun index(): String {
//        return "forward:/static/v4/index.html"
//    }

    @PostMapping("/user")
    fun saveUser(@RequestBody request: UserCreateRequest) {
        userService.saveUser(request)
    }

    @GetMapping("/user")
    fun getUsers():List<UserResponse> {
        return userService.getUsers()
    }

    @PutMapping("/user")
    fun upfateUser(@RequestBody request: UserUpdateRequest) {
        userService.updateUserName(request)
    }

    @DeleteMapping("/user")
    fun deleteUser(@RequestParam name: String) {
        userService.deleteUser(name)
    }

    @GetMapping("/user/loan")
    fun getUserLoanHistories():List<UserLoanHistoryResponse> {
        return userService.getUserLoanHistories()
    }

}