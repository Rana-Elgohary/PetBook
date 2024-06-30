import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlreadyLoggedInDialogComponent } from '../Components/already-logged-in-dialog/already-logged-in-dialog.component';

export const noNavigateToLoginPageIfTokenGuard: CanActivateFn = (route, state) => {
  let t = localStorage.getItem("token")
  if(t != null){
    const dialog = inject(MatDialog);
    const router = inject(Router);

    dialog.open(AlreadyLoggedInDialogComponent).afterClosed().subscribe(() => {
      router.navigateByUrl('/Profile');
    });
    return false;
  }
  return true
};
