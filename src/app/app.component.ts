import { Component } from '@angular/core';

import { NotifierService } from 'angular-notifier';

import { AuthenticationService } from './authentication.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent   {

  title = 'app';

  private notifier: NotifierService;

  constructor(public auth: AuthenticationService, notifier: NotifierService)
   {
    this.notifier = notifier;
   }
  
   public showNotification( type: string, message: string ): void {
		this.notifier.notify( type, message );
	}

  public hideOldestNotification(): void {
		this.notifier.hideOldest();
  }

  public hideNewestNotification(): void {
		this.notifier.hideNewest();
  }
  public hideAllNotifications(): void {
		this.notifier.hideAll();
  }
  
  public showSpecificNotification( type: string, message: string, id: string ): void {
		this.notifier.show( {
			id,
			message,
			type
		} );
  }
  
  public hideSpecificNotification( id: string ): void {
		this.notifier.hide( id );
	}
}

