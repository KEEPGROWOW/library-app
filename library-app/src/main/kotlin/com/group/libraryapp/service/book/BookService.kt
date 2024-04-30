package com.group.libraryapp.service.book

import com.group.libraryapp.domain.book.Book
import com.group.libraryapp.domain.book.BookRepository
import com.group.libraryapp.domain.user.UserRepository
import com.group.libraryapp.domain.user.loanhistory.UserLoanHistoryRepository
import com.group.libraryapp.domain.user.loanhistory.UserLoanStatus
import com.group.libraryapp.dto.book.request.BookLoanRequest
import com.group.libraryapp.dto.book.request.BookRequest
import com.group.libraryapp.dto.book.request.BookReturnRequest
import com.group.libraryapp.dto.book.request.BookUpdateRequest
import com.group.libraryapp.dto.book.response.BookResponse
import com.group.libraryapp.dto.book.response.BookStatResponse
import com.group.libraryapp.util.fail
import com.group.libraryapp.util.findByIdOrThrow
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class BookService(
    private val bookRepository: BookRepository,
    private val userRepository: UserRepository,
    private val userLoanHistoryRepository: UserLoanHistoryRepository,
) {

    fun findMaxBookId(): Long {
        val maxIdBook = bookRepository.findFirstByOrderByIdDesc()
        return maxIdBook?.id ?: 1
    }

    @Transactional
    fun saveBook(request: BookRequest) {
//        val newBook = Book(name = request.name, type=request.type)
//        bookRepository.save(newBook)
        val maxId = findMaxBookId()
        // 새로운 Book 객체 생성 및 저장
        val newBook = Book(id = maxId + 1, name = request.name, type = request.type)
        bookRepository.save(newBook)
    }

    @Transactional(readOnly = true)
    fun getBooks(): List<BookResponse> {
        return bookRepository.findAll()
            .map { book -> BookResponse.of(book) }
    }

    @Transactional
    fun updateBook(request: BookUpdateRequest){
        val book = bookRepository.findByIdOrThrow(request.id)
        book.updateName(request.name)
    }

    @Transactional
    fun deleteBook(id:Long){
        bookRepository.deleteById(id)

    }
    @Transactional
    fun loanBook(request: BookLoanRequest) {
        val loanBook = bookRepository.findByName(request.bookName)?: fail()  // 도서의 등록 여부
        if (userLoanHistoryRepository.findByBookNameAndStatus(request.bookName, UserLoanStatus.LOANED) != null) {   // 나의 대여기록에서 반납불가가 조회되지 않는게 아니라면, => false 기록이 존재한다면
            throw IllegalArgumentException("진작 대출되어 있는 책입니다")
        }

        val loanUser = userRepository.findByName(request.userName) ?: fail()
        loanUser.loanBook(loanBook)

    }

    @Transactional
    fun returnBook(request: BookReturnRequest) {
        val returnUser = userRepository.findByName(request.userName)?: fail()
        returnUser.returnBook(request.bookName)
    }

    @Transactional(readOnly = true)
    fun countLoanedBook(): Int {
        return userLoanHistoryRepository.countByStatus(UserLoanStatus.LOANED).toInt()
    }

    @Transactional(readOnly = true)
    fun getBookStatistics(): List<BookStatResponse> {
        return bookRepository.getStats()
    }



}