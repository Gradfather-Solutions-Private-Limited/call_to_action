import axios from 'axios';
import { mapGetters } from 'vuex'
import { createStore } from 'vuex'
// import dispatches1 from './modules/dispatches.js';

export default createStore({
	modules: {
		// dispatches1, // Add dispatch module here
	},
	state: {
		loggedinuser: null,
		categories: [],
		attributes: [],
		cartcount: 0,
		cartitems: [],
		storeproducts: [],
		filteredproducts: [],
		attributeproductcount: [],
		filters: [],
		filtervalues: {},
		filterstring: {},
		bannertypeimage: [],
		completeaddress: [],
		outsideupstore: false,
		messages: [],
		productstore: [],
		accessmodules: [],
		applicabletaxes: [],
		allcreatedtaxes: [],
		salepurchaseconfig: {},
		threads: [],
		selectedthread: null,
		viewno: 1,
		editproduct: '',
		editcategory: '',
		perpagerecord: 10,
		currentpage: 1,
		edititem: null,
		feature: '',
		removeitems: '',
		allproducts: [],
		productlist: [],
		fieldjson: null,
		employees: [],
		employeescount: [],
		activeemployees: [],
		activeemployeescount: 0,
		fetchmessagepayload: null,
		editview: false,
		sponsertypes: [],
		bannertypes: [],
		loadingstatus: 0,
		selectedbannertypeid: 0,
		selectedbanner: null,
		selectedbannersize: null,
		productimagesizes: [],
		directorypath: '',
		modalshow: false,
		uploadedimage: null,
		imagetype: 0,
		imageid: 0,
		creditused: [],
		productimages: [],
		buttonarray: [],
		buttondata: [],
		templates: [],
		mobiles: [],
		master: [],
		addressess: [],
		selectedaddress: null,
		company: [],
		accessforcompany: 0,
		accessmodules2: [],
		accessoperations: [],
		dealer: [],
		websitecount: 0,
		phonecount: 0,
		subdealer: [],
		uploadids: [],
		mastervalidation: [],
		customerlist:[],
		list: [],
		filecomponents: [],
		finance:null,
		addpageheading: 'Call To Action',
		selectcategoriesitem: [],
		Ckeditortext: [],
		distributors: [],
		examDetails: {
			examContent: {},
			singleProductMapping: {}
		},
		distributorSearchCriteria: {
			distributor_code: '',
			status: '',
		},
		distributorPagination: {
			currentPage: 1,
			pageSize: 5,
			totalDistributors: 0,
		},
		meetings: [],
		meetingSearchCriteria: {
			searchDate: new Date().toISOString().slice(0, 10),
			status: '',
		},
		meetingPagination: {
			currentPage: 1,
			pageSize: 10,
			totalMeetings: 0,
		},
		financingRequests: [],
		financingPagination: {
			currentPage: 1,
			pageSize: 10,
			totalRequests: 0,
		},
		financingFilters: {
			userName: '',
			productName: '',
			status: '',
		},
		dsrTasks: [], // List of DSR tasks
		newTask: null,
		dsrFilters: {
			taskDate: '',
			username: '',
			status: '',
		},
		servicemen: [],
		dsrPagination: {
			currentPage: 1,
			pageSize: 10,
			totalTask: 0,
		},
		leads: [], // List of leads
		leadFilters: { // Renamed filters to leadFilters
			productName: "",
			username: "",
			mobile: "",
		},
		leadPagination: {
			currentPage: 1,
			pageSize: 10,
			totalLead: 0,
		},
		complains: [], // List of complaints
		complainFilters: { // Filters for complaints
			complainNo: "",
			status: "",
			productSerialNo: "",
			userMobileNo: "",
			fromdate: '',
			todate: '',
		},
		complainPagination: { // Updated pagination variable to complainPagination
			current_page: 1, // Current page
			limit: 10, // Items per page
			total: 0, // Total items (from API response)
		},
		salesOrders: [],
		salesOrderDetails: [],
		salesOrderTransaction: {},
		dispatchTransaction: {},
		salesOrderFilters: {
			salesOrderNo: "",
			customerName: "",
			mobileNo: "",
			productName: "",
			salesPersonName: "",
		},
		salesOrderPagination: {
			currentPage: 1,
			perPage: 10,
			total: 0,
		},
		salesOrderDetailFilters: {
			transactionid: 0,
		},
		dispatchDetailFilters: {
			transactionid: 0,
		},
		salesOrderDetailPagination: {
			currentPage: 1,
			perPage: 10,
			total: 0,
		},
		dispatches: [],
		dispatchFilters: {
			date: '',
			serialNo: '',
			productName: '',
			salesPersonId: '',
		},
		dispatchPagination: {
			page: 1,
			perPage: 10,
			total: 0,
		},
		registers: [],

		testSeries: [],
		productColumns: [],
		productWithTables: [],
		dispatchDetails: [],
		customers: [],
		customersPagination: {
			currentpage: 1,
			noofrec: 10,
			total: 0,
		},
		customerFilters: {
			customerName: '',
			customerMobile: '',
			customerEmail: '',
			iscustomer: 1,
			isservicemen: 0,
			issalesmen: 0,
		},
		servicemen: [],
		servicemenFilters: {
			isservicemen: 1,
			iscustomer: 1,
			servicemenName: '',
			servicemenMobile: '',
			servicemenEmail: '',
		},
		servicemenPagination: {
			currentpage: 1,
			noofrec: 10,
			total: 0,
		},
		salesmen: [],
		salesmenPagination: {
			currentpage: 1,
			noofrec: 10,
			total: 0,
		},
		salesmenFilters: {
			salesmenName: '',
			salesmenMobile: '',
			salesmenEmail: '',
		},
		purchaseCourses: {
			allexams: [],
			purchaselist: [],
			series: []
		},
		purchaseCoursesPagination: {
			currentpage: 1,
			noofrec: 10,
			total: 0,
		},
		purchaseCoursesFilters: {
			customerName: '',
			customerMobile: '',
			customerEmail: '',
		},
		updateUser: {
			id: 0,
			column: '',
			value: 0,
		},
		notifications: [],
		uplaodeddocument: null,
		selectedcustomer: null,
		selectedcustomeraddressid: 0,
		totalnetprice:0,
		amountwithouttax:0
	},
	mutations: {
		assignnewtask(state, u) {
			state.newTask = u;
		},
		assignregisters(state, u) {
			state.registers = u;
		},
		assigncustomerlist(state, u) {
			state.customerlist = u;
		},
		assignfinance(state, u) {
			state.finance = u;
		}, 
		assignuplaodeddocument(state, u) {
			state.uplaodeddocument = u;
		},
		assigntotalnetprice(state, u) {
			state.totalnetprice = u;
		}, 
		assignamountwithouttax(state, u) {
			state.amountwithouttax = u;
		}, 
		SET_PRODUCT_WITH_TABLES(state, payload) {
			state.productWithTables = payload;
		},
		SET_PRODUCT_COLUMNS(state, payload) {
			state.productColumns = payload;
		},
		SET_TEST_SERIES(state, payload) {
			state.testSeries = payload;
		},
		ADD_TEST_SERIES(state, payload) {
			state.testSeries.push(payload);
		},
		UPDATE_TEST_SERIES(state, payload) {
			const index = state.testSeries.findIndex(item => item.id === payload.id);
			if (index !== -1) {
				Vue.set(state.testSeries, index, payload);
			}
		},
		UPDATE_USERS(state, updateUser) {
			state.updateUser = updateUser;

		},
		SET_DISPATCHES(state, dispatches) {
			state.dispatches = dispatches;
		},
		SET_DISPATCH_PAGINATION(state, pagination) {
			state.dispatchPagination = pagination;
		},
		SET_DISPATCH_FILTERS(state, filters) {
			state.dispatchFilters = { ...state.dispatchFilters, ...filters };
		},
		SET_DISPATCH_DETAILS(state, dispatchDetails) {
			state.dispatchDetails = dispatchDetails;
		},
		SET_DISPATCH_ORDER_TRANSACTION(state, dispatchOrderTransaction) {
			state.dispatchOrderTransaction = dispatchOrderTransaction;
		},
		SET_CUSTOMERS(state, customers) {
			state.customers = customers;
		},
		ADD_NOTIFICATION(state, notification) {
			state.notifications.push(notification);
			setTimeout(() => {
			  state.notifications.shift();
			}, 20000); // Remove after 20 seconds
		  },
		  REMOVE_NOTIFICATION(state, index) {
			state.notifications.splice(index, 1);
		  },
		SET_CUSTOMER_FILTERS(state, customerFilters) {
			state.customerFilters = customerFilters;
		},
		SET_SERVICEMEN(state, servicemen) {
			state.servicemen = servicemen;
		},
		SET_SERVICEMEN_FILTERS(state, servicemenFilters) {
			state.servicemenFilters = servicemenFilters;
		},
		SET_CUSTOMER_PAGINATION(state, customerPagination) {
			state.customerPagination = customerPagination;
		},
		SET_SALESMEN(state, salesmen) {
			state.salesmen = salesmen;
		},
		SET_SALESMEN_PAGINATION(state, salesmenPagination) {
			state.salesmenPagination = salesmenPagination;
		},
		SET_SALESMEN_FILTERS(state, salesmenFilters) {
			state.salesmenFilters = salesmenFilters;
		},
		SET_SALES_ORDER_DETAILS(state, salesOrderDetails) {
			state.salesOrderDetails = salesOrderDetails;
		},
		SET_EXAM_DETAILS(state, examDetails) {
			state.examDetails = {
				examContent: examDetails.examContent,
				singleProductMapping: examDetails.singleProductMapping
			};
		},
		SET_SALES_ORDER_DETAIL_PAGINATION(state, pagination) {
			state.salesOrderDetailPagination = pagination;
		},
		SET_SALES_ORDERS(state, salesOrders) {
			state.salesOrders = salesOrders;
		},
		SET_SALES_ORDER_TRANSACTION(state, salesOrderTransaction) {
			state.salesOrderTransaction = salesOrderTransaction;
		},
		SET_DISPATCH_TRANSACTION(state, dispatchTransaction) {
			state.dispatchTransaction = dispatchTransaction;
		},
		SET_SALES_ORDER_FILTERS(state, filters) {
			state.salesOrderFilters = filters;
		},
		SET_SALES_ORDER_PAGINATION(state, pagination) {
			state.salesOrderPagination = pagination;
		},

		SET_PURCHASE_COURSES(state, purchaseCourses) {
			state.purchaseCourses = {
				allexams: purchaseCourses?.allexams,
				purchaselist: purchaseCourses?.purchaselist,
				series: purchaseCourses?.series,
				products: purchaseCourses?.products
			}
		},
		SET_PURCHASE_COURSES_PAGINATION(state, purchaseCoursesPagination) {
			state.purchaseCoursesPagination = purchaseCoursesPagination;
		},
		SET_PURCHASE_COURSES_FILTERS(state, purchaseCoursesFilters) {
			state.purchaseCoursesFilters = purchaseCoursesFilters;
		},

		setComplains(state, complains) {
			state.complains = complains;
		},
		setComplainFilters(state, filters) {
			state.complainFilters = filters;
		},
		setComplainPagination(state, { current_page, limit, total }) {
			state.complainPagination.current_page = current_page;
			state.complainPagination.limit = limit;
			state.complainPagination.total = total;
		},
		SET_TOTAL_LEAD_REQUESTS(state, total) {
			state.leadPagination.totalLead = total;
		},
		SET_LEAD_CURRENT_PAGE(state, page) {
			state.leadPagination.currentPage = page;
		},
		SET_LEADS(state, leads) {
			state.leads = leads;
		},
		SET_LEAD_FILTERS(state, filters) {
			state.leadFilters = filters;
		},
		SET_TOTAL_DSR_REQUESTS(state, total) {
			state.dsrPagination.totalTask = total;
		},
		SET_DSR_CURRENT_PAGE(state, page) {
			state.dsrPagination.currentPage = page;
		},
		setDsrTasks(state, dsrTasks) {
			state.dsrTasks = dsrTasks;
		},
		// addDsrTask(state, dsrTask) {
		// 	state.dsrTasks.push(dsrTask);
		// },
		// updateDsrTask(state, updatedDsrTask) {
		// 	const index = state.dsrTasks.findIndex((task) => task.id === updatedDsrTask.id);
		// 	if (index !== -1) state.dsrTasks[index] = updatedDsrTask;
		// },
		SET_DSR_FILTERS(state, filters) {
			state.dsrFilters = filters;
		},
		SET_FINANCING_REQUESTS(state, requests) {
			state.financingRequests = requests;
		},
		SET_TOTAL_FINANCING_REQUESTS(state, total) {
			state.financingPagination.totalRequests = total;
		},
		SET_FINANCING_CURRENT_PAGE(state, page) {
			state.financingPagination.currentPage = page;
		},
		UPDATE_REQUEST_STATUS(state, { requestId, status }) {
			const request = state.financingRequests.find(req => req.id === requestId);
			if (request) {
				request.status = status;
			}
		},
		UPDATE_COMPLAINT_STATUS(state, { id, status }) {
			const request = state.complains.find(req => req.id === id);
			if (request) {
				request.status = status;
			}
		},
		SET_FINANCING_FILTERS(state, filters) {
			state.financingFilters = filters;
		},
		SET_MEETINGS(state, meetings) {
			state.meetings = meetings;
		},
		SET_TOTAL_MEETINGS(state, total) {
			state.meetingPagination.totalMeetings = total;
		},
		SET_MEETING_SEARCH_CRITERIA(state, criteria) {
			state.meetingSearchCriteria = criteria;
		},
		SET_MEETING_CURRENT_PAGE(state, page) {
			state.meetingPagination.currentPage = page;
		},
		SET_DISTRIBUTORS(state, distributors) {
			state.distributors = distributors;
		},
		SET_TOTAL_DISTRIBUTORS(state, total) {
			state.distributorPagination.totalDistributors = total;
		},
		SET_DISTRIBUTOR_SEARCH_CRITERIA(state, criteria) {
			state.distributorSearchCriteria = criteria;
		},
		SET_DISTRIBUTOR_CURRENT_PAGE(state, page) {
			state.distributorPagination.currentPage = page;
		},
		updatecompanyaccessids(state, u) {
			let company = state.company.find(block => block.id == state.selecteduserid)
			company.accessids = u;

		},
		assignCkeditortext(state, u) {
			state.Ckeditortext = u;
		},
		assignselectcategoriesitem(state, u) {
			state.selectcategoriesitem = u
		},
		assignlist(state, u) {
			state.list = u
		},
		assignaddpageheading(state, u) {
			state.addpageheading = u
		},

		assigndealer(state, u) {
			state.dealer = u
		},
		assignsubdealer(state, u) {
			state.subdealer = u
		},
		storemastervalidation(state, u) {
			state.mastervalidation = u;
		},
		assignuploadids(state, u) {
			state.uploadids = u
		},
		assigncreditused(state, u) {
			state.creditused = u
		},
		assignwebsitecount(state, u) {
			state.websitecount = u
		},
		assignphonecount(state, u) {
			state.phonecount = u
		},
		assignaccessforcompany(state, u) {
			this.accessforcompany = u
		},
		assigncompany(state, u) {
			state.company = u;
		},
		assignbuttonarray(state, u) {
			state.buttonarray = u;
		}, assignbuttondata(state, u) {
			state.buttondata = u;
		},
		assignselectedaddress(state, u) {
			state.selectedaddress = u;
		},

		updateappendaddressess(state, u) {
			if (u.id > 0) {
				let index = state.addressess.findIndex(block => block.id == u.id)
				if (index > -1) {
					state.addressess.splice(index, 1, u)
				} else
					state.addressess.push(u);
			} else {
				if (u.localid > 0) {
					let index = state.addressess.findIndex(block => block.localid == u.localid)
					if (index > -1) {
						state.addressess.splice(index, 1, u)
					} else {
						//get the max local id from the list
						let maxid = 0;
						let newaddressess = state.addressess.filter(block => block.id == 0)
						if (newaddressess !== 'undefined') {
							maxid = Math.max.apply(Math, state.addressess.map(function (o) { return o.localid; }))
							if (maxid === -Infinity) {
								maxid = 0;
							}
						}
						u.localid = maxid + 1;
						state.addressess.push(u);
					}

				} else {
					let maxid = 0;
					let newaddressess = state.addressess.filter(block => block.id == 0)
					if (newaddressess !== 'undefined') {
						maxid = Math.max.apply(Math, state.addressess.map(function (o) { return o.localid; }))
						if (maxid === -Infinity) {
							maxid = 0;
						}
					}
					u.localid = maxid + 1;
					console.log("updating addressess")
					state.addressess.push(u);
				}

			}
			console.log(state.addressess)
		},
		assignaddressess(state, u) {
			state.addressess = u;
		},
		assignmaster(state, u) {
			state.master = u
		},
		assigntemplates(state, u) {
			state.templates = u;
		},
		updateappendaccessmodules(state, u) {
			let index = state.accessmodules.findIndex(block => block.id == u.id)
			if (index > -1) {
				state.accessmodules.splice(index, 1, u)
			} else
				state.accessmodules.push(u);
		},
		assignaccessmodules(state, u) {
			state.accessmodules = u
		},
		assignaccessmodules2(state, u) {
			state.accessmodules2 = u
		},
		assignaccessoperations(state, u) {
			state.accessoperations = u
		},
		assignactiveemployeescount(state, u) {
			state.activeemployeescount = u
		},
		updateappendemployees(state, u) {
			if (u.id > 0) {
				let index = state.employees.findIndex(block => block.id == u.id)
				if (index > -1) {
					state.employees.splice(index, 1, u)
				} else
					state.employees.push(u);
			}
		},
		assignemployees(state, u) {
			state.employees = u;
		},
		updateappendactiveemployees(state, u) {
			if (u.id > 0) {
				let index = state.activeemployees.findIndex(block => block.id == u.id)
				if (index > -1) {
					state.activeemployees.splice(index, 1, u)
				} else
					state.activeemployees.push(u);
			}
		},
		assignactiveemployees(state, u) {
			state.activeemployees = u;
		},
		assignemployeescount(state, u) {
			state.employeescount = u;
		},
		assignservicemen(state, u) {
			state.servicemen = u;
		},
		assignproductimages(state, u) {
			state.productimages = u
		},
		assignfetchmessagepayload(state, u) {
			state.fetchmessagepayload = u;
		},
		assignimageid(state, u) {
			state.imageid = u
		},
		assignimagetype(state, u) {
			state.imagetype = u
		},
		assignfilecomponents(state, u) {
			state.filecomponents = u
		},

		assignuploadedimage(state, u) {
			state.uploadedimage = u
		},
		assignmodalshow(state, u) {
			state.modalshow = u
		},
		assigndirectorypath(state, u) {
			state.directorypath = u
		},
		assignproductimagesizes(state, u) {
			state.productimagesizes = u
		},
		assignloadingstatus(state, u) {
			state.loadingstatus = u
		},
		assignselecteduserid(state, u) {
			state.selecteduserid = u;
		},
		assignselectedbannersize(state, u) {
			state.selectedbannersize = u
		},
		assignprofileimage(state, u) {
			state.profileimage = u;
		},
		assignreferraluser(state, u) {
			state.referraluser = u;
		},
		assignidproofs(state, u) {
			state.idproofs = u;
		},
		assignselectedbanner(state, u) {
			state.selectedbanner = u
		},
		assignselectedbannertypeid(state, u) {
			state.selectedbannertypeid = u;
		},
		assignmessages(state, u) {
			state.messages = u;
			let messageobj = state.messages[state.messages.length - 1]
			console.log("Setting the last message id when setting the message")
			console.log(messageobj)
			if (messageobj) {
				state.lastmessageid = messageobj.id
			}
		},
		updatebannerdetails(state, u) {
			let banner = state.bannertypes.find(block => block.labelid == u.bannerid)
			if (typeof banner !== 'undefined') {

				state.bannertypes.splice(bannerindex, 1, u)
			} else {
				state.bannertypes.push(u)
			}
		},
		updatebannertype(state, u) {
			let bannerindex = state.bannertypes.findIndex(block => block.labelid == u.labelid)
			if (bannerindex > -1) {
				state.bannertypes.splice(bannerindex, 1, u)
			} else {
				state.bannertypes.push(u)
			}
		},
		assignbannertypes(state, u) {
			state.bannertypes = u;
		},
		assignremoveitem(state, u) {
			state.removeitems = u;
		},
		assignthreads(state, u) {
			state.threads = u;
		},
		assigneditview(state, u) {
			state.editview = u;
		},
		assignedititem(state, u) {
			state.edititem = u;
		},
		assignsponsertypes(state, u) {
			state.sponsertypes = u;
		},
		assignperpagerecord(state, u) {
			state.perpagerecord = u;
		},
		assigncurrentpage(state, u) {
			state.currentpage = u;
		},
		assignfeature(state, u) {
			state.feature = u;
		},
		assignattributes(state, u) {
			state.attributes = u;
		},
		assigncategories(state, u) {
			state.categories = u;
		},
		addupdatecategory(state, u) {
			let index = state.categories.findIndex(block => block.id == u.id)
			if (index > -1) {
				state.categories.splice(index, 1, u)
			} else
				state.categories.push(u);
		},
		assignviewno(state, u) {
			state.viewno = u;
		},
		assigneditproduct(state, u) {
			state.editproduct = u;
		},
		assignproductstore(state, u) {
			state.productstore = u;
		},
		assignproductlist(state, u) {
			state.productlist = u;
		},
		assignallproducts(state, u) {
			state.allproducts = u;
		},
		assigneditcategory(state, u) {
			state.editcategory = u;
		},
		assignloggedinuser(state, u) {
			state.loggedinuser = u;
		},
		assignproducts(state, u) {
			state.storeproducts = u;
			//change filters on the left side
			assignfiltervalues(state);
			fetchfilterstring(state);
			state.attributeproductcount = updatefilterscount(state);
		},
		assignfilteredproducts(state, u) {
			state.filteredproducts = u;
		},
		assignattributeproductcount(state, u) {
			state.attributeproductcount = u;
		},
		assignfilters(state, u) {
			state.filters = u;
			state.attributeproductcount = updatefilterscount(state);
		},
		assigncartitems(state, u) {
			state.cartitems = u;
		},
		assignfieldjson(state, u) {
			state.fieldjson = u;
		},
		assignbannertypesimages(state, u) {
			state.bannertypeimage = u;
		},
		assignselectedthread(state, u) {
			state.selectedthread = u;
		},
		deletemobile(state, u) {
			if (u.id > 0) {
				let index = state.mobiles.findIndex(block => block.id == u.id)
				if (index > -1) {
					state.mobiles.splice(index, 1)
				}
			} else {
				let index = state.mobiles.findIndex(block => block.mobile == u.mobile)
				if (index > -1) {
					state.mobiles.splice(index, 1)
				}
			}
		},
		updateappendmobile(state, u) {
			if (u.id > 0) {
				let index = state.mobiles.findIndex(block => block.id == u.id)
				if (index > -1) {
					state.mobiles.splice(index, 1, u)
				} else
					state.mobiles.push(u);
			} else {
				let index = state.mobiles.findIndex(block => block.mobile == u.mobile)
				if (index > -1) {
					state.mobiles.splice(index, 1, u)
				} else
					state.mobiles.push(u);
			}
		},
		assignmobiles(state, u) {
			state.mobiles = u;
		},
		assignselectedcustomer(state, u) {
			state.selectedcustomer = u;
		},
		assigncompleteaddress(state, u) {
			state.completeaddress = u
		},
		assignselectedcustomeraddressid(state, u) {
			state.selectedcustomeraddressid = u;
		},
		assignoutsideupstore(state, u) {
			state.outsideupstore = u
		},
		assignallcreatedtaxes(state, u) {
			state.allcreatedtaxes = u;
		},
		assignapplicabletaxes(state, u) {
			state.applicabletaxes = u;
		},
		addcartitem(state, productitem) {
			let item = state.cartitems?.find(block => block.product.id === productitem.id);
			if (typeof item !== 'undefined') {
				let index = state.cartitems.findIndex(block => block.product.id === productitem.id);
				item.quantity = parseInt(1) + parseInt(item.quantity);
				item.collectedtaxes.forEach(function (localitem) {
					localitem.value1 = parseFloat(localitem.unitvalue * item.quantity).toFixed(2)
				})
				item.finalamount = parseFloat(item.price * item.quantity).toFixed(2)
				item.netpricewithouttax = (item.unitpricewithouttaxafterdiscount * item.quantity).toFixed(2)
				state.cartitems.splice(index, 1, item)
			} else {
				item = {}
				// if(state.loggedinuser.companyid==3){
				// 	state.cartitems = [];
				// }
				let pricewithouttax = parseFloat((parseFloat(productitem.sp)) / (1 + (productitem.totaltaxpercent / 100))).toFixed(2)
				item.product = productitem
				item.quantity = 1;
				item.price = productitem.sp
				item.discounts = [];
				let discount = { localid: 1, value: 0, type: 1, unitvalue: 0, netvalue: 0 }
				item.discounts.push(discount)
				//set the all applicable taxes
				item.netpricewithouttax = pricewithouttax
				item.unitpricewithouttax = pricewithouttax
				item.unitpricewithouttaxafterdiscount = pricewithouttax
				item.finalamount = (parseFloat(productitem.sp * item.quantity)).toFixed(2)
				console.log("cartitem push here", item)
				state.cartitems.push(item);
			}
			this.commit("recalculatetaxes")

		},

		recalculatetaxes(state) {
			if (state.cartitems != null) {
				let newcartarray = [];
				state.cartitems.forEach(function (cartitem) {
					let item = {}
					item.product = cartitem.product
					item.quantity = cartitem.quantity;
					item.price = cartitem.price
					item.barcodes = cartitem.barcodes
					item.discounts = cartitem.discounts
					item.unitpricewithouttax = cartitem.unitpricewithouttax
					item.unitpricewithouttaxafterdiscount = cartitem.unitpricewithouttaxafterdiscount
					item.netpricewithouttax = cartitem.netpricewithouttax
					let taxesarrayforproduct = [];
					let self = this
					let productitem = item.product
					if (!state.salepurchaseconfig.setTaxesWithoutPercentComparison ||
						(state.salepurchaseconfig.setTaxesWithoutPercentComparison && state.salepurchaseconfig.setTaxesWithoutPercentComparison == 1)) {
						state.applicabletaxes.forEach(function (localitem) {
							let obj = { labelid: localitem.labelid, value1: 0, percent: 0, ledgeruserid: localitem.id }
							if (productitem != null && productitem.tax != null) {
								let selectedtax = productitem.tax.find(block => block.labelid == localitem.labelid)
								if (typeof selectedtax !== 'undefined') {
									obj.percent = selectedtax.value1
								}
							}
							taxesarrayforproduct.push(obj)
						});
						let pricewithouttax = 0;
						let totaltax = 0;
						// console.log(" taxesarrayforproduct 1",taxesarrayforproduct)
						if (item != null && taxesarrayforproduct != null) {

							pricewithouttax = item.unitpricewithouttaxafterdiscount

							taxesarrayforproduct.forEach(function (localitem) {
								localitem.value1 = parseFloat((pricewithouttax * localitem.percent * item.quantity) / 100).toFixed(2)
								localitem.unitvalue = parseFloat((pricewithouttax * localitem.percent) / 100).toFixed(2)
								localitem.taxablevalue = (pricewithouttax * item.quantity).toFixed(2)
								totaltax = Number(parseFloat(totaltax)) + Number(localitem.unitvalue)
							})

						}
						item.price = parseFloat(Number(item.unitpricewithouttaxafterdiscount) + Number(totaltax))

					} else {
						// console.log("Checking with taxes")
						state.applicabletaxes.forEach(function (localitem) {
							let obj = null
							if (productitem != null && productitem.tax != null) {
								let selectedtax = productitem.tax.find(block => {
									return block.labelid == localitem.labelid && block.percent == localitem.percent
								});
								if (typeof selectedtax !== 'undefined') {
									obj = { labelid: localitem.labelid, value1: 0, percent: 0, ledgeruserid: localitem.id }
									obj.percent = selectedtax.value1
								}
							}
							if (obj && obj != null)
								taxesarrayforproduct.push(obj)
						});

						let pricewithouttax = 0;
						let totaltax = 0;
						if (item != null && taxesarrayforproduct != null) {

							pricewithouttax = item.unitpricewithouttaxafterdiscount

							taxesarrayforproduct.forEach(function (localitem) {
								localitem.value1 = parseFloat((pricewithouttax * localitem.percent * item.quantity) / 100).toFixed(2)
								localitem.unitvalue = parseFloat((pricewithouttax * localitem.percent) / 100).toFixed(2)
								localitem.taxablevalue = (pricewithouttax * item.quantity).toFixed(2)
								totaltax = Number(parseFloat(totaltax)) + Number(localitem.unitvalue)
							})

						}
						item.price = parseFloat(Number(item.unitpricewithouttaxafterdiscount) + Number(totaltax))
					}
					item.finalamount = parseFloat(item.price * cartitem.quantity)



					item.collectedtaxes = taxesarrayforproduct
					console.log("Checking the item with the taxes", item)
					newcartarray.push(item)
				})
				state.cartitems = newcartarray;
			}
			let total = 0;
			if (typeof state.cartitems != undefined && state.cartitems.length > 0) {
				state.cartitems.forEach(function (item, index) {
					total = (parseFloat(item.finalamount) + parseFloat(total)).toFixed(2);
				});
			}
			let newtotal = Math.round(total)
			state.totalnetprice = (newtotal).toFixed(2)
			state.roundoff = (newtotal - total).toFixed(2)
			let hsnbasedtaxes = [];
			console.log(...state.cartitems)
			state.cartitems.forEach(function (item) {
				if (item.collectedtaxes != null) {
					item.collectedtaxes.forEach(function (taxitem) {
						// console.log("Cartitem in index")
						let found = hsnbasedtaxes.find(block => {
							return block.labelid == taxitem.labelid && block.hsn == item.product.hsn
						})
						if (typeof found !== 'undefined') {
							found.value1 = parseFloat(found.value1) + parseFloat(taxitem.value1)
							found.taxablevalue = parseFloat(found.taxablevalue) + parseFloat(taxitem.taxablevalue)
							let foundIndex = hsnbasedtaxes.findIndex(block => {
								return block.labelid == taxitem.labelid && block.hsn == item.product.hsn
							})
							found.value1 = found.value1.toFixed(2)
							hsnbasedtaxes.splice(foundIndex, 1, found)
						} else {
							let obj = { hsn: item.product.hsn, labelid: taxitem.labelid, value1: taxitem.value1, percent: taxitem.percent, taxablevalue: taxitem.taxablevalue }
							hsnbasedtaxes.push(obj)
						}
					})
				}
			})
			state.hsnbasedtaxes = hsnbasedtaxes
		},
		
	},
	actions: {
		fetchbannerimages({ commit }) {
			//let param = {type:2}
			axios.post('banner/images')
				.then(response => commit("assignbannertypesimages", response.data))
				.catch(error => console.log(error));
		},
		triggerNotification({ commit }, payload) {
			commit("ADD_NOTIFICATION", payload);
		},
		fetchregisters({ commit }) {
			axios.get('api/registers')
				.then(response => commit("assignregisters", response.data))
				.catch(error => console.log(error));
		},
		fetchbannertype({ commit }) {
			//let param = {type:2}
			axios.post("api/siteadmin/banner/types/fetch")
				.then(response => commit("assignbannertypes", response.data))
				.catch(error => console.log(error));
		},
		fetchmaster({ commit }) {
			axios.post('api/master/fetch/required')
				.then(response => commit("assignmaster", response.data))
				.catch(error => console.log(error));
		},
		fetchcreditused({ commit }) {
			window.axios.post('api/threads/whatsapp/dashboard')
				.then((response) => commit('assigncreditused', response.data.dashboard))
				.catch((error) => console.log(error))
		},
		fetchemployees({ commit }) {
			let param = { isemployee: 1, active: 0 }
			window.axios.post('api/users/fetch', param)
				.then(response => commit('assignemployees', response.data))
				.catch(error => console.log(error));
		},
		fetchdealers({ commit }) {
			let param = { is_dealer: 1, active: 0 }
			window.axios.post('api/users/fetch', param)
				.then(response => commit('assignemployees', response.data))
				.catch(error => console.log(error));
		},

		fetchemployeescount({ commit }) {
			let param = { isemployee: 1 }
			window.axios.post('api/users/fetch/count', param)
				.then(response => commit('assignemployeescount', response.data))
				.catch(error => console.log(error));
		},
		fetchactiveemployees({ commit }) {
			let param = { isdisabled: 0, isemployee: 1 }
			window.axios.post('api/users/fetch', param)
				.then(response => commit('assignactiveemployees', response.data))
				.catch(error => console.log(error));
		},
		fetchactiveemployeescount({ commit }) {
			let param = { isdisabled: 0, isemployee: 1 }
			window.axios.post('api/users/fetch/count', param)
				.then(response => commit('assignactiveemployeescount', response.data))
				.catch(error => console.log(error));
		},
		getloggedinuser({ commit }) {
			axios.post('api/user/getloggedinuser')
				.then(response => commit("assignloggedinuser", response.data.user))
				.catch(error => console.log(error));
		},
		getlistofcategory({ commit }) {
			axios.post('api/siteadmin/categories/withfilters')
				.then(response => commit("assigncategories", response.data))
				.catch(error => console.log(error));
		},
		fetchallproducts({ commit }) {
			axios.post('api/products')
				.then(response => commit('assignproductlist', response.data))
				.catch(error => console.log(error));
		},
		fetchallcustomers({ commit }) {
			axios.post('api/users/fetch')
				.then(response => commit('assigncustomerlist', response.data))
				.catch(error => console.log(error));
		},
		fetchproducts({ commit, state }) {
			let param = {}
			if (state.productColumns.length > 0) {
				param = { columnnames: state.productColumns, withtablecolumns: state.productWithTables }
			}
			axios.post('api/products/with-selected-columns-tables', param)
				.then(response => commit('assignallproducts', response.data))
				.catch(error => console.log(error));
		},
		fetchproductimagesizes({ commit }) {
			axios.post('api/product/image/size')
				.then(response => commit('assignproductimagesizes', response.data))
				.catch(error => console.log(error));
		},
		fetchattributes({ commit }) {
			axios.get('api/attributes/fetch')
				.then(response => commit('assignattributes', response.data))
				.catch(error => console.log(error));
		},
		fetchcompany({ commit }) {
			let param = { iscompany: 1 }
			console.log("Fetching company")
			axios.post('api/users/company/fetch', param)
				.then(response => commit('assigncompany', response.data))
				.catch(error => console.log(error));
		},
		fetchdealer({ commit }) {
			axios.post('api/poem/fetch/dealer')
				.then(response => commit("assigndealer", response.data))
				.catch(error => console.log(error));

		},
		fetchsubdealer({ commit }) {
			axios.post('api/poem/fetch/subdealer')
				.then(response => commit("assignsubdealer", response.data))
				.catch(error => console.log(error));

		},
		fetchMessages({ commit, state }) {
			if (state.fetchmessagepayload.threadid) {
				axios.post('api/threads/chats', state.fetchmessagepayload)
					.then(response => {
						commit("assignmessages", response.data.threadmessages?.reverse())
					})
					.catch(error => console.log(error));
			}
		},
		fetchDistributors({ commit, state }) {
			console.log("Fetching Di")
			try {
				const { distributor_code, status } = state.distributorSearchCriteria;
				const { currentPage, pageSize } = state.distributorPagination;
				axios.post('api/distributorship/fetch', {
					params: {
						distributor_code,
						status,
						page: currentPage,
						limit: pageSize,
					}
				}).then((response) => {
					console.log(response.data)
					commit('SET_DISTRIBUTORS', response.data.data);
					commit('SET_TOTAL_DISTRIBUTORS', response.data.total);
				})
					.catch(error => console.error('Error fetching distributors:', error))
			} catch (error) {
				console.log(error)
			}
		},
		setDistributorSearchCriteria({ commit, dispatch }, criteria) {
			commit('SET_DISTRIBUTOR_SEARCH_CRITERIA', criteria);
			commit('SET_DISTRIBUTOR_CURRENT_PAGE', 1);
			dispatch('fetchDistributors');
		},
		setDistributorCurrentPage({ commit, dispatch }, page) {
			commit('SET_DISTRIBUTOR_CURRENT_PAGE', page);
			dispatch('fetchDistributors');
		},
		async fetchMeetings({ commit, state }) {
			const { searchDate } = state.meetingSearchCriteria;
			const { currentPage, pageSize } = state.meetingPagination;
			try {
				const response = await axios.post('/api/meeting/fetch', {
					params: {
						date: searchDate,
						page: currentPage,
						limit: pageSize,
					},
				});
				commit('SET_MEETINGS', response.data.meetings);
				commit('SET_TOTAL_MEETINGS', response.data.total);
			} catch (error) {
				console.error('Error fetching meetings:', error);
			}
		},
		setMeetingSearchDate({ commit, dispatch }, date) {
			commit('SET_MEETING_SEARCH_CRITERIA', date);
			commit('SET_MEETING_CURRENT_PAGE', 1);
			dispatch('fetchMeetings');
		},
		setMeetingCurrentPage({ commit, dispatch }, page) {
			commit('SET_MEETING_CURRENT_PAGE', page);
			dispatch('fetchMeetings');
		},
		async fetchFinancingRequests({ commit, state }) {
			const { currentPage, pageSize } = state.financingPagination;
			const { userName, productName, status } = state.financingFilters;
			try {
				const response = await axios.post('/api/financing/fetch', {
					params: {
						page: currentPage,
						limit: pageSize,
						userName,
						productName,
						status,
					},
				});
				commit('SET_FINANCING_REQUESTS', response.data.data);
				commit('SET_TOTAL_FINANCING_REQUESTS', response.data.total);
			} catch (error) {
				console.error('Error fetching financing requests:', error);
			}
		},
		setFinancingCurrentPage({ commit, dispatch }, page) {
			commit('SET_FINANCING_CURRENT_PAGE', page);
			dispatch('fetchFinancingRequests');
		},
		async updateRequestStatus({ commit }, { requestId, status }) {
			try {
				await axios.post(`/api/financing-requests/status`, { requestId, status });
				commit('UPDATE_REQUEST_STATUS', { requestId, status });
			} catch (error) {
				console.error('Error updating request status:', error);
			}
		},
		async updateComplaintsStatus({ commit }, { id, status }) {
			try {
				await axios.post(`/api/complaints/status`, { id, status });
				//   commit('UPDATE_COMPLAINT_STATUS', { id, status });
			} catch (error) {
				console.error('Error updating request status:', error);
			}
		},
		setFinancingFilters({ commit, dispatch }, filters) {
			commit('SET_Financing_FILTERS', filters);
			dispatch('fetchFinancingRequests');
		},

		async fetchDsrTasks({ commit, state }) {
			const { currentPage, pageSize } = state.dsrPagination;
			const { userName, productName, status } = state.dsrFilters;
			try {
				const response = await axios.post("/api/sales/dsr/fetch", {
					params: {
						page: currentPage,
						limit: pageSize,
						userName,
						productName,
						status,
					}, // Pass filters as query parameters
				});
				commit("setDsrTasks", response.data.dsr);
			} catch (error) {
				console.error("Failed to fetch DSR tasks:", error);
			}
		},
		setDSRFilters({ commit, dispatch }, filters) {
			commit('SET_DSR_FILTERS', filters);
			commit('SET_DSR_CURRENT_PAGE', 1);
			dispatch('fetchDsrTasks');
		},
		setDSRCurrentPage({ commit, dispatch }, page) {
			commit('SET_DSR_CURRENT_PAGE', page);
			dispatch('fetchDsrTasks');
		},
		async fetchLeads({ commit, state }) {
			const { currentPage, pageSize } = state.leadPagination;
			// const { userName, productName, status } = state.leadFilters;
			try {
				const response = await axios.post("/api/all/leads/fetch", {
					params: {
						...state.leadFilters, // Use leadFilters for API query
						page: currentPage, // Current page
						limit: pageSize, // Items per page
					},
				});
				commit("SET_LEADS", response.data.data); // Assuming API returns an array of leads
				commit("setPagination", {
					page: currentPage,
					limit: pageSize,
					total: response.data.total, // Total items
				});
			} catch (error) {
				console.error("Failed to fetch leads:", error);
			}
		},
		setLeadFilters({ commit, dispatch }, filters) {
			commit('SET_LEAD_FILTERS', filters);
			commit('SET_LEAD_CURRENT_PAGE', 1);
			dispatch('fetchLeads');
		},
		setLeadCurrentPage({ commit, dispatch }, page) {
			commit('SET_LEAD_CURRENT_PAGE', page);
			dispatch('fetchLeads');
		},
		// fetchServiceMen({commit}){
		// 	let param = {isservicemen:1,active:0,iscustomer:1,isregister:0,iscompany:0}
		// 	window.axios.post('api/users/fetch',param)
		// 		.then(response=>commit('assignservicemen',response.data))
		// 		.catch(error=>console.log(error));
		// },
		async fetchComplains({ commit, state }) {
			try {
				const response = await axios.post("/api/complaints/all", {
					params: {
						...state.complainFilters, // Apply filters
						current_page: state.complainPagination.current_page, // Current page
						limit: state.complainPagination.limit, // Items per page
					},
				});
				commit("setComplains", response.data.data); // Assuming API returns a list of complaints
				commit("setComplainPagination", {
					current_page: response.data.current_page,
					limit: response.data.per_page,
					total: response.data.total, // Total items
				});
			} catch (error) {
				console.error("Failed to fetch complaints:", error);
			}
		},
		async addDsrTask({ commit, state }) {
			console.log(state.newTask)
			try {
				const response = await axios.post("/api/sales/dsr/apply", state.newTask);
				alert('Save successfully')
			} catch (error) {
				console.error("Failed to add DSR task:", error);
			}
		},
		async updateDsrTask({ commit, state }) {
			console.log(state.newTask)
			try {
				const response = await axios.post("/api/sales/dsr/update", state.newTask);
				alert('Update successfully')
			} catch (error) {
				console.error("Failed to add DSR task:", error);
			}
		},
		setPage({ commit, dispatch }, current_page) {
			commit("setComplainPagination", {
				current_page,
				limit: this.state.complainPagination.limit,
				total: this.state.complainPagination.total,
			});
			dispatch("fetchComplains");
		},
		async fetchSalesOrders({ commit, state }) {
			const params = {
				...state.salesOrderFilters,
				page: state.salesOrderPagination.currentPage,
				perPage: state.salesOrderPagination.perPage,
			};

			try {
				const response = await axios.post("/api/sales-orders", { params });
				commit("SET_SALES_ORDERS", response.data.data);
				commit("SET_SALES_ORDER_PAGINATION", {
					currentPage: response.data.current_page,
					perPage: response.data.per_page,
					total: response.data.total,
				});
			} catch (error) {
				console.error("Error fetching sales orders:", error);
			}
		},
		async fetchDispatchOrders({ commit, state }) {
			const params = {
				...state.salesOrderFilters,
				page: state.salesOrderPagination.currentPage,
				perPage: state.salesOrderPagination.perPage,
			};

			try {
				const response = await axios.post("/api/sales-orders", { params });
				commit("SET_SALES_ORDERS", response.data.data);
				commit("SET_SALES_ORDER_PAGINATION", {
					currentPage: response.data.current_page,
					perPage: response.data.per_page,
					total: response.data.total,
				});
			} catch (error) {
				console.error("Error fetching sales orders:", error);
			}
		},
		async fetchCustomers({ commit, state }) {
			const params = {
				...state.customerFilters,
				page: state.customersPagination.currentpage,
				perPage: state.customersPagination.noofrec,
			};

			try {
				const response = await axios.post("/api/customers/fetch", params);
				commit("SET_CUSTOMERS", response.data.customers);
				commit("SET_CUSTOMER_PAGINATION", {
					total: response.data.count
				})

			} catch (error) {
				console.error("Error fetching sales orders:", error);
			}
		},
		async fetchSalesMen({ commit, state }) {
			const params = {
				...state.salesmenFilters,
				page: state.salesmenPagination.currentpage,
				perPage: state.salesmenPagination.noofrec,
			};

			try {
				const response = await axios.post("/api/salesmen/fetch", params);
				commit("SET_SALESMEN", response.data.salesmen);
				commit("SET_SALESMEN_PAGINATION", {
					total: response.data.count
				})

			} catch (error) {
				console.error("Error fetching sales orders:", error);
			}
		},
		async fetchServiceMen({ commit, state }) {
			const params = {
				...state.servicemenFilters,
				page: state.servicemenPagination.currentpage,
				perPage: state.servicemenPagination.noofrec,
			};

			try {
				const response = await axios.post("/api/customers/fetch", params);
				commit("SET_SERVICEMEN", response.data.customers);
				// commit("SET_SERVICEMEN_PAGINATION", {
				// 	total: response.data.count
				// })

			} catch (error) {
				console.error("Error fetching sales orders:", error);
			}
		},

		async fetchPurchaseCourses({ commit, state }) {
			const params = {
				...state.purchaseCoursesFilters,
				page: state.purchaseCoursesPagination.currentpage,
				perPage: state.purchaseCoursesPagination.noofrec,
			};
			try {
				const response = await axios.post("/api/purchase/courses/bycustomer", params);
				commit("SET_PURCHASE_COURSES", {
					allexams: response.data.allexams,
					purchaselist: response.data.purchaselist,
					series: response.data.series,
					products: response.data.products
				});
				commit("SET_PURCHASE_COURSES_PAGINATION", {
					total: response.data.count
				})


			} catch (error) {
				console.error("Error fetching sales orders:", error);
			}
		},
		async updateUsersColumn({ commit, state }) {
			const params = {
				id: state.updateUser.id,
				column: state.updateUser.column,
				value: state.updateUser.value,
			}
			try {
				const response = await axios.post("/api/user/updatefield", params);
				// console.log(response)
				// if (response.data) {
				// 	if (state.updateUser.value == 1 || state.updateUser.value == '1') {
				// 		dispatch('fetchCustomers')
				// 	} else {
				// 		if (state.updateUser.column == 'issalesmen') {
				// 			dispatch('fetchSalesMen')
				// 		} else if (state.updateUser.column == 'isservicemen') {
				// 			dispatch('fetchServiceMen')
				// 		}
				// 	}
				// }
			} catch (error) {
				console.error("Error updating field:", error);

			}
		},
		async fetchSalesOrderDetails({ commit, state }) {
			// const params = {
			// 	transactionid: state.salesOrderDetailFilters.transactionid,
			//   page: state.salesOrderDetailPagination.currentPage,
			//   perPage: state.salesOrderDetailPagination.perPage,
			// };
			// console.log("params ",params)
			let transactionid = state.salesOrderDetailFilters.transactionid

			try {
				const response = await axios.post("/api/cotransaction/details", { transactionid });
				console.log("response", response.data.transactiondetails)
				commit("SET_SALES_ORDER_DETAILS", response.data.transactiondetails);
				commit("SET_SALES_ORDER_TRANSACTION", response.data.transaction);
				//   commit("SET_SALES_ORDER_DETAIL_PAGINATION", {
				// 	currentPage: response.data.current_page,
				// 	perPage: response.data.per_page,
				// 	total: response.data.total,
				//   });
			} catch (error) {
				console.error("Error fetching sales orders:", error);
			}
		},
		async fetchDispatchDetails({ commit, state }) {
			let transactionid = state.dispatchDetailFilters.transactionid
			try {
				const response = await axios.post("/api/dispatch/transaction/details", { transactionid });
				console.log("response", response.data.transactiondetails)
				commit("SET_DISPATCH_DETAILS", response.data.transactiondetails);
				commit("SET_DISPATCH_TRANSACTION", response.data.transaction);
				//   commit("SET_SALES_ORDER_DETAIL_PAGINATION", {
				// 	currentPage: response.data.current_page,
				// 	perPage: response.data.per_page,
				// 	total: response.data.total,
				//   });
			} catch (error) {
				console.error("Error fetching sales orders:", error);
			}
		},
		async fetchDispatches({ commit, state }) {
			const params = {
				...state.dispatchFilters,
				page: state.dispatchPagination.page,
				perPage: state.dispatchPagination.perPage,
			};

			const response = await axios.post('/api/dispatches/fetch', { params });
			const { data, meta } = response.data;

			commit('SET_DISPATCHES', data);
			commit('SET_DISPATCH_PAGINATION', {
				page: meta?.current_page,
				perPage: meta?.per_page,
				total: meta?.total,
			});
		},
		fetchUserCreatedTaxes({ commit }) {
			let param = {
				outsidestate: this.state.outsideupstore,
				setTaxesWithoutPercentComparison: this.state.salepurchaseconfig.setTaxesWithoutPercentComparison
			}
			axios.post('api/taxes/fetch', param)
				.then(response => {
					commit("assignallcreatedtaxes", response.data.taxes)
					commit("assignapplicabletaxes", response.data.taxes)
					commit("recalculatetaxes")
				})
				.catch(error => console.log(error));
		}

	},

	getters: {
		dispatches: (state) => state.dispatches,
		dispatchPagination: (state) => state.dispatchPagination,
		dispatchFilters: (state) => state.dispatchFilters,
		complainFilters: (state) => state.complainFilters,
		complainPagination: (state) => state.complainPagination,
		leadFilters: (state) => state.leadFilters,
		financingRequests: (state) => state.financingRequests,
		financingPagination: (state) => state.financingPagination,
		financingFilters: (state) => state.financingFilters,
		meetings: (state) => state.meetings,
		meetingPagination: (state) => state.meetingPagination,
		meetingSearchCriteria: (state) => state.meetingSearchCriteria,
		distributorPagination: (state) => state.distributorPagination,

		distributorSearchCriteria: (state) => state.distributorSearchCriteria,
		examDetails: (state) => state.examDetails,
		distributors: state => {
			return state.distributors
		},
		mastervalidation: state => {
			return state.mastervalidation
		},
		Ckeditortext: state => {
			return state.Ckeditortext;
		},
		selectcategoriesitem: state => {
			return state.selectcategoriesitem;
		},
		addpageheading: state => {
			return state.addpageheading;
		},
		list: state => {
			return state.list
		},
		uploadids: state => {
			return state.uploadids;
		},
		accessoperations: state => {
			return state.accessoperations
		},
		accessforcompany: state => {
			return state.accessforcompany
		},
		filecomponents: state => {
			return state.filecomponents;
		},
		company: state => {
			return state.company;
		},
		addressess: state => {
			return state.addressess;
		},
		selectedaddress: state => {
			return state.selectedaddress;
		},
		master: state => {
			return state.master
		},
		mobiles: state => {
			return state.mobiles;
		},
		templates: state => {
			return state.templates;
		},
		accessmodules: state => {
			return state.accessmodules
		},
		activeemployeescount: state => {
			return state.activeemployeescount;
		},
		employeescount: state => {
			return state.employeescount;
		},
		activeemployees: state => {
			return state.activeemployees;
		},
		employees: state => {
			return state.employees;
		},
		productimages: state => {
			return state.productimages;
		},
		imageid: state => {
			return state.imageid
		},
		imagetype: state => {
			return state.imagetype
		},
		uploadedimage: state => {
			return state.uploadedimage
		},
		modalshow: state => {
			return state.modalshow
		},
		directorypath: state => {
			return state.directorypath
		},
		productimagesizes: state => {
			return state.productimagesizes
		},
		selectedbannersize: state => {
			return state.selectedbannersize
		},
		selectedbanner: state => {
			return state.selectedbanner
		},
		loadingstatus: state => {
			return state.loadingstatus
		},
		selectedbannertypeid: state => {
			return state.selectedbannertypeid
		},
		bannertypes: state => {
			return state.bannertypes;
		},
		loggedinuser: state => {
			return state.loggedinuser;
		},
		allproducts: state => {
			return state.allproducts;
		},
		sponsertypes: state => {
			return state.sponsertypes;
		},
		feature: state => {
			return state.feature;
		},
		editview: state => {
			return state.editview
		},
		bannertypeimage: state => {
			return state.bannertypeimage;
		},
		viewno: state => {
			return state.viewno;
		},
		websitecount: state => {
			return state.websitecount;
		},
		phonecount: state => {
			return state.phonecount;
		},
		editproduct: state => {
			return state.editproduct;
		},
		editcategory: state => {
			return state.editcategory;
		},
		productstore: state => {
			return state.productstore;
		},
		categories: state => {
			return state.categories;
		},
		attributes: state => {
			return state.attributes;
		},
		perpagerecord: state => {
			return state.perpagerecord;
		},
		removeitems: state => {
			return state.removeitems;
		},
		edititem: state => {
			return state.edititem;
		},
		currentpage: state => {
			return state.currentpage;
		},
		filteredproducts: state => {
			return state.filteredproducts
		},
		selecteduserid: state => {
			return state.selecteduserid
		},
		dealer: state => {
			return state.dealer;
		},
		subdealer: state => {
			return state.subdealer;
		},
		buttonarray: state => {
			return state.buttonarray;
		},
		buttondata: state => {
			return state.buttondata;
		},
		threads: state => {
			return state.threads;
		},
		selectedthread: state => {
			return state.selectedthread;
		},
		messages: state => {
			return state.messages
		},
		fetchmessagepayload: state => {
			return state.fetchmessagepayload;
		},
		creditused: state => {
			return state.creditused
		},
		servicemen: state => {
			return state.servicemen
		},
		newTask: state => {
			return state.newTask
		},
		fieldjson: state => {
			return state.fieldjson
		},
		uplaodeddocument: state => {
			return state.uplaodeddocument
		},
		registers: state => {
			return state.registers
		}, 
		productlist: state => {
			return state.productlist
		},
		customerlist: state => {
			return state.customerlist
		},
		applicabletaxes: state => {
			return state.applicabletaxes
		},
		allcreatedtaxes: state => {
			return state.allcreatedtaxes
		},
		selectedcustomeraddressid: state => {
			return state.selectedcustomeraddressid;
		},
		selectedcustomer: state => {
			return state.selectedcustomer
		},
		completeaddress: state => {
			return state.completeaddress;
		},
		outsideupstore: state => {
			return state.outsideupstore
		}, 
		finance: state => {
			return state.finance
		}, 
		cartitems: state => {
			return state.cartitems
		}, 
		totalnetprice: state => {
			return state.totalnetprice
		},
		amountwithouttax: state => {
			return state.amountwithouttax
		},

	}
})

