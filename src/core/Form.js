import Errors from './Errors';

class Form {
	
	constructor(data){
		this.originalData = data;
		
		for(let field in data) {
			this[field] = data[field];
		}
		this.errors = new Errors();
	}
	reset() {
		for(let field in this.originalData) {
			this[field] = '';
		}
	}
	data(){
		let data = {};
		for(let property in this.originalData) {
			data[property] = this[property];
		}
		return data;//got the object so we have the data so no need of original Data
	}
	submit(self,requestType,url) {
		
		return new Promise((resolve, reject) => {
			axios[requestType](url,this.data())
			.then(response=>{
				this.onSuccess();
				resolve(response.data);
			})
			.catch(error=>{
				this.onFail(error.response.data.errors);
				reject(error.response.data);
			});
		});
		
	}
	onSuccess(){
		this.errors = new Errors();
		this.reset();
	}
	onFail(errors){
		this.errors.record(errors);
	}
	
}

export default Form;