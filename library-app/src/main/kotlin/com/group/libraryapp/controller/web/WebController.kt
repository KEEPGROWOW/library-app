package com.group.libraryapp.controller.web

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping

@Controller
class WebController {
    @GetMapping(value = ["", "/register", "/list", "/user/register", "/book/register", "/user/list", "/book/list", "/loan", "/book/loan", "/return/loan", "/history","/statistic"])
    fun forward(): String {
        return "forward:/index.html"
    }
}