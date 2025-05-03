<template>
    <div>
        <button type="button" class="btn btn-danger" @click="downloadPDF()">
                <i class='bx bxs-file-pdf'></i>
                Download PDF
        </button>
    </div>
    <div id="pdf-wrapper" ref="pdfWrapper" style="width: 500px; margin: 0 auto;">    
        <div  id="pdf-content" ref="pdfContent">
            <table border="1">     
                <tr>
                    <td class="text-center">
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
                       <b>Payment Receipt</b> 
                    </td>
                </tr>
            </table>
            
            <table>
                <tr >
                    <th > 
                        Member
                    </th>
                    <td>
                       <b>{{ loanaccount.customer.name }}</b> 
                    </td>
                </tr>
                <tr >
                    <th > 
                        Member
                    </th>
                    <td>
                       <b>{{ loanaccount.customer.name }}</b> 
                    </td>
                </tr>
                <tr >
                    <th > 
                        Member
                    </th>
                    <td>
                       <b>{{ loanaccount.customer.name }}</b> 
                    </td>
                </tr>
                <tr >
                    <th > 
                        Paid Amount
                    </th>
                    <td>
                        {{ loanaccount.paid_amount }}
                    </td>
                </tr>
                 <tr >
                    <th > 
                        Peyment mode
                    </th>
                    <td>
                        {{ loanaccount.paid_amount }}
                    </td>
                </tr>
                <tr >
                    <th > 
                        Peyment mode
                    </th>
                    <td>
                        {{ loanaccount.paid_amount }}
                    </td>
                </tr>
                <tr >
                    <th > 
                        Peyment mode
                    </th>
                    <td>
                        
                    </td>
                </tr>
                <tr >
                    <th > 
                        Receipt Date
                    </th>
                    <td>
                        {{ this.details.receiveddate }}
                    </td>
                </tr>
                <tr >
                    <th > 
                       Staff
                    </th>
                    <td>
                        
                    </td>
                </tr>
                <tr >
                    <th > 
                       Loan id
                    </th>
                    <td>
                        {{ this.loanaccount.generatedid }}
                    </td>
                </tr>
                <tr >
                    <th > 
                       Other Payment
                    </th>
                    <td>
                        {{ this.loanaccount.generatedid }}
                    </td>
                </tr>
            </table>
           
        </div>
    </div>
</template>
<script>
import html2pdf from 'html2pdf.js';
export default{
props:['details','loanaccount','loanemi'],
data(){
    return {

    }
},
mounted(){
    console.log('hiiiiasdakdkk');
    console.log(this.details);
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