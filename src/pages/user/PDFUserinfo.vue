<template>
    <div class="card mt-10">
        <div class="card-header">
            <div class="row justify-content-between">
                <div class="col-4">
                    <label class="lable">Print View</label>
                </div>
                <div class="col-4 text-right">
                    <select class="from-control" v-model="Pdftype">
                        <option value="1">Lone Form</option>
                        <option value="2">Sanction Letter</option>
                    </select>
                    <button type="button" class="btn btn-danger" @click="downloadPDF()">
                        <i class='bx bxs-file-pdf'></i>
                        Download PDF
                    </button>
                </div>
            </div>
        </div>
        <div style="width: 700px; height: 700px;overflow: scroll; margin: 0 auto;">
            <div id="pdf-wrapper" ref="pdfWrapper">
                <div id="pdf-content" ref="pdfContent">
                    <table>
                        <tr>
                            <td style="padding-top: 20px;width: 30%;">
                                <img src="/src/assets/psahlogo.jpeg" style="width: 80%;" />
                            </td>
                            <td class="text-right" style="width: 60%;">
                                <h4 style="font-size: 26px;">PSAH MICRO CARE FOUNDATION</h4>
                                <h5 style="font-size: 17px;">CIN NO - U85300UP2023NPL177336</h5>
                                <div><b>Regd.Add.</b>Near mercury school Ibrahimpur Nilmatha cantt lucknow U.P 226002
                                </div>
                                <div><b>Email:-psahmicrocarefoundation@gmail.com</b> Mobile:- +91 9170444560</div>
                            </td>
                        </tr>
                    </table>
                    <table>
                        <tr>
                            <td class="text-center" style="background: black;color:#fff">
                                <div v-if="Pdftype == 1">
                                    LOAN APPLICATION FROM
                                </div>
                                <div v-else>
                                    Loan Sanction Letter
                                </div>

                            </td>
                        </tr>
                    </table>

                    <table>
                        <tr>
                            <td class="header">Branch : </td>
                            <td><b>HEAD OFFICE Lucknow</b></td>
                            <template v-if="Pdftype == 1">
                                <td class="header">Date :</td>
                                <td class="header"><b>{{ convert_to(loanaccount?.created_at) }}</b></td>
                            </template>
                            <template v-else>
                                <td colspan="2" class="header" style="text-align: center;"><b>Date :</b>{{
                                    convert_to(loanaccount?.disbursement_date) }} |
                                    <b> First EMI Date : </b> {{ convert_to(loanaccount?.startdate) }}
                                </td>
                            </template>
                        </tr>
                    </table>
                    <table style="width: 100%;border: 1px solid black;">
                        <div :style="Checkpdftype">
                            <table class="">
                                <tr>
                                    <td class="label-cell">Customer Full Name</td>
                                    <td class="label-cell">
                                        <span v-if="userdata?.firstname != null">{{ userdata?.firstname + ' ' }}
                                            {{ userdata?.lastname ?? '' }}
                                        </span>
                                    </td>
                                    <td class="label-cell">Father/Husband Name</td>
                                    <td>
                                        {{ userinfo?.fatherName }}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="label-cell">Mother’s Maiden Name</td>
                                    <td>
                                        {{ userinfo?.motherName }}
                                    </td>
                                    <td class="label-cell">D.O.B.</td>
                                    <td>
                                        {{ userdata?.dob }}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="label-cell">Sex</td>
                                    <td colspan="3">
                                        <span v-if="userdata?.gender > 0">{{ getMasterLabelByType(userdata?.gender,
                                            MASTER_GENDER) }}</span>
                                        <span v-else>N/A</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="label-cell">Mobile No.</td>
                                    <td colspan="3">
                                        <div v-for="item in this.userdata?.mobiles">
                                            <span>{{ item.mobile }},</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="label-cell">Email</td>
                                    <td colspan="3">
                                        {{ this.userdata?.email }}
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div style="width: 24%;float: left;" v-if="Pdftype == 1">

                            <div class="rofile-photo-cover">
                                [Photo]
                            </div>
                        </div>
                    </table>

                    <table>
                        <tr>
                            <td class="label-cell">Full Address</td>
                            <td colspan="3" style="height: 60px;">
                                <div v-for="item in this.userdata?.addressess">
                                    <span>{{ item.street }}, </span>
                                    <span>{{ item.city }}, </span>
                                    <span>{{ item.zipcode }}</span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="label-cell">PAN No.</td>
                            <td>{{ userdata?.pan }}</td>
                            <td colspan="2">☐ Form 60 Furnished</td>
                        </tr>
                        <tr>
                            <td class="label-cell">Aadhaar Card No.</td>
                            <td>{{ userdata?.adhar }}</td>
                            <td></td>
                        </tr>

                        <tr v-if="Pdftype == 1">
                            <td class="label-cell">Residence Type</td>
                            <td colspan="3">
                                ☐ Owned  ☐ Rented/Leased  ☐ Ancestral/Family  ☐ Company Provided
                            </td>
                        </tr>

                    </table>
                    <table>


                        <tr>
                            <td colspan="1" class="section-title2">Co-Applicant:</td>
                            <td colspan="3"></td>
                        </tr>
                        <tr>
                            <td class="header">Co-Applicant : </td>
                            <td class="header"><b>{{ coapplicant?.name }}</b></td>
                            <td class="header">Co-Applicant Phone: </td>
                            <td class="header"><b>{{ coapplicant?.mobile }}</b></td>
                        </tr>
                        <tr>
                            <td class="header">
                                Co-Applicant Address:
                            </td>
                            <td class="header"><b>{{ coapplicant?.address }}</b></td>
                            <td class="header">PAN</td>
                            <td class="header"><b>{{ coapplicant?.pan_card }}</b></td>
                        </tr>
                        <tr>
                            <td class="header">
                                Aadhar:
                            </td>
                            <td class="header"><b>{{ coapplicant?.aadhar_card }}</b></td>
                            <td class="header"></td>
                            <td class="header"><b></b></td>
                        </tr>
                        <tr>
                            <td colspan="1" class="section-title2">Bank Details</td>
                            <td colspan="3"></td>
                        </tr>
                        <tr>
                            <td class="header">Bank</td>
                            <td class="header"><b>{{ banckData?.bankname }}</b> </td>
                            <td class="header"> Branch </td>
                            <td class="header"><b> {{ banckData?.branch }}</b></td>
                        </tr>
                        <tr>
                            <td class="header">Account Holder name : </td>
                            <td class="header"><b>{{ banckData?.accountname }}</b></td>
                            <td class="header">Account Number :</td>
                            <td class="header"><b>{{ banckData?.accountno }}</b></td>
                        </tr>
                        <tr>
                            <td class="header">IFSC :</td>
                            <td class="header"><b>{{ banckData?.ifsccode }}</b></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td colspan="1" class="section-title2">Applied Loan Details</td>
                            <td colspan="3"></td>
                        </tr>
                        <tr>
                            <td class="header">Loan ID :</td>
                            <td class="header"><b>{{ loanaccount?.generatedid }}</b></td>
                            <td class="header">Loan Amount :</td>
                            <td class="header"><b>{{ loanaccount?.billedamount }}</b></td>
                        </tr>

                        <tr>
                            <td class="header">Processing Fees :</td>
                            <td class="header"><b>{{ loanaccount?.filecharge }}</b></td>
                            <td class="header">Late Fee</td>
                            <td class="header"><b>{{ loanaccount?.late_fee }}</b></td>
                        </tr>
                        <tr>
                            <td>Amount to be Paid :</td>
                            <td><b>{{ loanaccount?.paid_amount }}</b></td>
                            <td>Recovery type</td>
                            <td><b>{{ getemitype(loanaccount?.recurringtype) }}</b></td>
                        </tr>
                        <tr>
                            <td class="header">No of Payments</td>
                            <td class="header"><b>{{ loanaccount?.numberofemi }}</b></td>
                            <td class="header"> Interest Amt </td>
                            <td class="header"><b>{{ loanaccount?.interest }}</b></td>
                        </tr>
                        <tr v-if="Pdftype == 2">
                            <td class="header">Rate of Interest:</td>
                            <td class="header"><b>{{ loanaccount?.interest_rate_text }}</b></td>
                            <td class="header">Interest Type</td>
                            <td class="header"><b>{{ loanaccount?.interest_type == 1 ? 'Fixed' : 'Floating' }}</b></td>
                        </tr>
                        <tr v-if="Pdftype == 2">
                            <td class="header">Refund Security Deposit :</td>
                            <td class="header"><b> {{ loanaccount?.ref_Deposit }}</b></td>
                            <td class="header">Instalments Amount :</td>
                            <td class="header"><b>{{ countToBePaid() }}</b></td>
                        </tr>
                        <tr>
                            <td class="header">Purpose : </td>
                            <td class="header"><b>{{ loanaccount?.purpose }}</b></td>
                            <td class="header">Loan type :</td>
                            <td class="header"><b>{{ loanaccount?.purpose_type }}</b></td>
                        </tr>
                        <tr>
                            <td colspan="4" class="section-title">Income Details</td>
                        </tr>
                        <tr>
                            <td class="header">Income (INR) : <b></b></td>
                            <td class="header"><b>{{ financialData?.jobType }}</b></td>
                            <td class="header">Income Amount:</td>
                            <td class="header"><b>{{ financialData?.incomeAmount }}</b></td>
                        </tr>
                        <tr>
                            <td class="header">Business Name</td>
                            <td class="header">{{ financialData?.businessName }}</td>
                            <td>Occupation</td>
                            <td><b>{{ userinfo?.occupation }}</b></td>
                        </tr>
                    </table>
                    <table v-if="Pdftype == 1" style="margin-top: 72px; font-size: 11px;">
                        <tr>
                            <td>
                                <div>Applicant Signature</div>
                                </br> (आवेदक के हस्ताक्षर)
                            </td>
                            <td>
                                <div> Spouse Signature</div>
                                (जीवनसाथी के हस्ताक्षर )
                            </td>
                            <td>
                                <div>Co-Applicont Signature</div>
                                </br>(सह-आवेदक के हस्ताक्षर)
                            </td>
                            <td>
                                <div>Branch Seal With Signature</div>
                                </br> शाखा मोहर के साथ हस्ताक्षर
                            </td>
                        </tr>
                    </table>

                    <div v-if="Pdftype == 2" style="font-size: 13px;margin-top: 34px;">
                        This is a system generated letter and hence does not require any signature.
                    </div>

                </div>



                <div v-if="Pdftype == 1" id="pdf-content-2" ref="pdfContent2">
                    <div class="box">
                        <div class="section-title">FOR OFFICE USE ONLY</div>

                        <p style="margin-top: 20px;">
                            I, Shri/Smt./Miss ...............................................................
                            designation ...............................................................<br><br>
                            with Employee/Advisor Code ......................... of
                            ......................................................... Branch has physically verified all
                            the
                            particulars & relevant documents of the Loan Application of Shri/Smt./Miss
                            .........................................................<br><br>
                            Applicant signed in my Presence.
                        </p>

                        <div class="signature">
                            <strong>Employee Signature</strong>
                        </div>

                        <hr>

                        <p><strong>Approving Authority</strong></p>
                        <p>
                            Approved / Rejected on Date: ___________________________<br><br>
                            If Approved - Loan Account No.:
                            ..........................................................<br><br>
                            If Rejected - Narration:
                            ........................................................................................
                        </p>

                        <p>
                            Place: ......................................................<br>
                            Date: .......................................................
                        </p>

                        <div class="bottom-signatures">
                            <div class="loanOfficer"><strong>Loan Officer Signature</strong></div>
                            <div class="directorfficer"><strong>Director Signature</strong></div>
                        </div>
                    </div>
                    <div style="margin-top: 25px;">
                        <b>नियम और शर्तें:</b>
                        <ul style="" class="hindi-condi">
                            <li>
                                <b>1:- </b>
                                उपरोक्त सभी पक्ष निम्नलिखित सभी शर्ते व नियम पर अपनी सहमति व्यक्त करते हैं यह है कि ऋण
                                धारी इस राशि का
                                उपयोग माइक्रोफाइनेंस की नियमावली समझकर करेंगे तथा इस राशि या इसके किसी भी अंश का उपयोग
                                अन्य किसी भी
                                उद्देश्य की पूर्ति हेतु नहीं करेंगे जिसके लिए इसे स्वीकृत नहीं किया गया है हम इसके लिए
                                भी सहमति व्यक्त
                                करते हैं कि यदि कंपनी को सबसे कोई कारण मिलता है जो स्पष्ट करता है कि शर्त की पालना नहीं
                                की गई है तो
                                कंपनी को अधिकार है कि वह इस ऋण राशि या उसके अंश को बिना किसी रियायत के वापस ले लेंगे
                            </li>
                            <li>
                                <b>2:-</b> मैं/हम लोन के लिए आवेदन करने वाले तथा गारंटर पूर्व में किसी भी गैर कानूनी
                                कार्य में लिप्त
                                नहीं है और ना ही किसी न्यायालय में हमारे विरुद्ध आपराधिक मामला विचाराधीन है और ना ही
                                किसी भी थाने में
                                कोई एफआईआर दर्ज है।

                            </li>
                            <li>
                                <b>3:-</b>यह है कि मैं/हमें किसी वित्तीय संस्थान, बैंक या फाइनेंस कंपनी से मुझे/ हमको
                                डिफॉल्टर घोषित
                                नहीं किया गया है।
                            </li>
                            <li>
                                <b>4:-</b> यह है कि मैं/हम उक्त लोन की संपूर्ण किस्तों का भुगतान करने में पूरी तरह से
                                सक्षम है और किसी
                                भी विपरीत परिस्थिति में मैं/हम भुगतान करने में देरी नहीं करेंगे।
                            </li>
                            <li>
                                <b>5:-</b>
                                यह है कि कंपनी का जो भी कर्मचारी किस्त की राशि का कलेक्शन करने आएगा मैं उसके साथ विनम्र
                                व्यवहार
                                रखूंगा/रखेंगे एवं उसे किसी भी प्रकार की आपत्तिजनक बात ना कहेंगे किसी भी प्रकार का उसको
                                नुकसान या मारपीट
                                की कोशिश नहीं करेंगे और ना ही उसके खिलाफ गंदे व्यवहार या अपशब्द बोलने का आरोप नहीं
                                लगाएंगे अगर हमारे
                                द्वारा कोई भी अभद्र व्यवहार किया जाता है तो कंपनी कर्मचारी तथा कंपनी हमारे प्रति कानूनी
                                कार्रवाई करने के
                                लिए स्वतंत्र होंगे
                            </li>

                            <li>
                                <b>6:-</b>
                                यह है कि मैं/हम नियत तिथि की सूचना देने से संबंधित जानकारी अपनी किस्तों के संपूर्ण
                                भुगतान के लिए नोटिस
                                रिमाइंडर व इलेक्ट्रॉनिक सूचना फोन इत्यादि करने के लिए कंपनी जिम्मेदार नहीं होगी इस बात
                                की याददाश्त
                                संबंधित संपूर्ण जिम्मेदारी मेरी या हमारी होगी|
                            </li>
                            <li>
                                <b>7:-</b>
                                यह है कि अगर ऋणी या गारंटर अपने व्यवसाय नौकरी मूल निवास मोबाइल नंबर या ईमेल आई डी का
                                परिवर्तन करता है तो
                                इस बात की सूचना कंपनी को पूर्व में लिखित प्रदान करेंगे |
                            </li>
                            <li>
                                <b>8:-</b> यह है कि मैं/हम यह वचनबद्ध बयान करते हैं कि भविष्य में यदि हमारे द्वारा
                                किस्तों का भुगतान चेक
                                के माध्यम से किया जाता है तो हम दिए गए चेकों को बैंक में स्टॉप नहीं कराएंगे और ना ही
                                उक्त चेक के खोने की
                                रिपोर्ट दर्ज थाने में कराएंगे और ना ही उक्त खाते को बंद कर आएंगे यदि हम ऐसा करते हैं तो
                                कंपनी हमारे
                                विरुद्ध कानूनी कार्रवाई करने का अधिकार रखेगी !
                            </li>
                            <li><b>9:- </b> यह है कि कंपनी द्वारा के संग्रहण संबंधित जो सुविधाएं जैसे कि s.m.s., कॉलिंग
                                , मेल , नोटिस
                                प्रदान करने के लिए जो भी सर्विस चार्ज होगा वह हम प्रदान करेंगे |</li>

                            <li><b>10:- </b>यह है कि इस अनुबंध के अनुसार गारंटर की पूरी जिम्मेदारी और उत्तरदायित्व है
                                अगर भविष्य में
                                आवेदक के साथ कोई आकस्मिक घटना मृत्यु या दिवालिया या गंभीर बीमारी हो जाती है तो संपूर्ण
                                लोन का भुगतान
                                गारंटर द्वारा किया जाएगा |</li>

                            <li><b>11:- </b>यह है कि हम/मैं द्वारा कंपनी को दी गई संपूर्ण जानकारी मौखिक प्रदान की गई है
                                जो कि सत्य व सही
                                है
                                जिसमें किसी भी प्रकार का कोई भी झूठा तथ्य नहीं बताया गया है यदि कोई जानकारी झूठी पाई
                                जाती है तो कंपनी
                                हमारे
                                विरोध कानूनी कार्रवाई करने का अधिकार रखेगी मैं/हम ने लोन के बारे में समस्त जानकारी जैसे
                                ब्याज किस्तों की
                                राशि
                                किस्तों का समय और अदायगी का समय अच्छी तरह से समझ लिया है कंपनी कर्मचारी द्वारा मुझे
                                संपूर्ण जानकारी दे
                                दी गई है
                                उक्त सभी नियमों व शर्तों के लिए मैं/हम पूरी तरह तैयार है और अगर मैं/हम किस्त देने में
                                देरी करते हैं तो
                                उस पर लगने वाला
                                अतिरिक्त भार लीगल खर्चा पेपर खर्चा विजिट खर्चा व अन्य खर्च जो भी भविष्य में आएगा वह
                                हमारे द्वारा प्रदान
                                किया जाएगा |</li>

                            <li><b>12:- </b> यह है कि मैं/हम प्रस्तुत किए गए समस्त दस्तावेज जैसे कि आधार कार्ड ,पैन
                                कार्ड, राशन कार्ड,
                                ड्राइविंग लाइसेंस, बैंक की पास बुक व फोटो के साथ किसी भी तरह की छेड़छाड़ या कोई भी फर्जी
                                दस्तावेज हमारे
                                द्वारा प्रस्तुत नहीं किया गया है निकट भविष्य में अगर किसी भी दस्तावेज के फर्जी पाए जाने
                                पर हमारे खिलाफ
                                420 का मुकदमा कंपनी द्वारा किया जा सकता है किस बात से हम पहले से जानकार हैं |</li>

                            <li><b>13:- </b> यह है कि हम/मैं अपनी किस्तों का भुगतान दैनिक/साप्ताहिक/द्विसाप्ताहिक/मासिक
                                रूप में करना
                                चाहता हूं |</li>

                            <li><b>14:- </b>यह है कि इस ऋण के भुगतान और उसके बकाया या किसी भी अंश की स्वीकृति या किसी भी
                                अन्य विशिष्ट
                                कार्य हेतु जब भी कंपनी द्वारा बुलाया जाएगा मैं/हम समय पर उपस्थित हो जाएंगे |</li>

                            <li><b>15. </b>यह है कि मेरी सालाना आय ₹400000 से कम है उक्त एग्रीमेंट या लोन को करते समय
                                हमने किसी भी
                                प्रकार का कोई नशा नहीं किया हुआ है हम पूरे होशो हवास में यह एग्रीमेंट कर रहे हैं |</li>

                            <li><b>16</b>हम यह वचन बद्ध बयान करते है की भविष्य में यदि हमारे द्वारा किस्त समय पर नहीं
                                जमा होगी तो कंपनी
                                हमारे विरुद्ध कानूनी कार्य वाही करने का अधिकार रखेगी। इस से मुझे कोई आपत्ति नहीं है।
                            </li>

                            <li><b>17:- </b> हम अगर अपनी किस्त समय से नहीं जमा करते है या डिफॉल्ट होने की स्थिति में
                                कंपनी सिबिल पर
                                हमारा रिकॉर्ड दर्ज करने का अधिकार रखेगी|</li>

                            <li><b>18:- विलंब फीस और शुल्क:</b> यदि किसी लोन की ईएमआई का भुगतान नियत तारीख तक नहीं किया
                                जाता है, तो किसत
                                बाउंस होने के बाद 300 रुपये का विलंब शुल्क लगाया जाएगा और यदि तत्काल अगली ईएमआई का भी
                                भुगतान नहीं किया
                                जाता है, तो फिर से 300 रुपये का विलंब शुल्क और 4% प्रति माह की दर से ब्याज लगाया जाएगा।
                                विलंब शुल्क के
                                अतिरिक्त कुल बकाया पर शुल्क लिया जाएगा। </li>

                            <li><b>19:- डिफ़ॉल्ट:</b> यदि उधारकर्ता प्रासंगिक देय तिथियों पर लगातार दो ईएमआई राशि का
                                भुगतान करने में
                                विफल रहता है, तो कंपनी एक नोटिस देगी और यदि नोटिस देने के एक सप्ताह बाद भी डिफ़ॉल्ट जारी
                                रहता है, तो
                                कंपनी की कानूनी और संग्रह टीम वहां का दौरा करेगी। उधारकर्ता का पता और एक सप्ताह के
                                अंतराल पर दो दौरे के
                                बाद कंपनी बकाया वसूली के लिए अन्य कानूनी कार्यवाही शुरू करेगी।
                            </li>
                            <li><b>20. लोन फॉर क्लोज़र:</b> यदि पिछली ईएमआई में कोई बाउंस नहीं है तो छह महीने के बाद लोन
                                को एकमुश्त
                                भुकतान किया जा सकता है। लोन के फॉर क्लोज़र पर शेष ब्याज के 50% के बराबर फॉर क्लोज़र शुल्क
                                बदल दिया जाएगा।
                            </li>

                            <li><b>21. समय पुरस्कार:</b> लोन के सफल समापन और प्रत्येक ईएमआई के समय पर भुगतान पर कंपनी
                                एनओसी जारी करने के
                                समय उधारकर्ता को समय पुरस्कार देगी, लेकिन यदि नियत तारीख पर दो से अधिक ईएमआई के भुगतान
                                में विफलता होती
                                है तो उधारकर्ता को समय पर पुरस्कार दिया जाएगा। समय पुरस्कार की कुल राशि के केवल 50% के
                                लिए पात्र।</li>

                            <li><b>22. उधार लेने की पात्रता:</b> 3 ईएमआई से अधिक का समय पर भुगतान करने में चूक होने पर
                                उधारकर्ता कंपनी
                                से आगे किसी भी लोन के लिए पात्र नहीं होगा। </li>

                            <li><b>23. हेल्प लाइन-</b> किसी भी स्पष्टीकरण के लिए कृपया संपर्क करें: 9044864993,
                                9170444560 </li>


                        </ul>
                    </div>
                    <table style="margin-top: 75px; font-size: 11px; ">
                        <tr>
                            <td>
                                <div>Applicant Signature</div>
                                </br> (आवेदक के हस्ताक्षर)

                            </td>
                            <td>
                                <div>Spouse Signature</div>
                                (जीवनसाथी के हस्ताक्षर )
                            </td>
                            <td>
                                <div>Co-Applicont Signature</div>
                                </br>(सह-आवेदक के हस्ताक्षर)
                            </td>
                            <td>
                                <div>Branch Seal With Signature</div>
                                </br> शाखा मोहर के साथ हस्ताक्षर
                            </td>
                        </tr>
                    </table>
                    <div style="margin-top:10px">
                        <h5>THE TERMS AND CONDITIONS:</h5>
                        <ul class="eng-condi">
                            <li>
                                <b>1:- </b>
                                All the above parties agree on all the following terms and condition that the borrower
                                will use this
                                amount as per the rules of microfinance and will not use this amount or any part of it
                                for any other
                                purpose. We also agree that if the company finds any reason to explain which has not
                                been complied with,
                                the company has the right to withdraw this loan amount or part thereof without any Will
                                withdraw the
                                concession.
                            </li>
                            <li>
                                <b>2:- </b>
                                I and my guarantor are not involved in any illegal act in the past and neither a
                                criminal case is
                                pending against us in any court nor any FIR is registered in any police station.
                            </li>
                            <li>
                                <b>3:- </b>
                                That I/We are not burdened with any kind of loan from any financial institution, bank
                                finance company,
                                nor have I/we been declared a defaulter from any financial institution, bank or finance
                                company.
                            </li>
                            <li>
                                <b>4:- </b>
                                That I/we are fully capable of paying the entire instalments of the said loan and I/We
                                shall not delay
                                the payment under any circumstances
                            </li>
                            <li>
                                <b>5:- </b>
                                That whichever employee of the company will come to collect the instalment amount, I
                                will keep polite
                                behaviour with them and will not call him any kind of objectionable thing, will not try
                                to harm or beat
                                him in any way nor will he be dirty against him. Will not allege behaviour or abusive
                                language If any
                                abusive behaviour is done by us then company will be free to take legal action against
                                us.
                            </li>
                            <li>
                                <b>6:- </b>
                                That I/We the company will not be responsible for giving notices, reminders and
                                electronic information
                                phone etc. For the full payment of my instalments related to intimation of the due date
                                of payment of
                                the loan, the entire responsibility related to this will be my / ours.
                            </li>
                            <li>
                                <b>7:- </b>
                                That if the Borrower (s) or the Guarantor (s) change their business, job, Domicile ,
                                Mobile number or
                                email Id, they shall give prior written notice to the company.
                            </li>
                            <li>
                                <b>8:- </b>
                                That I / We undertake to make a statement that if the instalments are paid by us in
                                future through are
                                paid by us in future through cheque, then we will not make stop payment of the checks
                                given in the bank
                                nor report the loss of the said check to the police station. Nor will we close that
                                account, if we do
                                so, the company will have the right to take legal action against us.
                            </li>
                            <li>
                                <b>9:- </b>
                                This is during the Company’s storage related facilities Such as S.M.S. we will provide
                                the additional
                                service charge required for providing the calling, email notice.
                            </li>
                            <li>
                                <b>10:- </b>
                                That the guarantor is fully responsible and liable as per this agreement, if any
                                accidental event ,death
                                or insolvency or serious illness occurs with the application future, the entire loan
                                shall be paid by
                                the guarantor.
                            </li>
                            <li>
                                <b>11:- </b>
                                That all the information given by me/us to the company has been provided orally which is
                                the true and
                                correct in which no false fact of any kind have been told , if any information is found
                                to be false then
                                the company has the right to take legal action against us. I will keep all the
                                information about the
                                loan, Such as the amount of interest. Instalment, the time of instalment and the time of
                                repayment. I
                                have been given complete information by the company employee, we are fully prepared for
                                all the above
                                terms and condition and if me/we delay in paying the instalment, then the additional
                                burden of legal
                                expanses and other expenses which will come in future will be provided by us.
                            </li>
                            <li>
                                <b>12:- </b>
                                That all the documents submitted by me/us Such as Aadhar card, Pan card , Ration card,
                                Driving license,
                                Bank Passbook and Photo have not been tampered with or any fake document has been
                                submitted by us near
                                in future, if any document is found to be forged, we can be sued for 420 by the company,
                                which we are
                                already aware of.
                            </li>
                            <li>
                                <b>13:- </b>
                                That me/we want to pay our instalments daily/weekly/biweekly/monthly (as per agreed
                                upon).
                            </li>
                            <li>
                                <b>14:- </b>
                                That I/we shall be present in time as and when called for by the company for the payment
                                of this loan
                                and acceptance of the arrears or any part thereof or for any other specified purpose.
                            </li>
                            <li>
                                <b>15:- </b>
                                That my annual income is less than 400000/-, we have not done any kind of intoxication
                                while doing the
                                said agreement or loan, we are doing this agreement in full consciousness.
                            </li>
                            <li>
                                <b>16:- </b>
                                I/We undertake that in future, if I/we do not deposit the installments on time, the
                                company will have
                                the right to take legal action against me/us. I/we have no objection to this.
                            </li>
                            <li>
                                <b>17:- </b>
                                If I/we do not deposit my/our installment on time or in case of default, the company
                                will have the right
                                to register my/our record on CIBIL.
                            </li>
                            <li>
                                <b>18</b>
                                Late Fees and Charges: If a loan EMI not paid upto due date a late fee of Rs.300 will
                                levied after fist
                                bouncing and if immediate next EMI also not paid then again a late fee of Rs.300 and
                                interest @ 4% P.M.
                                on the total outstanding will be charged in addition to the late fees.
                            </li>
                            <li><b>19:- </b>
                                Default: If the borrower fails to pay the continuous two EMI amount due on the relevant
                                due dates, then
                                company will serve a notice and if default continues after one week after serving a
                                notice then legal
                                and collection team of the company will visit at the address of the borrower and after
                                two visit at a
                                intervals of one week company will initiate other lawful proceedings towards collection
                                of dues.

                            </li>
                            <li><b>20:- </b>
                                Foreclosure: A loan can be foreclosed after six months if there is no bounce of previous
                                EMI’s. On
                                foreclosure of a loan a foreclosure charges equivalent to 50% of the remaining interest
                                will be changed.
                            </li>
                            <li>
                                <b>21:- </b>
                                Time rewards: On successful loan completion and on time payment of each EMI company will
                                give a time
                                rewards to the borrower at time of issuing NOC but if there is a failure in payment of
                                more than two EMI
                                on the due date then borrower will be eligible for only 50% of the total amount of time
                                reward.
                            </li>
                            <li>
                                <b>22:- </b>
                                Borrowing eligibility: Borrower will not be eligible for further any loan from the
                                company if there is a
                                default in making timely payment of more than 3 EMI.
                            </li>
                            <li>
                                <b>23:- </b>
                                Help Line- For any clarification please contacts: 9044864993, 9170444560
                            </li>

                        </ul>



                    </div>
                    <table style="margin-top: 75px; font-size: 11px;">
                        <tr>
                            <td>
                                <div>Applicant Signature</div>
                                </br> (आवेदक के हस्ताक्षर)

                            </td>
                            <td>
                                <div> Spouse Signature</div>
                                (जीवनसाथी के हस्ताक्षर )
                            </td>
                            <td>
                                <div>Co-Applicont Signature</div>
                                </br>(सह-आवेदक के हस्ताक्षर)
                            </td>
                            <td>
                                <div>Branch Seal With Signature</div>
                                </br> शाखा मोहर के साथ हस्ताक्षर
                            </td>
                        </tr>
                    </table>
                </div>
                <div v-else id="pdf-content-2" ref="pdfContent2" style="margin-top: 80px;">
                    <div class="box">
                        <p>At PSAH Micro Care Foundation, we have adopted risk-based pricing, which is arrived by
                            considering broad
                            parameters like the customer’s financials, credit profile. Applicable interest rates are
                            arrived by
                            considering the prevailing market rates at the time of sanctioning. </p>
                        <p>Sanction subject to below mentioned special terms and conditions:</p>
                        <p><b>The sanction of the loan shall stand revoked and cancelled in any of the following
                                circumstances:</b></p>
                        <ul>
                            <li>
                                <p>1. If any statement in the application or in loan and any other document(s) given by
                                    you or otherwise
                                    is found to be misleading or incorrect and/or</p>
                                <p>2. If there is any material change in the process on the basis of which the loan has,
                                    in principle,
                                    been offered and/or</p>
                                <p>3. If any material fact concerning your income, employment, or ability to repay or
                                    any other relevant
                                    aspect of your proposal for the loan is suppressed or concealed and/or</p>
                                <p>4. If document(s) submitted by you and the information contained in the document(s)
                                    are not in
                                    confirmation with the information provided in the application form submitted by you
                                    and/or</p>
                                <p>5. If you fail to submit the documents as required by PSAH Micro Care Foundation
                                    within specified
                                    time and /or </p>
                                <p>6. Any other reason at the sole discretion of the Lender.</p>

                            </li>
                        </ul>
                        <p><b>Other terms & conditions:</b></p>
                        <ul>
                            <li>
                                <p>1. PSAH Micro Care Foundation reserves the right to amend any of the terms &
                                    conditions or cancel and
                                    recall the loan at any time.</p>
                            </li>
                            <li>
                                <p>2. In case of any difference in the above-mentioned terms & conditions with the loan
                                    agreement,
                                    please treat these terms & conditions as the revised one.
                                </p>
                                <p>Please note that this sanction shall lapse unless and until definitive documents are
                                    executed and
                                    furnished within 14 days of the date of this letter.



                                </p>
                                <p>In case of any query or assistance please contact us, at the below mentioned address
                                    or
                                    alternatively you can email us at <b>psahmicrocarefoundation@gmail.com</b> .
                                </p>
                            </li>
                        </ul>
                        <b>For PSAH MICRO CARE FOUNDATION</b>
                        <div style="font-size: 12px;"><b>594Kha/096/20 Ibrahimpur Nilmatha Lucknow Cantt. U.P 226002</b>
                        </div>
                        <p>
                        <table v-if="Pdftype == 1" style="margin-top: 60px; font-size: 11px;">
                            <tr>
                                <td>
                                    <div>Applicant Signature</div>
                                    </br> (आवेदक के हस्ताक्षर)

                                </td>
                                <td>
                                    <div> Spouse Signature</div>
                                    (जीवनसाथी के हस्ताक्षर )
                                </td>
                                <td>
                                    <div>Co-Applicont Signature</div>
                                    </br>(सह-आवेदक के हस्ताक्षर)
                                </td>
                                <td>
                                    <div>Branch Seal With Signature</div>
                                    </br> शाखा मोहर के साथ हस्ताक्षर
                                </td>
                            </tr>
                        </table>

                        </p>
                    </div>
                    <div v-if="Pdftype == 2" style="font-size: 13px;margin-top: 40px;">
                        This is a system generated letter and hence does not require any signature.
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import moment from 'moment';
import axios from 'axios';
import Constants from '../../components/access/Constants.vue';
import html2pdf from 'html2pdf.js';
export default {
    props: [],
    mixins: [Constants],
    components: {},
    data() {
        return {
            fetchcolumns: 'id,name,email,firstname,lastname,adhar,pan,dob,created_at,gender,religion,m_status,payscale',
            userdata: '',
            userinfo: '',
            profile: {},
            financialData: '',
            loanaccount: '',
            banckData: '',
            Pdftype: 1,

            emilists: [],
        }
    },
    computed: {
        Checkpdftype() {
            if (this.Pdftype == 2) {
                return 'width:100%;float:left;';
            } else {
                return 'width:70%; float:left;';
            }
        }
    },
    mounted() {
        this.setdatauser1(this.$route.params.userid);
        this.getlogsofemi();
    },
    methods: {

        setdatauser1(userid) {
            let parm = { userid: userid, 'fetchcolumns': this.fetchcolumns, 'fetchtables': 'mobiles,addressess,userinfo,banks' }
            axios.post('api/finance/users/fetch', parm)
                .then(response => {
                    if (response.data) {
                        //this.userdata = response.data;
                        this.userdata = response.data;
                        this.banckData = response.data?.banks[0];

                        this.jsonconvert();
                        this.initialize();
                    }
                })
        },
        getemitype(emitype) {
            let mastertypelist = this.getmastertype(this.MASTER_RECURRING_TYPES);
            let findlablename = mastertypelist.find(a => a.labelid == emitype);
            if (findlablename) {
                return findlablename.label;
            }
            return '';
        },
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
            console.log(url);
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

        jsonconvert() {
            if (this.userdata?.userinfo?.jsonobj != null) {
                this.userinfo = JSON.parse(this.userdata?.userinfo?.jsonobj);
            }
            if (this.userdata?.userinfo?.jsonobj2 != null) {
                this.coapplicant = JSON.parse(this.userdata?.userinfo?.jsonobj2);
            }
            if (this.userdata?.userinfo?.jsonobj3 != null) {
                this.financialData = JSON.parse(this.userdata?.userinfo?.jsonobj3);
            }
        },
        getlogsofemi() {
            let param = { generatedid: this.$route.params.loannumb };
            axios.post('api/users/loan/emis', param)
                .then(response => {
                    this.loanaccount = response.data.loanaccount;
                    console.log(this.loanaccount);
                    this.emilists = response.data.loanemi;
                })
        },
        countToBePaid() {
            if (this.emilists.length > 0) {
                return this.emilists[0]?.emiamount
            }
            return 'N/A';
        },
        SanctionLetter() {

        },
        initialize() {
            let param = { userid: this.$route.params.userid }
            axios.post('api/finance/document/fetch', param)
                .then(response => {
                    this.documentlist = response.data.documents
                    let profile = this.documentlist.find(doc => doc.title === 'Profile Photo');
                    if (profile) {
                        this.profile = profile;
                    }
                })
                .catch(error => console.log(error))
        },
        convert_to(date) {
            return moment(date).format('MM/DD/YYYY')
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

td {
    max-height: 32px;
    /* Limit the maximum height */
    overflow: hidden;
    /* Hide overflow content */
    text-overflow: ellipsis;
    /* Optional: show ellipsis if text is too long */
    white-space: nowrap;
    /* Optional: prevent wrapping */
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
</style>