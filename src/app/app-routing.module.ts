import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: '', loadChildren: './tutorial/tutorial.module#TutorialPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'car-register', loadChildren: './car-register/car-register.module#CarRegisterPageModule' },
  { path: 'licence-photo', loadChildren: './licence-photo/licence-photo.module#LicencePhotoPageModule' },
  { path: 'licence-vehicle', loadChildren: './licence-vehicle/licence-vehicle.module#LicenceVehiclePageModule' },
  { path: 'driver-info', loadChildren: './driver-info/driver-info.module#DriverInfoPageModule' },
  { path: 'orders', loadChildren: './orders/orders.module#OrdersPageModule' },
  { path: 'order-info', loadChildren: './order-info/order-info.module#OrderInfoPageModule' },
  { path: 'account', loadChildren: './account/account.module#AccountPageModule' },
  { path: 'edit-info', loadChildren: './edit-info/edit-info.module#EditInfoPageModule' },
  { path: 'edit-driver', loadChildren: './edit-driver/edit-driver.module#EditDriverPageModule' },
  { path: 'edit-vehicle', loadChildren: './edit-vehicle/edit-vehicle.module#EditVehiclePageModule' },
  { path: 'see-order', loadChildren: './see-order/see-order.module#SeeOrderPageModule' },
  { path: 'earnings', loadChildren: './earnings/earnings.module#EarningsPageModule' },
  { path: 'car-picture', loadChildren: './car-picture/car-picture.module#CarPicturePageModule' },
  { path: 'forgot-password', loadChildren: './forgot-password/forgot-password.module#ForgotPasswordPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
