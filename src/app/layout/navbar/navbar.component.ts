import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router) {
    // authService.logout();
  }

  ngOnInit(): void {}
  logout(): void {
    /* let username = this.authService.usuario.username;
    this.authService.logout();
    Swal.fire(
      'Logout',
      `Hola ${username} has cerrado sesion con exito`,
      'success'
    );
    this.router.navigate(['/login']); */
  }
}
