import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    // TODO: return the decoded token
    if (!this.loggedIn()) {
      return null;
    }
    return jwtDecode(this.getToken());
  }

  loggedIn() {
    if (!this.getToken()) {
      return false;
    }
    return !this.isTokenExpired(this.getToken());

    // TODO: return a value that indicates if the user is logged in
  }
  
  isTokenExpired(token: string): boolean {
    // TODO: return a value that indicates if the token is expired
    try {
      const decoded: JwtPayload = jwtDecode(token);
      if (decoded.exp && decoded.exp < Date.now() / 1000) {
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  }

  getToken(): string {
    // TODO: return the token
    if (localStorage.getItem('token')) {
      return localStorage.getItem('token') || '';
    }
    return '';
    if (!this.loggedIn()) {
      return '';
    }
    return localStorage.getItem('token') || '';
  }

  login(idToken: string) {
    if (!idToken) {
      return;
    }
    localStorage.setItem('token', idToken);
    window.location.assign('/');
    // TODO: set the token to localStorage
    localStorage.setItem('token', idToken);
    // TODO: redirect to the home page
    return;
  }

  logout() {
    // TODO: remove the token from localStorage
    localStorage.removeItem('token');
    window.location.assign('/login');
    return;
  }
    // TODO: redirect to the login page
    this.getToken();
    localStorage.removeItem('token');
    window.location.assign('/login');
    return;
  }
}

export default new AuthService();
