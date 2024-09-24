import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, { providers: [provideHttpClient()] }).catch(
  (err) => console.error(err)
);

/*
 Providing HttpClient when using NgModules : 
 https://www.udemy.com/course/the-complete-guide-to-angular-2/learn/lecture/44127430#overview
 */
