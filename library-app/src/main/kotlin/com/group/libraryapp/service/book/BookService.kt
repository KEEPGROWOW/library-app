package com.group.libraryapp.service.book

import com.group.libraryapp.domain.book.Book
import com.group.libraryapp.domain.book.BookRepository
import com.group.libraryapp.domain.user.UserRepository
import com.group.libraryapp.domain.user.loanhistory.UserLoanHistoryRepository
import com.group.libraryapp.dto.book.request.BookLoanRequest
import com.group.libraryapp.dto.book.request.BookRequest
import com.group.libraryapp.dto.book.request.BookReturnRequest
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class BookService(
    private val bookRepository: BookRepository,
    private val userRepository: UserRepository,
    private val userLoanHistoryRepository: UserLoanHistoryRepository,
) {

    @Transactional
    fun saveBook(request: BookRequest) {
        val newBook = Book(request.name,null)
        bookRepository.save(newBook)
    }

    @Transactional
    fun loanBook(request: BookLoanRequest) {
        val loanBook = bookRepository.findByName(request.bookName).orElseThrow(::IllegalArgumentException)   // 도서의 등록 여부
        if (userLoanHistoryRepository.findByBookNameAndIsReturn(request.bookName, false) != null) {   // 나의 대여기록에서 반납불가가 조회되지 않는게 아니라면, => false 기록이 존재한다면
            throw IllegalArgumentException("진작 대출되어 있는 책입니다")
        }

        val loanUser = userRepository.findByName(request.userName).orElseThrow(::IllegalArgumentException)
        loanUser.loanBook(loanBook)

    }

    @Transactional
    fun returnBook(request: BookReturnRequest) {
        val returnUser = userRepository.findByName(request.userName).orElseThrow(::IllegalArgumentException)
        returnUser.returnBook(request.bookName)
    }




}