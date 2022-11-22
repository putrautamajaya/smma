import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 's-quantum';
  users: {
    first_name: string,
    email: string,
    avatar: string
  }[]
  page: number
  total_pages: number

  get shouldDisableNext() {
    return this.page === this.total_pages
  }

  get shouldDisablePrev() {
    return this.page === 1
  }

  constructor(private http: HttpClient) {
    this.users = []
    this.page = 1
    this.total_pages = 1
  }

  ngOnInit(): void {
    this.getUsers(this.page)
  }

  getUsers(page: number) {
    this.http.get(`https://reqres.in/api/users?page=${page}`).subscribe((data: any) => {
      this.users = data.data
      this.total_pages = data.total_pages
    })
  }

  nextPage() {
    this.page = this.page + 1
    this.getUsers(this.page)
  }

  prevPage() {
    this.page = this.page - 1
    this.getUsers(this.page)
  }
}
