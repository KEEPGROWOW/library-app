package com.group.libraryapp.service.book

import com.group.libraryapp.domain.book.Book
import com.group.libraryapp.domain.book.BookRepository
import com.group.libraryapp.domain.user.User
import com.group.libraryapp.domain.user.UserRepository
import com.group.libraryapp.domain.user.loanhistory.UserLoanHistory
import com.group.libraryapp.domain.user.loanhistory.UserLoanHistoryRepository
import com.group.libraryapp.dto.book.request.BookLoanRequest
import com.group.libraryapp.dto.book.request.BookRequest
import com.group.libraryapp.dto.book.request.BookReturnRequest
import org.assertj.core.api.AssertionsForInterfaceTypes.assertThat
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest

@SpringBootTest
class BookSeviceTest @Autowired constructor(
    private val bookService: BookService,
    private val bookRepository: BookRepository,
    private val userRepository: UserRepository,
    private val userLoanHistoryRepository: UserLoanHistoryRepository,
){

    @AfterEach
    fun clean() {
        bookRepository.deleteAll()
        userRepository.deleteAll()
    }

    @Test
    @DisplayName("책 등록이 정상동작")
    fun saveBookTest() {
        //given
        val request = BookRequest("이상한 나라")

        //when
        bookService.saveBook(request)

        //then
        val result = bookRepository.findAll()
        assertThat(result).hasSize(1)
        assertThat(result[0]).extracting("name").isEqualTo("이상한 나라")
    }
    // 내가 작성한 TEST 코드
    // test코드를 짤 떄, 기능의 케이스별로 나누는것이 좋은가?
    // 아니면, 기능별로 나누는 것이 좋은가?
    // => 회사,부서에 따라 코드가 어떻게 짜여져있는가에 따라 판단하는것이 좋을까?
    @Test
    @DisplayName("책 대출이 정상동작")
    fun loanBookTest() {
        //given
        // 책생성
        bookRepository.saveAll(
            listOf(
                Book("이상한 나라"),
                Book("앨리스")
            )
        )
        // 유저생성
        userRepository.saveAll(listOf(
                User("A", 28),
                User("B",null)
            )
        )

        //when
        // 1. 대출이 잘 될떄 / 대출 가능한 책을 비릴때
        // 2. 대출이 안 될때 / 이미 대출이 된 책 빌릴떄
        val loanRequest = BookLoanRequest("A","이상한 나라")
        bookService.loanBook(loanRequest)

        //then
        // 1. 대출이 잘 될떄 / 대출 가능한 책을 빌릴 때
        val results = userLoanHistoryRepository.findAll()
        assertThat(results).hasSize(1)
        assertThat(results[0].user.name).isEqualTo("A")
        assertThat(results[0].bookName).isEqualTo("이상한 나라")
        assertThat(results[0].isReturn).isFalse


        // 2. 대출이 안 될때 / 이미 대출이 된 책 빌릴 떄
        val loanRequest2 = BookLoanRequest("B","이상한 나라")

        try {
            bookService.loanBook(loanRequest2)
        } catch (e: IllegalArgumentException) {
            //테스트 성공
            assertThat(e.message).isEqualTo("진작 대출되어 있는 책입니다")
        }
    }

    // 강사님 TEST 코드 => 기능의 케이스 별로 나눔
    @Test
    @DisplayName("대출된 책은 대출 실패한다")
    fun loanBookFailTest() {
        //given
        bookRepository.save(Book("이상한 나라"))
        val savedUser = userRepository.save(User("A",null))
        userLoanHistoryRepository.save(UserLoanHistory(savedUser,"이상한 나라",false))
        val request = BookLoanRequest("A","이상한 나라")

        //when & then
        assertThrows<IllegalArgumentException> {
            bookService.loanBook(request)
        }.apply {
            assertThat(message).isEqualTo("진작 대출되어 있는 책입니다")
        }
    }

    @Test
    @DisplayName("책 반납이 정상 작동한다")
    fun returnBookTest() {
        //given
        bookRepository.save(Book("이상한 나라"))
        val savedUser = userRepository.save(User("A", null))
        userLoanHistoryRepository.save(UserLoanHistory(savedUser,"이상한 나라",false))
        val bookReturnRequest = BookReturnRequest("A","이상한 나라")

        //when
        bookService.returnBook(bookReturnRequest)

        //then
        val results = userLoanHistoryRepository.findAll()
        assertThat(results).hasSize(1)
        assertThat(results[0].user.name).isEqualTo("A")
        assertThat(results[0].bookName).isEqualTo("이상한 나라")
        assertThat((results[0].isReturn)).isTrue


    }


}