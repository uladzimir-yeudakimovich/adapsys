export interface ISection {
	title: string;
}

export interface ILocation extends Object {
	latitude: number;
	longitude: number;
}

export interface IMultilangString extends Object {
	ca?: string;
	de?: string;
	en?: string;
	es?: string;
	eu?: string;
	fi?: string;
	fr?: string;
	gl?: string;
	hu?: string;
	it?: string;
	lv?: string;
	nb?: string;
	nl?: string;
	pl?: string;
	pt?: string;
	ru?: string;
	sv?: string;
	uk?: string;
}

export interface IDialogInternal extends Object {
	room: string;
	ID: string;
	name: IMultilangString
}

export interface IDialogExternal extends Object {
	hidden: boolean;
	highlight_messages: Array<any>;
	hotelId: string;
	last_message_date: string;
	messages: number;
	name: IMultilangString;
	page: number;
	participant_types: Array<string>;
	participants: Array<string>;
	total_pages: number;
	_id: string;
}

export interface IDialogMessage extends Object {
	batchId: string;
	body: string;
	body_transtaled: string;
	date: string;
	groupId: string;
	head: string;
	head_transtaled: string;
	hotelId: string;
	recipient: string;
	recipientAlias: string;
	recipientHotelId: string;
	recipientId: string;
	recipientLanguage: string;
	recipientRoomN: string;
	recipientSIPName: string;
	recipientType: string;
	recipientTypeId: string;
	rootMessage: string;
	sender: IMultilangString;
	reply_to?: string;
	senderAlias: string;
	senderHotelId: string
	senderId: string;
	senderSIPName: string;
	senderType: string;
	senderTypeId: string;
	silent_mode: boolean;
	type: string;
	users_read: Array<string>;
	_id: string;
}

export interface IPlace extends Object {
	name: IMultilangString;
	sync_id: number;
	_id: string;
}

export interface IContact extends Object {
	_id: string;
	name: IMultilangString;
}

export interface ISessionUserInfo extends Object {
	available_tabs: Array<string>;
	default_language: string;
	id: string;
	role: string;
	weak_passowrd: boolean;
}

export interface ISessionHotelInfo extends Object {
	default_guest_balance: number;
	default_language: string;
	hotel_location: ILocation;
	hotel_name: string;
	setup_id: string;
	time_zone: string;
}

export interface IFeedRoom extends Object {
	_id: string;
	number: string;
}

export interface IReservation extends Object {
	ack_history: Array<Object>;
	categories: Array<any>;
	channel_name: string;
	date: string;
	date_confirmed: string;
	email: string;
	external_id: string;
	form_data: Object;
	guestId: string;
	hotelId: string;
	hotel_language: string;
	hotel_logo: string;
	hotel_name: string;
	hotel_time_zone: string;
	inhotel: boolean;
	language: string;
	name: string;
	object_name: string;
	payment_terminal: string;
	persons_number: number;
	phone: string;
	positions: Array<IOrderPosition>;
	readable_form_data: Array<Object>;
	requires_payment: number;
	reservation_date: string;
	room:  string;
	roomId: string;
	status: string;
	status_changes: Array<IStatusChange>
	sup_charge: number;
	sync_id: number;
	test: boolean;
	time_zone: string;
	total: number;
	tx_id: string;
	v: number;
	_id: string;
}

export interface IRoomOrder extends Object {
	categories: Array<string>;
	channel_name: string;
	date: string;
	date_accepted: string;
	date_completed: string;
	date_new: string;
	date_rejected: string;
	guestId: string;
	hotelId: string;
	hotel_language: string;
	hotel_logo: string;
	hotel_name: string;
	language: string;
	message: string;
	name: string;
	order_type: string;
	positions: Array<IOrderPosition>
	requires_payment: number;
	room: string;
	roomId: string;
	shopId: string;
	status: string;
	status_changes: Array<IStatusChange>;
	sup_charge: number;
	test: boolean;
	total: number;
	tx_id: string;
	urgent: boolean;
	v: number;
	_id: string;
}

export interface IStatusChange extends Object {
	status: string;
	date: string;
	message: string;
}

export interface IOrderPosition extends Object {
	amount: number;
	categories_chain: Array<IMultilangString>;
	categoryId: string;
	description: IMultilangString
	index: number;
	name: IMultilangString
	price: number;
	subtitle: IMultilangString
	sync_id: string;
	total: number;
	_id: string;
}

export interface IBreakdownRequest extends Object {
	ack_history: Array<Object>;
	channel_name: string;
	date: string;
	date_confirmed: string;
	equipment: string;
	guestId: string;
	hotelId: string;
	hotel_language: string;
	hotel_logo: string;
	hotel_name: string;
	language: string;
	name: string;
	room: string;
	roomId: string;
	status: string;
	status_changes: Array<IStatusChange>;
	test: boolean;
	tx_id: string;
	urgent: boolean;
	v: number;
	_id: string;
}

export interface ITaxiRequest extends Object {
	accessibility_ramp: boolean;
	ack_history: Array<Object>
	channel_name: string;
	current_address: string;
	current_city: string;
	current_country: string;
	current_county: string;
	current_latitude: number;
	current_longitude: number;
	current_state: string;
	date: string;
	date_confirmed: string;
	guestId: string;
	hotelId: string;
	hotel_language: string;
	hotel_logo: string;
	hotel_name: string;
	hotel_time_zone: string;
	language: string;
	name: string;
	persons_number: number;
	room: string;
	roomId: string;
	status: string;
	status_changes: Array<IStatusChange>;
	test: boolean;
	tx_id: string;
	utc_when_needed: string;
	v: number;
	when_needed: string;
	_id: string;
}

export interface IPayment extends Object {
	amount: number;
	api_type: string;
	date: string;
	guestId: string;
	guestName: string;
	hotelId: string;
	item_payment_id: string;
	item_type: string;
	status: string;
	_id: string;
}

export interface ITask extends Object {
	address: string;
	asset:null
	checklist: Array<ITaskChecklistItem>;
	code: string;
	created_at: string;
	creator: Object;
	date: string;
	date_end: string | null;
	date_start: string | null;
	deadline: string;
	description: string;
	estimated_work_hours: string | null;
	history: Array<ITaskHistory>;
	hotelId: string;
	latitude: number;
	longitude: number;
	media: Array<any>;
	participants: Array<ITaskParticipant>;
	priority: number;
	responsible: ITaskParticipant;
	site: string | null;
	sort: Object;
	status: string;
	title: string;
	updated_at: string;
	_id: string;
}

export interface ITaskParticipant extends Object {
	date: string;
	id: string;
	name: string;
	email: string;
}

export interface ITaskHistory extends Object {
	date: string;
	operation: string;
}

export interface ITaskChecklistItem extends Object {
	finished: boolean;
	_id: string;
	title: string;
}

export interface IEventsCount extends Object {
	new_cleanrequests: number;
	new_eqmalrequests: number;
	new_messages: number;
	new_messages_by_groups: Object;
	new_orders: number;
	new_payments: number;
	new_reservations: number;
	new_taxirequests: number;
	new_wakeupcallrequests: number;
}

export interface IGuest extends Object {
	balance: number;
	birthdate: string;
	bytes_received: number;
	bytes_sent: number;
	confirmation_code: string;
	count_adults: number;
	count_babies: number;
	count_children: number;
	country: string;
	date: string;
	datefrom: string;
	dateto: string;
	email: string;
	guestTypeId: string;
	guest_type: string;
	hotelId: string;
	is_device_assigned: boolean;
	language: string;
	married: boolean;
	mobile: string;
	name: string;
	pid: number;
	referral_code: string;
	rid: string;
	room: string;
	roomId: string;
	self_registered: boolean;
	sip_alias: string;
	sip_password: string;
	sip_user: string;
	surname: string;
	toc_accepted_date: string;
	user_type: string;
	with_kids: boolean;
	_id: string;
}