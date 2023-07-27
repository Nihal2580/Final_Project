import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { UserStorageService } from 'src/app/services/storage/user-storage.service';
import { environment } from 'src/environments/environment';

const BASIC_URL = environment['BASIC_URL'];

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getCategoriesByTitle(title: any): Observable<any> {
    return this.http
      .get<[]>(BASIC_URL + `api/user/search/${title}`, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Category fetched successfully')),
        catchError(this.handleError<[]>('Error getting Category', []))
      );
  }

  getProductByCategoryId(categoryId: any): Observable<any> {
    return this.http
      .get<[]>(BASIC_URL + `api/user/products/${categoryId}`, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Product fetched successfully')),
        catchError(this.handleError<[]>('Error getting product', []))
      );
  }

  getAllProducts(): Observable<any> {
    return this.http
      .get<[]>(BASIC_URL + `api/user/products`, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Products fetched successfully')),
        catchError(this.handleError<[]>('Error getting Products', []))
      );
  }

  getAllCategories() {
    return this.http
      .get<[]>(BASIC_URL + `api/user/categories`, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Categories fetched successfully')),
        catchError(this.handleError<[]>('Error getting Categories', []))
      );
  }

  getCartByUserId(): Observable<any> {
    return this.http
      .get<[]>(BASIC_URL + `api/user/cart/${UserStorageService.getUserId()}`, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Cart fetched successfully')),
        catchError(this.handleError<[]>('Error getting Cart', []))
      );
  }

  addToCart(productId: any): Observable<any> {
    const cartDto = {
      productId: productId,
      userId: UserStorageService.getUserId(),
    }
    return this.http
      .post<[]>(BASIC_URL + `api/user/cart`, cartDto, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Product Added to Cart successfully')),
        catchError(this.handleError<[]>('Error adding Product to Carrt', []))
      );
  }

  addMinusOnProduct(productId: any): Observable<any> {
    const quantityChangeProductDto = {
      userId: UserStorageService.getUserId(),
      productId: productId,
    }
    return this.http
      .post<[]>(BASIC_URL + `api/user/deduction`, quantityChangeProductDto, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Remove Product from Order successfully')),
        catchError(this.handleError<[]>('Error removing Product from Order', []))
      );
  }

  addPlusOnProduct(productId: any): Observable<any> {
    const quantityChangeProductDto = {
      userId: UserStorageService.getUserId(),
      productId: productId,
    }
    return this.http
      .post<[]>(BASIC_URL + `api/user/addition`, quantityChangeProductDto, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Added Product into Order successfully')),
        catchError(this.handleError<[]>('Error adding Product to Order', []))
      );
  }

  placeOrder(quantityChangeProductDto: any): Observable<any> {
    quantityChangeProductDto.userId = UserStorageService.getUserId();
    return this.http
      .post<[]>(BASIC_URL + `api/user/placeOrder`, quantityChangeProductDto, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Order placed successfully')),
        catchError(this.handleError<[]>('Error placing Order', []))
      );
  }

  getMyOrdersByUserId(): Observable<any> {
    return this.http
      .get<[]>(BASIC_URL + `api/user/myOrders/${UserStorageService.getUserId()}`, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('My Orders fetched successfully')),
        catchError(this.handleError<[]>('Error getting My Orders', []))
      );
  }


  getAllUsers(): Observable<any> {
    return this.http
      .get<[]>(BASIC_URL + `api/admin/users`, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Users fetched successfully')),
        catchError(this.handleError<[]>('Error getting users', []))
      );
  }

  createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      'Authorization',
      'Bearer ' + UserStorageService.getToken()
    );
  }

  log(message: string): void {
    console.log(`User Auth Service: ${message}`);
  }

  handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
