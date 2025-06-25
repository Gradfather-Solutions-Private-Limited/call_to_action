<script>
import { mapGetters } from 'vuex'
export default {
	data() {
		return {
			URL_PREFIX: window.axios.defaults.baseURL,
			IMAGE_TYPES: { 1: 'Category', 2: 'Product', 3: 'Attributes', 4: 'Banner' },
			page: 1,
			noofrecords: 10,
			noofpages: 0,
			MASTER_CITIES: 11,
			MASTER_TAXES: 14,
			MASTER_STATES: 17,
			CGST_LABELID: 1,
			SGST_LABELID: 2,
			IGST_LABELID: 3,
			MASTER_ID_PROOF_TYPE: 10,
			MASTER_GENDER: 5,
			MASTER_RELIGION: 6,
			MASTER_MARITAL_STATUS: 9,
			FONT_TYPES: [
				{ id: 1, name: 'English', font: "Arial, sans-serif" },
				{ id: 2, name: 'Hindi (Kurti Dev)', font: "Kurti Dev" },
				{ id: 3, name: 'Hindi (Remington Gail)', font: "Remington Gail" },
				{ id: 4, name: 'Hindi (Mangal)', font: "Mangal" },
			],
			TEXT_TYPES: [
				{ id: 1, name: 'Typing' },
				{ id: 2, name: 'Shorthand' },
			],
			PURPOSE: [
				{ id: 1, name: 'Unloading' },
				{ id: 2, name: 'Loading' },
				{ id: 3, name: 'Transport' }
			],
			MATERIAL: [
				{ id: 1, name: 'D.O.R.B' },
				{ id: 2, name: 'Cement' },
				{ id: 3, name: 'Sand' },
				{ id: 4, name: 'Other' }
			],
			UNIVERSITY_COURSES : [
				{'id':1, 'name':'Industrial Training Institute (I.T.I)'},
				{'id':2, 'name':'Polytechnic'},
				{'id':3, 'name':'Bachelor of Technology (B.Tech)'},
				{'id':4, 'name':'Diploma in Elementary Education (D.El.Ed)'},
				{'id':5, 'name':'Bachelor of Education (B.Ed)'},
				{'id':6, 'name':'Paramedical'},
				{'id':7, 'name':'Pharmacy'},
				{'id':8, 'name':'General Nursing and Midwifery (GNM-Nursing)'},
				{'id':9, 'name':'Bachelor of Science in Nursing (B.Sc Nursing)'},
				{'id':10, 'name':'Bachelor of Medicine, Bachelor of Surgery (M.B.B.S)'},
			],
			BANKS: [
				{
					"bankName": "INDIAN BANK",
					"instructedAgentCode": "IDIB"
				},
				{
					"bankName": "UNION BANK OF INDIA",
					"instructedAgentCode": "UBIN"
				},
				{
					"bankName": "INDUSIND BANK",
					"instructedAgentCode": "INDB"
				},
				{
					"bankName": "SBM BANK INDIA LTD",
					"instructedAgentCode": "STCB"
				},
				{
					"bankName": "DHANALAXMI BANK",
					"instructedAgentCode": "DLXB"
				},
				{
					"bankName": "CENTRAL BANK OF INDIA",
					"instructedAgentCode": "CBIN"
				},
				{
					"bankName": "YES BANK",
					"instructedAgentCode": "YESB"
				},
				{
					"bankName": "KOTAK MAHINDRA BANK LTD",
					"instructedAgentCode": "KKBK"
				},
				{
					"bankName": "CANARA BANK",
					"instructedAgentCode": "CNRB"
				},
				{
					"bankName": "IDBI BANK",
					"instructedAgentCode": "IBKL"
				},
				{
					"bankName": "CSB BANK LIMITED",
					"instructedAgentCode": "CSBK"
				},
				{
					"bankName": "UJJIVAN SMALL FINANCE BANK LTD",
					"instructedAgentCode": "USFB"
				},
				{
					"bankName": "AIRTEL PAYMENTS BANK LTD",
					"instructedAgentCode": "AIRP"
				},
				{
					"bankName": "BANK OF MAHARASHTRA",
					"instructedAgentCode": "MAHB"
				},
				{
					"bankName": "FEDERAL BANK",
					"instructedAgentCode": "FDRL"
				},
				{
					"bankName": "KARNATAKA BANK LTD",
					"instructedAgentCode": "KARB"
				},
				{
					"bankName": "IDFC FIRST BANK LTD",
					"instructedAgentCode": "IDFB"
				},
				{
					"bankName": "CITIBANK N A",
					"instructedAgentCode": "CITI"
				},
				{
					"bankName": "RBL BANK LIMITED",
					"instructedAgentCode": "RATN"
				},
				{
					"bankName": "PAYTM PAYMENTS BANK LTD",
					"instructedAgentCode": "PYTM"
				},
				{
					"bankName": "PUNJAB NATIONAL BANK",
					"instructedAgentCode": "PUNB"
				},
				{
					"bankName": "ICICI BANK LTD",
					"instructedAgentCode": "ICIC"
				},
				{
					"bankName": "THE SOUTH INDIAN BANK LIMITED",
					"instructedAgentCode": "SIBL"
				},
				{
					"bankName": "STATE BANK OF INDIA",
					"instructedAgentCode": "SBIN"
				},
				{
					"bankName": "DBS BANK INDIA LTD",
					"instructedAgentCode": "DBSS"
				},
				{
					"bankName": "DEUTSCHE BANK AG",
					"instructedAgentCode": "DEUT"
				},
				{
					"bankName": "STANDARD CHARTERED BANK",
					"instructedAgentCode": "SCBL"
				},
				{
					"bankName": "TAMILNAD MERCANTILE BANK LTD",
					"instructedAgentCode": "TMBL"
				},
				{
					"bankName": "JANA SMALL FINANCE BANK LTD",
					"instructedAgentCode": "JSFB"
				},
				{
					"bankName": "AU SMALL FINANCE BANK",
					"instructedAgentCode": "AUBL"
				},
				{
					"bankName": "EQUITAS SMALL FINANCE BANK LTD",
					"instructedAgentCode": "ESFB"
				},
				{
					"bankName": "HDFC BANK LTD",
					"instructedAgentCode": "HDFC"
				},
				{
					"bankName": "DCB BANK LTD",
					"instructedAgentCode": "DCBL"
				},
				{
					"bankName": "AXIS BANK",
					"instructedAgentCode": "UTIB"
				},
				{
					"bankName": "BANK OF BARODA",
					"instructedAgentCode": "BARB"
				},
				{
					"bankName": "THE JAMMU AND KASHMIR BANK LTD",
					"instructedAgentCode": "JAKA"
				},
				{
					"bankName": "INDIAN OVERSEAS BANK",
					"instructedAgentCode": "IOBA"
				},
				{
					"bankName": "CITY UNION BANK LTD",
					"instructedAgentCode": "CIUB"
				},
				{
					"bankName": "THE HONGKONG AND SHANGHAI BANKING CORPORATION LTD",
					"instructedAgentCode": "HSBC"
				},
				{
					"bankName": "ANDHRA PRAGATHI GRAMEENA BANK",
					"instructedAgentCode": "APGB"
				},
				{
					"bankName": "THE COSMOS CO-OPERATIVE BANK LTD",
					"instructedAgentCode": "COSB"
				},
				{
					"bankName": "THE VARACHHA CO OP BANK LTD",
					"instructedAgentCode": "VARA"
				},
				{
					"bankName": "BANDHAN BANK LTD",
					"instructedAgentCode": "BDBL"
				},
				{
					"bankName": "KARUR VYSA BANK",
					"instructedAgentCode": "KVBL"
				},
				{
					"bankName": "KARNATAKA VIKAS GRAMEENA BANK",
					"instructedAgentCode": "KVGB"
				},
				{
					"bankName": "UCO BANK",
					"instructedAgentCode": "UCBA"
				},
				{
					"bankName": "ESAF SMALL FINANCE BANK LTD",
					"instructedAgentCode": "ESAF"
				},
				{
					"bankName": "SURYODAY SMALL FINANCE BANK LTD",
					"instructedAgentCode": "SURY"
				},
				{
					"bankName": "FINCARE SMALL FINANCE BANK LTD",
					"instructedAgentCode": "FINF"
				},
				{
					"bankName": "THE KALUPUR COMMERCIAL CO OP BANK",
					"instructedAgentCode": "KCCB"
				},
				{
					"bankName": "THE CHEMBUR NAGARIK SAHAKARI BANK",
					"instructedAgentCode": "CNSX"
				},
				{
					"bankName": "SHIVALIK SMALL FINANCE BANK LTD",
					"instructedAgentCode": "SHIX"
				},
				{
					"bankName": "KURLA NAGARIK SAHAKARI BANK LTD",
					"instructedAgentCode": "KNSB"
				},
				{
					"bankName": "CAPITAL SMALL FINANCE BANK LTD",
					"instructedAgentCode": "CLBL"
				},
				{
					"bankName": "THE ADARSH CO OP URBAN BANK LTD",
					"instructedAgentCode": "ACUX"
				},
				{
					"bankName": "THE JUNAGADH COMMERCIAL CO OP BANK LTD",
					"instructedAgentCode": "JUCX"
				},
				{
					"bankName": "THE SURAT PEOPLES CO OP BANK LTD",
					"instructedAgentCode": "SPCB"
				},
				{
					"bankName": "THE ZOROASTRIAN CO OP BANK LTD",
					"instructedAgentCode": "ZCBL"
				},
				{
					"bankName": "THE NATIONAL CO OP BANK LTD",
					"instructedAgentCode": "NCBL"
				},
				{
					"bankName": "MAHESH SAHAKARI BANK LTD PUNE",
					"instructedAgentCode": "MHSX"
				},
				{
					"bankName": "RAJARSHI SHAHU SAHAKARI BANK LTD",
					"instructedAgentCode": "RSSX"
				},
				{
					"bankName": "BANK OF INDIA",
					"instructedAgentCode": "BKID"
				},
				{
					"bankName": "PUNJAB AND SIND BANK",
					"instructedAgentCode": "PSIB"
				},
				{
					"bankName": "JIO PAYMENTS BANK LTD",
					"instructedAgentCode": "JIOP"
				},
				{
					"bankName": "UTKARSH SMALL FINANCE BANK LTD",
					"instructedAgentCode": "UTKS"
				},
				{
					"bankName": "NSDL PAYMENTS BANKS LTD",
					"instructedAgentCode": "NSPB"
				}
			],
		}
	},
	computed: {
		...mapGetters([
			'uploadedimage', 'categories', 'modalshow', 'master', 'loggedinuser'
		]),
	},
	// mounted() {
	// 	this.$store.dispatch("fetchmaster")
	// },
	methods: {
		triggeredit(item, routes) {
			this.$store.commit('assignedititem', item)
			this.$router.push({ name: routes })
		},
		accessid(id) {
			// let idwithcomma  = ','+id;

			if (this.loggedinuser?.role == 3) {
				return true;
			}
			if (this.loggedinuser != null) {
				if (this.loggedinuser.accessids != null && this.loggedinuser.accessids.includes(id)) {
					console.log('accessids')
					console.log(id);
					return true
				} else {
					return false;
				}
			} else {
				return false
			}
		},
		getcategorynamebyid(category, flag) {
			if (category != null) {
				var newcategory = category.split(",");
				let categoryname = '';
				for (var i = 0; i < newcategory.length; i++) {
					let string = this.categories.find(c => c.id == newcategory[i]);
					if (string != null) {
						categoryname += string.name + ',';
					}
				}
				return categoryname;
			}
		},
		getimageurl(imageitem) {
			//return window.axios.defaults.baseURL+"/products/"+imageitem.id+'/'+this.size+'x'+this.size+'/'+item.url+"-"+imageitem.id+".jpg";
			return window.axios.defaults.baseURL + "/uploads/" + imageitem.name;
		},
		// removeimages(item){
		// 	let item2 = '';
		// 	if(this.item){
		// 	 	item2 =  this.item;
		// 	}else{
		// 	 	item2 =  item;
		// 	}
		// 	this.$store.commit('assignremoveitem',item2)
		// 	this.$modal.show('imageremovemodal');
		// },
		removeimages(item) {
			if (confirm("Do you really want to delete") == true) {
				let param = { imageid: item.id }
				axios.post("api/siteadmin/image/remove", param)
					.then(response => this.processRemoveImageResponse(response.data))
					.catch(error => console.log(error))
			}
		},
		processRemoveImageResponse() {
			location.reload();
		},
		getMasterLabelByType(labelid, type) {
			let param = { labelid: labelid, type: type }
			let found = this.master.find(function (item) {
				for (var key in param) {
					if (item[key] === undefined || item[key] != param[key])
						return false;
				}
				return true;
			})
			if (typeof found !== 'undefined')
				return found.label
			return labelid
		},
		getmastertype(type) {

			let types = this.master.filter(a => a.type == type)
			return types;
		},
		// triggerimagemodal(item){
		// 	let item2 = '';
		// 	if(this.item){
		// 	 	item2 =  this.item;
		// 	}else{
		// 	 	item2 =  item;
		// 	}
		// 	this.$store.commit('assignedititem',item2)
		// 	this.$modal.show('imagemodal');
		// },
		triggerimagemodal(item, directorypath, type) {
			this.$store.commit('assignedititem', item)
			this.$store.commit('assignimageid', item.id)
			this.$store.commit('assignimagetype', type)
			this.$store.commit('assigndirectorypath', directorypath)
			this.$store.commit('assignmodalshow', true)
		},
		triggerimagemodal2(typeid, directorypath, type, counter, size) {

			let obj = { 'width': size.w, 'height': size.h, 'type': type, 'directorypath': directorypath, 'counter': counter, 'typeid': typeid }
			this.$store.commit('assignfilecomponents', obj);
			this.$store.commit('assignmodalshow', true)
		},
		allprod() {
			let param = { cat_id: this.categories.id }
			axios.post('api/getdate/all', param)
				// this.getdata = item;
				.then(response => this.proccessGetallresponse(response.data))
				.catch(error => console.log(error));

		},
		proccessGetallresponse(data) {
			// console.log("data", data)
			this.alldata = data;
			this.$store.commit('assignproductstore', data);
		},
		prefixinurl(url) {
			return "http://localhost/dwainindia/public" + "/" + url;
		},
		prefixinurl2(url1, url) {
			return window.axios.defaults.baseURL + "/" + url1 + "/" + url;
		},
		prefixinurl3(url1, url, url2) {
			return window.axios.defaults.baseURL + "/" + url1 + "/" + url + "/" + url2;
		},
		constantsprocessFile(event) {
			var options = { headers: { 'Content-Type': 'multipart/form-data' } };
			let formData = new FormData();
			formData.append('file', event.target.files[0]);
			axios.post('api/upload/image', formData, options)
				.then((response) => {
					this.$store.commit('assignuploadedimage', response.data);
				}).catch((err) => {
					console.log('Error in loading image to the server', err)
				});
		},
		uploaded() {
			this.$router.back();
		},
		getSelectedIdsFromMasterType(ids, type) {
			console.log('-----master');
			console.log(ids);
			console.log(type);
			let types = this.master.filter(a => a.type == type)
			console.log('types', types);
			let found = types.filter(a => ids.includes(a.labelid))
			console.log('found', found);
			return found;
		},
		completeurlofuploadedfile(image) {
			if (image == null) {
				return this.prefixinurl(this.uploadedimage.path + "/" + this.uploadedimage.name);
			}
			return this.prefixinurl(image.path + "/" + image.name);
		},
		getproductcustomproducturl(item) {
			if (item.product.id == 1) {
				return this.prefixinurl("prescription/pay?customproductid=" + item.customproduct.id)
			}
			return this.prefixinurl(item.product.url)
		},
		getproductcustomproductprice(item) {
			if (item.product.id == 1) {
			}
			return item.product.sp_price
		},
		getproductname(product) {
			return product.name
		},
		mobilenoValidation() {
			self = this
			self.mobileno = self.mobileno.toString().replace(/\D/g, '')
			if (self.mobileno?.length > 10) {
				self.mobileno = self.mobileno.slice(0, 10)
			}
		},
		getCurrentDate() {
			const currentDate = new Date();
			const year = currentDate.getFullYear();
			const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
			const day = String(currentDate.getDate()).padStart(2, '0');
			const formattedDate = `${year}-${month}-${day}`;
			return formattedDate;
		},
		checkValidation(validator, inputvalues) {
			let secondarray = {};
			validator.map(function (value) {
				if (inputvalues[value] == '') {
					secondarray[value] = 'The ' + value + ' field is required';
				}
			});
			this.$store.commit('storemastervalidation', secondarray);
		},
		getEmployeeList(param){
			 axios.post('api/users/fetch', param).then(response => {
                console.log('data', response.data);
                this.$store.commit('assignemployees', response.data);
            })
                .catch((error) => {
                    console.log('Failed to fetch employee list', error);
                });
		}
	}
}
</script>