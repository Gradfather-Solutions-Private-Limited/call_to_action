<template>
    <button @click="downloadPDF">Download PDF</button>
    <div class="container">
        <div id="pdf-content" ref="pdfContent">
            <table>
                <tr>
                    <td style="padding-top: 20px;">
                        <img src="https://assets-allwebsites.s3.ap-south-1.amazonaws.com/psah/psahlogo.jpeg" style="width: 80%;" />
                    </td>
                    <td class="text-center">
                        <h3>PSAH MICRO CARE FOUNDATION</h3>
                        <h5>(RegisteredUnderCompaniesAct,2013)</h5>
                        <div><b>Regd.Add.</b>594Kha/096/20 IbrahimpurNilmatha Lucknow Cantt. U.P 226002</div>
                        <div><b>Email:-psahmicrocarefoundation@gmail.com</b>+919170444560</div>
                    </td>
                    <td></td>
                </tr>
            </table>
            <table>
                <tr>
                    <td colspan="2" class="header">Branch : HEAD OFFICE (BR1)<br>Branch Center :</td>
                    <td class="header">Date :</td>
                    <td class="header">| First EMI Date</td>
                </tr>
                <tr>
                    <td class="header">Customer Name</td>
                    <td class="header">Address</td>
                    <td class="header">District/State/Pincode</td>
                    <td rowspan="3" class="photo">[Photo]</td>
                </tr>
                <tr>
                    <td class="header">Contact No :</td>
                    <td class="header">Gender :<br>DOB : 01-01</td>
                    <td class="header">C/O<br>kanaji</td>
                </tr>
                <tr>
                    <td class="header">Co-Applicant :</td>
                    <td class="header">Co-Applicant Address:</td>
                    <td class="header">Co-Applicant Phone:</td>
                </tr>

                <tr>
                    <td colspan="4" class="section-title">Bank Details | Applied Loan Details</td>
                </tr>
                <tr>
                    <td class="header">Bank :</td>
                    <td class="header">Branch :</td>
                    <td class="header">Loan ID : 99067BR1</td>
                    <td class="header">Plan Name :</td>
                </tr>
                <tr>
                    <td class="header">Account Holder :</td>
                    <td class="header">Account Number :</td>
                    <td class="header">GST Include :</td>
                    <td class="header"></td>
                </tr>
                <tr>
                    <td class="header">IFSC :</td>
                    <td class="header">Loan Amount :</td>
                    <td class="header">File Charge :</td>
                    <td class="header"></td>
                </tr>

                <tr>
                    <td colspan="4" class="section-title">Income Details</td>
                </tr>
                <tr>
                    <td class="header">Income (INR) :</td>
                    <td class="header">Occupation :</td>
                    <td class="header">Recovery type :</td>
                    <td class="header">Amount to be Paid :</td>
                </tr>
                <tr>
                    <td class="header">Business Name :</td>
                    <td class="header">Income Type :</td>
                    <td class="header">No of Payments :</td>
                    <td class="header">Interest Amt :</td>
                </tr>
                <tr>
                    <td class="header">Minimum Income :</td>
                    <td class="header">Purpose :</td>
                    <td colspan="2" class="header">Description :</td>
                </tr>

                <tr>
                    <td colspan="4" class="section-title">Guarantor Details :</td>
                </tr>
                <tr>
                    <td class="header">Name :</td>
                    <td class="header">Contact Number :</td>
                    <td rowspan="2" colspan="2" class="photo">[Photo]</td>
                </tr>
                <tr>
                    <td class="header">Nominee Name :</td>
                    <td class="header">Nominee Mobile :<br>Nominee DOB :</td>
                </tr>
            </table>
            <table style="margin-top: 150px; font-size: 11px;">
                <tr>
                    <td>
                        <div>Member Signature</div> 
                    </br>   (सदस्या के हस्ताक्षर)
                
                    </td>
                    <td> 
                       <div> Spouse Signature</div>
                      (जीवनसाथी के हस्ताक्षर )
                    </td>
                    <td> 
                        <div>Guarantor Signature</div>
                    </br> (जमानतदार के हस्ताक्षर)
                    </td>
                    <td>
                        <div>Branch Seal With Signature</div>
                    </br>  शाखा मोहर के साथ हस्ताक्षर
                    </td>
                </tr>
                
                    
                
            </table>
        </div>

    </div>
</template>
<script>
import html2pdf from 'html2pdf.js';
export default {
    
    data() {
        return {
            fetchcolumns: 'id,name,email,firstname,lastname,adhar,pan,dob,created_at,gender,religion,m_status,payscale',
        }
    },
    mounted() {
        this.setdatauser1(this.$route.params.userid);
        this.getloanAccount(this.$route.params.loannumb);
    },
    methods: {
        setdatauser1(userid) {
            let parm = { userid: userid, 'fetchcolumns': this.fetchcolumns, 'fetchtables': 'mobiles,addressess,userinfo,banks' }
            axios.post('api/finance/getUserbyid', parm)
                .then(response => {
                    if (response.data) {
                        this.userformdata = response.data;
                        this.userdata = response.data;
                        this.jsonconvert();
                    }
                })
        },
        getloanAccount(loan_number) {
            let param = { generatedid: loan_number };
            axios.post('api/loan/accounts/fetch', param)
                .then(response => {
                    this.details = response.data?.loanaccounts[0]
                })
            .catch(error => console.error(error))
        },
        downloadPDF() {

            html2pdf().from(this.$refs.pdfContent).set({
                margin: 0.5,
                filename: 'document.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: {
                    scale: 2,
                    useCORS: true,
                    allowTaint: false
                },
                jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
                }).outputPdf('dataurlnewwindow');
           
            }
    }



}

</script>
<style>
table {
    width: 100%;
    border-collapse: collapse;
    font-family: Arial, sans-serif;
    border: 1px solid black;
}

td,
th {
    border: 1px solid black !important;
    padding: 6px;
    vertical-align: top;
    text-align: center;
}

.header {
    text-align: left;
    font-size: 11px;
    font-weight: 600;
    text-align: center;
}

.section-title {
    background-color: #eaeaea;
    font-weight: bold;
    text-align: center;
}

.photo {
    width: 100px;
    height: 120px;
    border: 1px solid #ccc;
    background-color: #f4f4f4;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>