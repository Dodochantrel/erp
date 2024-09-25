import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ValidateComponent } from './pages/auth/validate/validate.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/auth/reset-password/reset-password.component';
import { authGuard } from './guards/auth.guard';
import { MeComponent } from './pages/auth/me/me.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { InvoiceComponent } from './pages/invoice/invoice.component';
import { QuoteComponent } from './pages/quote/quote.component';
import { CustomerComponent } from './pages/customer/customer.component';

export const routes: Routes = [
    {
        path: 'auth/register',
        component: RegisterComponent,
    },
    {
        path: 'auth/validate/:token',
        component: ValidateComponent,
    },
    {
        path: 'auth/login',
        component: LoginComponent,
    },
    {
        path: 'auth/forgot-password',
        component: ForgotPasswordComponent,
    },
    {
        path: 'auth/resetPassword/:token',
        component: ResetPasswordComponent,
    },
    {
        path: 'auth/me',
        component: MeComponent,
        canActivate: [authGuard],
    },
    {
        path: 'calendar',
        component: CalendarComponent,
        canActivate: [authGuard],
    },
    {
        path: 'invoice',
        component: InvoiceComponent,
        canActivate: [authGuard],
    },
    {
        path: 'quote',
        component: QuoteComponent,
        canActivate: [authGuard],
    },
    {
        path: 'customer',
        component: CustomerComponent,
        canActivate: [authGuard],
    }
];
