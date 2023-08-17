// Imports required
import decode from 'jwt-decode';

// The AuthService to handle login and logout
class AuthService {
  getUser() {
    const token = this.getToken();
    if (token) {
      return decode(token);
    }
    return null;
  }

  loggedIn() {
    const token = this.getToken();
    return token && !this.isTokenExpired(token) ? true : false;
  }

  isTokenExpired(token) {
    const decoded = decode(token);
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem('id_token');
      return true;
    }
    return false;
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    localStorage.removeItem('id_token');
    window.location.reload();
  }
}

const authServiceInstance = new AuthService();
export default authServiceInstance;