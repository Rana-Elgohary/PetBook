import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const noNavigateWithoutLoginGuard: CanActivateFn = (route, state) => {
  let t = localStorage.getItem("token")
  const router = inject(Router);

  if(t == null){
    router.navigateByUrl('');
    return false;
  }
  return true
};