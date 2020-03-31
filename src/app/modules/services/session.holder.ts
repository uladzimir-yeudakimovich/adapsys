import { Injectable } from '@angular/core';
import { ISessionUserInfo, ISessionHotelInfo } from '../../interfaces/interfaces';

@Injectable()
export class SessionHolder {

	private tabs: Array<string> = [];

	private userInfo: ISessionUserInfo;
	private hotelInfo: ISessionHotelInfo;

	constructor() {}

	private setTabs( tabs: Array<string> ): void {
		this.tabs.splice(0, this.tabs.length);
		this.tabs.push(...tabs);
	}

	public isTabAvailable( tab: string ): boolean {
		return this.tabs.includes(tab);
	}

	public setUserInfo( object: ISessionUserInfo ): void {
		this.userInfo = object;
		this.setTabs(this.userInfo.available_tabs);
	}

	public setHotelInfo( object: ISessionHotelInfo ): void {
		this.hotelInfo = object;
	}

	public getHotelInfo(): ISessionHotelInfo {
		return this.hotelInfo;
	}

	public getUserInfo(): ISessionUserInfo {
		return this.userInfo;
	}
}