package com.group.libraryapp.service.user

import com.group.libraryapp.domain.user.User
import com.group.libraryapp.domain.user.UserRepository
import com.group.libraryapp.dto.user.request.UserCreateRequest
import com.group.libraryapp.dto.user.request.UserUpdateRequest
import org.assertj.core.api.AssertionsForInterfaceTypes.assertThat
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest

@SpringBootTest
class UserServiceTest @Autowired constructor(
    private val userRepository: UserRepository,
    private val userService: UserService
) {

    @AfterEach
    fun clean() {
        userRepository.deleteAll()
    }


    @Test
    @DisplayName("유저 저장이 정상 동작")
    fun saveUserTest() {
        //given
        val request = UserCreateRequest("김성안", null)

        //when
        userService.saveUser(request)

        //then
        val result = userRepository.findAll()
        assertThat(result).hasSize(1)
        assertThat(result[0].name).isEqualTo("김성안")
        assertThat(result[0].age).isNull()
    }

    @Test
    @DisplayName("유저 조회가 정상 동작")
    fun getUsersTest() {
        //given
        userRepository.saveAll(listOf(
            User("A", 28),
            User("B", null),
        ))
        //when
        val results = userService.getUsers()

        //then
        assertThat(results).hasSize(2)  // [UserResponse(), UserResponse()]
        assertThat(results).extracting("name").containsExactlyInAnyOrder("A","B") // ["A","B"]
        assertThat(results).extracting("age").containsExactlyInAnyOrder(28, null)
    }

    @Test
    @DisplayName("유저 수정이 정상 동작")
    fun updateUserNameTest() {
        //given
        val savedUser = userRepository.save(User("A", null))
        val request = UserUpdateRequest(savedUser.id!!, "B") // id는 한번 저장된 뒤는 null일 될 수 없으므로  !! 처리

        //when
        userService.updateUserName(request)

        //then
        val result = userRepository.findAll()[0]
        assertThat(result).extracting("name").isEqualTo("B")
    }

    @Test
    @DisplayName("유저 삭제가 정상 동작")
    fun deleteUserTest() {
        //given
        userRepository.save(User("A", null))

        //when
        userService.deleteUser("A")

        //then
        assertThat(userRepository.findAll()).isEmpty()
    }

}