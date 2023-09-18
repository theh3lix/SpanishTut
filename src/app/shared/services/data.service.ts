import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class DataService {
    constructor(private http: HttpClient) {}

    getJSON(path: string): Observable<any> {
        return this.http.get<string>(path);
    }
}