<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
export default {
	data(){
		return {
			URL_PREFIX:window.axios.defaults.baseURL,
			IMAGE_TYPES:{1:'Category',2:'Product',3:'Attributes',4:'Banner'},
			request_type:[{id:1,value:'QUERY'},{id:2,value:'Complaint'},{id:3,value:'Feedback'},{id:4,value:'ORDER'}],
			COMPANY_MASTER_PROFESSION:1,
			COMPANY_MASTER_STAY_TYPE:2,
			COMPANY_CUSTOMER_REFRENCE:3,
			COMPANY_LEAD_NATURE:5,
			MASTER_BRANCH_TYPE:4,
			MASTER_GENDER:5,
			MASTER_RELIGION:6,
			MASTER_OCCUPATION_TYPE:7,
			MASTER_REGISTRATION_TYPE:8,
			MASTER_MARITAL_STATUS:9,
			MASTER_ID_PROOF_TYPE:10,
			MASTER_CITIES:11,
			MASTER_RECURRING_TYPES:12,
			MASTER_RELATIONSHIP_TYPES:15,
			MASTER_ZONE_TYPES:16,
			WORK_ADDRESS_TYPE:2,
			MASTER_TAXES:14,
			CGST_LABELID:1,
			SGST_LABELID:2,
			IGST_LABELID:3,
			CASHUSERID:2,
			MASTER_DOCUMENT:18,
			MASTER_RESIDENCE:19,
			MASTER_BANK:21,
			QUALIFICATION_TYPE:22,
			APPLY_FOR_POSITION:23,
			WORK_TIME:24,
			TRANSACTION_TYPE:{1:"Purchase",2:"Sale",3:"Payment Received",4:"Payment Given",5:"Transfer Out",6:"Transfer In",7:"Expenses",8:"Opening Stock",10:"Modified Stock",11:"Modified Ledger",9:"Reg. Transfered",13:"Created",14:"Commission Given"},
		}
	},
	computed:{
		...mapGetters([
			'uploadedimage','categories','master','customers','employees','schemes','loggedinuser','categories','companymaster'
		]),
	},
	methods:{
		reset(){
			this.$store.commit('assignselectedaddress',null)
            this.$store.commit('assignmobiles',[])
            this.$store.commit('assignaddressess',[])
            this.$store.commit('assignprofileimage',null)
            this.$store.commit('assignidproofs',[])
			this.$store.commit('assignreferraluser',null)
			this.$store.commit('assignedititem',null)
			//this.$store.commit('assignselectbrandname',null)
			//this.$store.commit('assignselectbrandname',[])
		},
		triggeredit(item){
        	this.$store.commit('assignviewno',2)
        	this.$store.commit('assignedititem',item)
        },
		triggerimagemodal(item,directorypath){
			this.$store.commit('assignedititem',item)
			this.$store.commit('assigndirectorypath',directorypath)
        	this.$modal.show('imagemodal');
        },
		getMasterLabelByType(labelid,type){
			let param = {labelid:labelid,type:type}
			let found = this.master.find(function(item) {
				for (var key in param) {
					if (item[key] === undefined || item[key] != param[key])
						return false;
				}
				return true;
			})
			if(typeof found!=='undefined')
				return found.label
			return labelid
		},
		getSelectedIdsFromMasterType(ids,type){
			let types = this.master.filter(a=>a.type==type)
			let found = types.filter(a=>ids.includes(a.labelid))
			return found;
		},
		getmastertype(type){
			let types = this.master.filter(a=>a.type==type)
			return types;
		},
		getCompanyMasterLabelByType(labelid,type){
			let param = {labelid:labelid,type:type}
			let found = this.companymaster.find(function(item) {
				for (var key in param) {
					if (item[key] === undefined || item[key] != param[key])
						return false;
				}
				return true;
			})
			if(typeof found!=='undefined')
				return found.label
			return labelid
		},
		getSelectedIdsFromCompanyMasterType(ids,type){
			let types = this.companymaster.filter(a=>a.type==type)
			let found = types.filter(a=>ids.includes(a.labelid))
			return found;
		},
		getcompanymastertype(type){
			let types = this.companymaster.filter(a=>a.type==type)
			return types;
		},
		allprod(){
			let param = {cat_id: this.categories.id}
            axios.post('api/getdate/all',param)
            // this.getdata = item;
            .then(response=>this.proccessGetallresponse(response.data))
            .catch(error=>console.log(error));
            
        },
        proccessGetallresponse(data){
            // console.log("data", data)
            this.alldata = data;
            this.$store.commit('assignproductstore',data);
        },
		prefixinurl(url){
		    return "http://localhost/dwainindia/public"+"/"+url;
		},
		prefixinurl2(url1,url){
		    return window.axios.defaults.baseURL+"/"+url1+"/"+url;
		},
		prefixinurl3(url1,url,url2){
		    return window.axios.defaults.baseURL+"/"+url1+"/"+url+"/"+url2;
		},
		constantsprocessFile(event){
			var options = {	headers: { 'Content-Type': 'multipart/form-data'} };
			let formData = new FormData();
            formData.append('file', event.target.files[0]);
			axios.post('api/upload/image', formData,options)
			.then((response) => {
				this.$store.commit('assignuploadedimage',response.data);
			}).catch((err) => {
	            console.log('Error in loading image to the server', err)
		    });
		},
		completeurlofuploadedfile(image){
			if(image==null){
				return this.prefixinurl(this.uploadedimage.path+"/"+this.uploadedimage.name);
			}
			return this.prefixinurl(image.path+"/"+image.name);
		},
		getproductcustomproducturl(item){
			if(item.product.id==1){
				return this.prefixinurl("prescription/pay?customproductid="+item.customproduct.id)
			}
			return this.prefixinurl(item.product.url)
		},
		getproductcustomproductprice(item){
			
			return item.product.sp_price
		},
		getproductname(product){
			return product.name
		},
		getcustomername(customerid){
			let custname= this.customers.find(a=>a.id==customerid);
			if(typeof custname!='undefined'){
				return custname.name
			}
			return customerid
			//console.log(custname);
		},
		getusername(userid){
			let username=this.employees.find(a=>a.id==userid);
			if(typeof username!='undefined'){
				return username.name
			}
			return userid
		},
		getschemesname(schemeid){
			let schemename=this.schemes.find(a=>a.id==schemeid);
			if(typeof schemename!='undefined'){
				return schemename.name
			}
			return schemeid
		},
		getcustomerid(customerid){
			let custid= this.customers.find(a=>a.id==customerid);
			if(typeof custid!='undefined'){
				return custid.generatedid
			}
			return customerid
		},
		getschemesid(schemeid){
			let schemesid=this.schemes.find(a=>a.id==schemeid);
			if(typeof schemesid!='undefined'){
				return schemesid.generatedid
			}
			return schemeid
		},
		accessid(id){
			// let idwithcomma  = ','+id;
		
			if(this.loggedinuser?.role == 2){
				return true;
			}
			if(this.loggedinuser!=null){
				if(this.loggedinuser.accessids!=null && this.loggedinuser.accessids.includes(id)){
					console.log('accessids')
					console.log(id);
					return true
				}else{
					return false;
				}
			}else{
				return false
			}
		},
		loginusercheck(id){
			if(this.loggedinuser!=null && this.loggedinuser.role > 1){
				return true				
			}else if(this.loggedinuser!=null && this.loggedinuser.accessids!=null ){
				let access=this.loggedinuser.accessids.split(',');
				let found=access.find(element => element == id)
				if(typeof found!='undefined'){
					return true
				}else{
					return false
				}
			}
		},
		getcategory(parentid){
			let categoryname=this.categories.find(a=>a.id==parentid);
			if(typeof categoryname!='undefined'){
				return categoryname.name
			}
			return parentid
		},
		// Sale and Purcahse
		saletransactionedit(transactionid){
			let param = {transactionid:transactionid};
			window.axios.post('api/stransaction/details',param)
	    		.then(response=>this.processSaleEditResponse(response.data))
	    		.catch(error=>console.log(error));
		},
		processSaleEditResponse(data){
			
			this.$store.commit('assigntransaction',data.transaction);
			this.processEditResponse(data.transactiondetails)
			this.$store.commit('updatetrantype',2);
		},
		purchasetransactionedit(transactionid){
			let param = {transactionid:transactionid};
			window.axios.post('api/ptransaction/details',param)
	    		.then(response=>this.processPurchaseEditResponse(response.data))
	    		.catch(error=>console.log(error));
		},
		processPurchaseEditResponse(data){
			// console.log("data", data)
			//this.$store.commit('assignbatchcodeforproduct',data.batchcode);
			//this.$store.commit('assignbarcodeforproduct',data.barcode);
			this.$store.commit('assigntransaction',data.transaction);
			let obj = {invoiceid:data.transaction.invoiceid,invoicedate:data.transaction.invoicedate}
			this.$store.commit('assignpurchasedetails',obj)
			
			this.processEditResponse(data.transactiondetails)
			this.$store.commit('updatetrantype',1);
		},
		processEditResponse(data){
			
			let self = this;
			console.log("data",data)
			data.forEach(function(item){
				
				self.$store.commit('populatecartitembycartitem',item);
			});
			
			let customer = this.customers.find(o=>o.id==this.transaction.customerid);
			if(customer!=null){
				this.$store.commit('assignselectedcustomer',customer);
				if(customer.addressess!=null){
					let address = customer.addressess.find(o=>o.id==self.transaction.address_id)
					if(typeof address!=='undefined')
						this.$store.commit('assignselectedcustomeraddressid',address.id);
					
				}
			}
			let outsideup = false;
			
			let alltaxes = this.getmastertype(this.MASTER_TAXES)
			
			if(this.selectedcustomer!=null && this.selectedcustomeraddressid>0){
				let selectedaddress = this.selectedcustomer.addressess.find(block=>block.id==this.selectedcustomeraddressid)
				if(typeof selectedaddress!=='undefined'){
					if(selectedaddress.state!=this.billingstate){
						outsideup = true
					}
				}
			}
			
			if(outsideup){
				let index = alltaxes.findIndex(block=>block.labelid==this.CGST_LABELID)
				if(index>-1)
					alltaxes.splice(index,1)
				index = alltaxes.findIndex(block=>block.labelid==this.SGST_LABELID)
				if(index>-1)
					alltaxes.splice(index,1)
			} else {
				
				let index = alltaxes.findIndex(block=>block.labelid==this.IGST_LABELID)
				
				if(index>-1)
					alltaxes.splice(index,1)
			}
			
			this.$store.commit("assignapplicabletaxes",alltaxes)
			if(typeof this.transaction.id!=='undefined'){
				this.$store.commit('assigntransactionid',this.transaction.id);
			}
		},
		edittransaction(item){
			this.$store.commit('assignloadingstatus',1)
			if(item.trantype==1){
				let param = {transactionid:item.transactionid};
				window.axios.post('api/ptransaction/fetch',param)
	    		.then(response=>this.processTransactionResponse(response.data,item))
	    		.catch(error=>console.log(error));
			} else if(item.trantype==2){
				let param = {transactionid:item.transactionid};
				window.axios.post('api/stransaction/fetch',param)
	    		.then(response=>this.processTransactionResponse(response.data,item))
	    		.catch(error=>console.log(error));
			}
			this.$store.commit('assigndetailsview',false)
		},
		processTransactionResponse(data,item){
			this.$store.commit('assignloadingstatus',0)
			this.$store.commit('assigntransaction',data)
			if(item.trantype==1)
				this.purchasetransactionedit(item.transactionid)
			if(item.trantype==2)
				this.saletransactionedit(item.transactionid)
		},
		deleteitem(item){
			
			if(confirm("Do you really want to delete ?")==true){
				this.$store.commit('assignloadingstatus',1)
				// let transactionid = 0
				// 	if(item.trantype==this.TRANSFER_OUT_TRANSACTION_TYPE || item.trantype==this.PURCHASE_TRANSACTION_TYPE || item.trantype==this.SALE_TRANSACTION_TYPE || item.trantype==this.EXPENSE_TRANSACTION_TYPE)
				// 	transactionid = item.id
				// else{
				// 	transactionid = item.transactionid
				// }
				console.log("transactionid :"+item.id)
				let param = {transactionid:item.id,trantype:item.trantype};
				axios.post('api/transaction/delete',param)
				.then(response=>this.processDeleteResponse(response.data,item))
				.catch(error=>console.log(error));
				this.$notify({text:"deleted",type:"warn"});
			}
		},
		deletedetailitem(item){
			if(confirm("Do you really want to delete ?")==true){
				this.$store.commit('assignloadingstatus',1)
				let param = {transactionid:item.transactionid,trantype:item.trantype};
				axios.post('api/transaction/delete',param)
				.then(response=>this.processDeleteDetailsResponse(response.data,item))
				.catch(error=>console.log(error));
				this.$notify({text:"deleted",type:"warn"});
			}
		},
		processDeleteDetailsResponse(data,item){
			this.$store.commit('assignloadingstatus',0)
			this.$store.commit('removetransactiondetails',item)
			this.$notify({text:"deleted",type:"error"});
		},
		processDeleteResponse(data,item){
			this.$store.commit('assignloadingstatus',0)
			if(item.trantype==this.PURCHASE_TRANSACTION_TYPE){
				this.$store.commit('removeptransaction',item)
			} else if(item.trantype==this.SALE_TRANSACTION_TYPE){
				this.$store.commit('removestransaction',item)
			} else if(item.trantype==this.RECEIVE_PAYMENT_TRANSACTION_TYPE || item.trantype==this.MAKE_PAYMENT_TRANSACTION_TYPE){
				this.$store.commit('removetransactiondetails',item)
			} else if(item.trantype==this.PAYMENT_TRANSFER_TRANSACTION_TYPE){
				this.$store.commit('removetransactiondetails',item)
			} else if(item.trantype==this.EXPENSE_TRANSACTION_TYPE){
				this.$store.commit('removeexpenses',item)
			}
			
			this.$notify({text:"Record has been deleted successfully",type:"error"});
		},
		jobstatus(status){
			let stat=''
			switch (status) {
				case 0:
					stat='Applied'
					break;
				case 1:
					stat='SHORT LISTED'
					break;
				case 2:
					stat='APPOINTED'
					break;
				case 3:
					stat='REJECTED'
					break;
				case 4:
					stat='TERMINATED'
					break;
				default:
					break;
			}
			return stat
		},
		jobremark(remark){
			let stat=''
			switch (remark) {
				case 1:
					stat='Excellent'
					break;
				case 2:
					stat='Average'
					break;
				case 3:
					stat='Poor'
					break;
				default:
					break;
			}
			return stat
		},
		leadnaturetype(naturetype){
			let stat=''
			switch (naturetype) {
				case 1:
					stat='HOT'
					break;
				case 2:
					stat='COLD'
					break;
				case 3:
					stat='WARM'
					break;
				default:
					break;
			}
			return stat
		
		},
		findapplicabletaxes(){
			let outsideup = false;
			let alltaxes = this.getmastertype(this.MASTER_TAXES)
			if(this.selectedcustomer!=null && this.selectedcustomeraddressid>0){
				let selectedaddress = this.selectedcustomer.addressess.find(block=>block.id==this.selectedcustomeraddressid)
				if(typeof selectedaddress!=='undefined'){
					if(selectedaddress.billingstatecode == ''){
						selectedaddress.billingstatecode='09'
					}
					if(selectedaddress.billingstatecode!=this.loggedinuser.billingstatecode){
						outsideup = true
					}
				}
			}
			this.$store.commit("assignoutsideupstore",outsideup)
			this.$store.dispatch("fetchUserCreatedTaxes")
      	},

	}
	
}
</script>