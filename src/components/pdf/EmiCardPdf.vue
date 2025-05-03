<template>
            <div>
                <button type="button" class="btn btn-danger" @click="downloadPDF()">
                        <i class='bx bxs-file-pdf'></i>
                        Download PDF
                </button>
            </div>
            <div id="pdf-wrapper" ref="pdfWrapper" style="width: 700px; margin: 0 auto;">    
                <div  id="pdf-content" ref="pdfContent">
                    <table>     
                        <tr>
                            <td style="padding-top: 20px;width: 30%;">
                                <img src="/src/assets/psahlogo.jpeg" style="width: 80%;" />
                            </td>
                            <td class="text-right" style="width: 60%;">
                                <h4 style="font-size: 26px;">PSAH MICRO CARE FOUNDATION</h4>
                                <h5 style="font-size: 17px;">CIN NO - U85300UP2023NPL177336</h5>
                                <div><b>Regd.Add.</b>Near mercury school Ibrahimpur Nilmatha cantt lucknow U.P 226002</div>
                                <div><b>Email:-psahmicrocarefoundation@gmail.com</b> Mobile:- +91 9170444560</div>
                            </td>
                        </tr>
                    </table>
                    <table>
                        <tr >
                            <td style="font-size:13px;text-align:center;">
                               <b>Loan EMI Card</b> 
                            </td>
                        </tr>
                    </table>
                    <table>
                        <tr>
                            <td class="table-row"> Customer Name : {{ loanaccount.customer.name }}</td>
                            <td class="table-row">
                                Contact No : {{ loanaccount?.customer?.mobiles[0]?.mobile }}
                            </td>
                            <td><b> Loan Date :</b>
                                <div> {{ loanaccount.disbursement_date }}</div> 
                            </td>
                        </tr>
                        <tr>
                            <td class="table-row" colspan="2"  rowspan="1" style="height: 50px;">
                                <b>Full Address</b>
                                <div v-for="item in loanaccount?.customer?.addressess">
                                    <span>{{ item.street }}, </span>
                                    <span>{{ item.city }}, </span>
                                    <span>{{ item.zipcode }}</span>
                                </div>
                            </td>

                        </tr>
                        <tr>
                            <td class="table-row">Loan Amount: {{ loanaccount.billedamount }}</td>
                            <td class="table-row" rowspan="1">Loan ID No: {{ loanaccount.generatedid }}</td>
                        </tr>
                        <tr>
                            <td class="table-row">Number of EMI : {{ loanaccount.numberofemi }}</td>
                            <td class="table-row" rowspan="1">EMI Amount:{{ loanaccount.emi }}</td>
                        </tr>
                        <tr>
                            <td class="table-row"> Total Amt Pay: {{ loanaccount.totalloanamount }} </td>
                            <td class="table-row" rowspan="1">Total Interest : {{ loanaccount.interest }}</td>
                        </tr>
                        
                    </table>
                    <table>
                        <tr >
                            <td style="text-align: center; font-size: 12px;"> 
                                <b>EMI Schedule Terms</b>
                            </td>
                        </tr>
                    </table>
                    <table class="emi_list" border="1">
                        <tr>
                            <th>Sr. No.</th>
                            <th>EMI Date</th>
                            <th>Interest</th>
                            <th>Principal</th>
                            <th>EMI</th>
                            <th>Receive Date</th>
                            <th>Received Amt</th>
                            <th>Staff Sign</th>
                        </tr>
                        <tr v-for="(item,index) in loanemi">
                            <td>{{ index+1 }}</td>
                            <td>{{ item.emidate }}</td>
                            <td>{{ item.interest }}</td>
                            <td>{{ item.principalamount }}</td>
                            <td>{{ item.emiamount }}</td>
                            <td>{{ item.receiveddate }}</td>
                            <td></td>
                            <td></td>
                        </tr>
                    </table>
                </div>
            </div>
</template>
<script>
import html2pdf from 'html2pdf.js';
    export default{
        props:['loanaccount','loanemi'],
        data(){
            return {

            }
        },
       mounted(){
            console.log('hiiiiasdakdkk');
            console.log(this.loanaccount);
            console.log(this.loanemi);
       },
       methods:{
            async downloadPDF() {
                const wrapper = this.$refs.pdfWrapper;

                // Convert all <img> inside the wrapper to base64
                const imgs = wrapper.querySelectorAll("img");
                for (let img of imgs) {
                    const base64 = await this.convert_to_base64(img.src);
                    img.src = base64;
                }

                // Generate PDF
                html2pdf()
                    .from(wrapper)
                    .set({
                    margin: 0.3,
                    filename: "document.pdf",
                    image: { type: "jpeg", quality: 0.98 },
                    html2canvas: {
                        scale: 2,
                        useCORS: false,
                        allowTaint: false,
                    },
                    jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
                    })
                    .save();
            },
            convert_to_base64(url) {
                return fetch(url)
                    .then((response) => response.blob())
                    .then(
                        (blob) =>
                            new Promise((resolve) => {
                                const reader = new FileReader();
                                reader.onloadend = () => resolve(reader.result);
                                reader.readAsDataURL(blob);
                            })
                    );
            },
       }
        
    }
</script>
<style>
table {
    border: 1px solid black;
    width: 100%;
    font-size: 11px;
    color: black;
}

.avatar1 {
    width: 60%;
    height: 150px;
}

.box {
    border: 2px solid black;
    padding: 10px;
    margin-top: 52px;
}

.section-title {
    background-color: black;
    color: white;
    padding: 5px 10px;
    display: inline-block;
    font-weight: bold;
    width: 100%;
}
.section-title2 {
    background-color: black;
    color: white;
    padding: 5px 10px;
    font-weight: bold;
}

.label {
    margin-top: 10px;
    display: block;
}
#pdfWrapper {
    /* page-break-before: always;  */
}
#pdf-content-2 {
  /* page-break-before: always; */
}

p {
    font-size: 12px;
}

.signature {
    text-align: right;
    font-size: 13px;
}

.bottom-signatures {
    display: flex;
    justify-content: space-evenly;
    align-content: flex-end;
    flex-direction: column;
    flex-wrap: wrap;
    text-align: right;
}

.directorfficer {
    margin-top: 80px;
    border-top: 3px solid black;
    border-width: 2px;
    width: 372px;
}

.loanOfficer {
    margin-top: 80px;
    border-top: 3px solid black;
    border-width: 2px;
    width: 372px;
}

.rofile-photo-cover {
    width: 155px;
    height: 128px;
    border: 1px solid black;
    text-align: center;
    background: #f3f3f3;
    margin-top: 5px;
    margin-bottom: 5px;
    margin-left: auto;
}
.eng-condi li {
    font-size: 12px;
}
.hindi-condi li {
    font-size: 12px;
}
.table-row{
    width: 40%;
    font-size: 11px;
    padding: 2px;
}
.table-row1{
    width: 20%;
}
.emi_list{
    font-size: 9px;
    width: 100%;
}
.emi_list tr td,th{
    border: 1px solid black;
    padding: 0;
    text-align: center;
}

</style>