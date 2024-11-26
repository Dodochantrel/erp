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
import { InformationComponent } from './pages/information/information.component';
import { ViewWithNavigationComponent } from './layouts/view-with-navigation/view-with-navigation.component';
import { CreateQuoteComponent } from './pages/create-quote/create-quote.component';
import { DefaultQuoteLinesComponent } from './pages/default-quote-lines/default-quote-lines.component';

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
        path: '',
        component: ViewWithNavigationComponent,
        canActivate: [authGuard],
        children: [
            {
                path: 'auth/me',
                component: MeComponent,
            },
            {
                path: 'calendar',
                component: CalendarComponent,
            },
            {
                path: 'invoice',
                component: InvoiceComponent,
            },
            {
                path: 'quote',
                component: QuoteComponent,
            },
            {
                path: 'customer',
                component: CustomerComponent,
            },
            {
                path: 'information',
                component: InformationComponent,
            },
            {
                path: 'create-quote',
                component: CreateQuoteComponent,
            },
            {
                path: 'default-quote-line',
                component: DefaultQuoteLinesComponent,
            }
        ],
    },
];
