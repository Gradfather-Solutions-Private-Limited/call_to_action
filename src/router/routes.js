import { routeLocationKey } from 'vue-router';

const routes = [
    
    {
      path: '/login',
      component: () => import('../pages/Login.vue'),
      name: 'login',
      meta:{
        noheader:true,
        guest: true
      }
    },
  
    {
      path: "/",
      component: () => import('../pages/AdminLayout.vue'),
      meta: {noheader:false, requiresAuth: true},//, redirectIfAuthenticated: true },
      children: [
        {
          path: '/company',
          component: () => import('../pages/Company.vue'),
          
        },
        {
          path: '/hayatjobs',
          component: () => import('../components/hayat/Hayatjobs.vue'),
          name: 'hayatjobs',
        },
        {
          path: '/applyjobs',
          component: () => import('../components/hayat/AppliedJobs.vue'),
          name: 'applyjobs',
        },
        {
          path: '/dashboard',
          component: () => import('../pages/Dashboard.vue'),
          name: 'dashboard',
        },
        {
          path: '/categories',
          component: () => import('../pages/categories/Categories.vue'),
          name: 'categories',
        },
        {
          path: '/banners',
          component: () => import('../pages/banners/Banners.vue'),
          name: 'banners',
        },
        {
          path: 'categories/addnewcategroy',
          component: () => import('../pages/categories/AddCategories.vue'),
          name: 'newcategories',
        },
        {
          path: 'banner/createupdate/:bannertypeid?',
          component: () => import('../pages/banners/AddNewType.vue'),
          name: 'bannercreateupdate',
        },
        {
          path: 'banner/addnewimage/:bannertypeid?',
          component: () => import('../pages/banners/AddNewImage.vue'),
          name: 'addnewimage',
        },
        {
          path: '/products',
          component: () => import('../pages/products/Products.vue'),
          name: 'products',
        },
        {
          path: '/product/images/:productid',
          component: () => import('../pages/products/ProductImages.vue'),
          name: 'productimages',
        },
        {
          path: 'categories/addproducts',
          component: () => import('../pages/products/AddProducts.vue'),
          name: 'addproducts',
        },
        {
          path: 'uploadimages/lists',
          component: () => import('../pages/Imagesgrouplists.vue'),
          name: 'Imagesgrouplists',
        },
        {
          path: 'categories/collections',
          component: () => import('../pages/categories/CategCollections.vue'),
          name: 'collections',
        },
        {
          path: 'category/images/:categoryid',
          component: () => import('../pages/categories/CategoryImages.vue'),
          name: 'categoryimages',
        },
        {
          path: 'attributes',
          component: () => import('../pages/attributes/AdminAttributes.vue'),
          name: 'attributes',
        },
        {
          path: 'attributes/addattributes',
          component: () => import('../pages/attributes/AttributeForm.vue'),
          name: 'addattribute',
        },
        {
          path: 'attribute/values/images/:valueid',
          component: () => import('../pages/attributes/AttributeImages.vue'),
          name: 'valueimages',
        },
        {
          path: 'orderlist',
          component: () => import('../pages/order/OrderList.vue'),
          name: 'orderlist',
        },
        {
          path: 'homepage',
          component: () => import('../pages/homepage/HomePage.vue'),
          name: 'homepage',
        },
        {
          path: 'templates',
          component: () => import('../pages/template/Templates.vue'),
          name: 'templates',
        },
        {
          path: 'templates/createupdate/:templateid?',
          component: () => import('../pages/template/TemplateForm.vue'),
          name: 'edittemplate',
        },
        {
          path: 'vendorform',
          component: () => import('../pages/vendor/VendorForm.vue'),
          name: 'vendorform',
        },
        {
          path: 'vendorlist',
          component: () => import('../pages/vendor/VendorList.vue'),
          name: 'vendorlist',
        },
        {
          path: 'addcommonproducts',
          component: () => import('../pages/commonproducts/AddCommonProducts.vue'),
          name: 'addcommonproducts',
        },
        {
          path: 'commonproducts',
          component: () => import('../pages/commonproducts/CommonProducts.vue'),
          name: 'commonproducts',
        },
        {
          path: '/poems',
          component: () => import('../pages/Poem.vue'),
          name: 'poems',
        },
        {
          path: '/poem/company/dashboard',
          component: () => import('../pages/Poem.vue'),
        },
        {
          path: '/poem/company/summary',
          component: () => import('../pages/poem/PoemCompanySummary.vue'),
        },
        {
          path: '/poem/dealer/summary',
          component: () => import('../pages/poem/PoemDealerSummary.vue'),
        },
        {
          path: '/poem/create',
          component: () => import('../pages/poem/EditPoem.vue'),
          name: 'createpoem',
        },
        {
          path: '/poem/edit/:poemid',
          component: () => import('../pages/poem/EditPoem.vue'),
          name: 'editpoem',
        },
        {
          path: '/poem/schedule',
          component: () => import('../pages/poem/PoemSchedule.vue'),
          name: 'poemschedule',
        },
        {
          path: '/poem/schedule/assignbystarttime/:starttime/:quiztype',
          component: () => import('../pages/Poem.vue'),
          name: 'assignpoembystarttime',
        },
        {
          path: '/poem/schedule/assign/:poemid',
          component: () => import('../pages/poem/AssignPoemSchedule.vue'),
          name: 'assignpoemschedule',
        },
        {
          path: '/poem/schedule/response/:starttime?',
          component: () => import('../pages/poem/PoemResponses.vue'),
          name: 'poemresponse',
        },
        {
          path: '/poem/draw',
          component: () => import('../pages/poem/PoemDraw.vue'),
        },
        {
          path: '/poem/schedule/dealers',//will show all the dealers business
          component: () => import('../pages/poem/PoemResponseDealers.vue'),
        },
        {
          path: '/poem/dealer/offlinebet',//will show all the dealers business
          component: () => import('../pages/poem/PoemOfflineBet.vue'),
        },
        {
          path: '/users',
          component: () => import('../pages/Users.vue'),
          name: 'users',
        },
        {
          path: '/userdetails/:id',
          component: () => import('../pages/user/UserSummary.vue'),
          name: 'userdetails',
        },
        {
          path: '/seo/navigation',
          component: () => import('../pages/seo/Listnavigation.vue'),
          name: 'seo'
        },
        {
          path: '/users/usersform',
          component: () => import('../pages/Usersform.vue'),
          name: 'usersform',
        },
        {
          path: '/usersaccess',
          component: () => import('../pages/Usersaccess.vue'),
          name: 'usersaccess',
        },
        {
          path: '/moduleform',
          component: () => import('../components/access/ModuleForm.vue'),
          name: 'moduleform',
  
        },
        {
          path: '/moduleoperation',
          component: () => import('../components/access/ModuleOperationForm.vue'),
          name: 'moduleoperation',
  
        },
        {
          path: '/commission',
          component: () => import('../components/commission/SubDealerCommission.vue'),
          name: 'commission',
          
        },

        {
          path: '/wattsapp/uploadimages',
          component: () => import('../components/wattsapp/UploadMedia.vue')
        },
        {
          path: '/wattsapp/templates',
          component: () => import('../pages/wattsapp/WattsappTemplates.vue'),
        },
        {
          path:'/gallery',
          component: ()=> import('../pages/wattsapp/WattsAppTemplateGallery.vue')
        },
        // {
        //   path: '/whatsapp/template/createupdate/:templateid',
        //   component: () => import('../pages/wattsapp/WattsappTemplateDesign.vue'),
        //   name: 'createupdate'
        // },
        {
          path: '/template/createupdate/:templateid',
          component: () => import('../pages/wattsapp/WattsAppTemplate.vue'),
          name: 'createupdate'
        },
        {
          path: '/template/blogspot',
          component: () => import('../pages/blogs/blogspot.vue'),
          name: 'blogspot'
        },
        
        {
          path: '/manufacturerinfo',
          component: () => import('../pages/ManufacturerInfo.vue'),
          name: 'manufacturerinfo'
        },
        {
          path: '/whatsapp/chats',
          component: () => import('../pages/wattsapp/WattsAppChats.vue'),
          // name: 'whatsapp/chats'
        },
        {
          path: '/insights/:tempid',
          component: () => import('../pages/wattsapp/InsightComponent.vue'),
          name: 'insights'
        },
        {
          path: '/whatsapp/dashboard',
          component: () => import('../pages/wattsapp/WattsAppDashboard.vue'),
          name: 'whatsapp_dashboard'
        },
        {
          path: '/message/sms-list',
          component: () => import('../pages/sms/SmsComponent.vue'),
          name: 'sms-list'
        },
        {
          path: '/message/campaign',
          component: () => import('../pages/sms/CampaignList.vue'),
          name: 'campaign'
        },
        {
          path: '/message/campaign/detail/:campaignid',
          component: () => import('../pages/sms/CampaignDetail.vue'),
          name: 'campaign_detail'
        },
        {
          path: '/whatsapp/flow',
          component: () => import('../pages/wattsapp/WattsAppFlow.vue'),
          name: 'wattsapp_flow'
        },
        {
          path:'/operations/crud',
          component: () => import('../pages/operations/TableCrud.vue'),
          name: 'operations_crud'
        },
        {
          path: '/typing-tutor',
          component: () => import('../pages/TypingTutor.vue'),
          
        },
        {
          path: '/distributors',
          component: () => import('../pages/Distributors.vue'),
        },
        {
          path: '/scheduled-meetings',
          component: () => import('../pages/ScheduledMeetings.vue'),
        },
        {
          path: '/financing-requests',
          component: () => import('../pages/FinancingRequests.vue'),
        },
        {
          path: '/dsr',
          component: () => import('../pages/DSR.vue'),
        },
        {
          path: '/leads',
          component: () => import('../pages/Leads.vue'),
        },
        {
          path: '/complains',
          component: () => import('../pages/Complains.vue'),
        },
        {
          path: '/sale-orders',
          component: () => import('../pages/SaleOrders.vue'),
        },
        {
          path: '/sales-order-detail/:id',
          component: () => import('../pages/SaleOrderDetail.vue'),
        },
        {
          path: '/dispatches',
          component: () => import('../pages/Dispatches.vue'),
        },
        {

          path: '/steno-test-series',
          component: () => import('../pages/StenoTestSeries.vue'),
        },
        {
          path: '/dispatch-detail/:id',
          component: () => import('../pages/DispatchDetail.vue'),
        },
        {
          path: '/customers',
          component: () => import('../pages/customer/Customer.vue'),
        },
        {
          path: '/salesmen',
          component: () => import('../pages/customer/Salesmen.vue'),
        },
        {
          path: '/servicemen',
          component: () => import('../pages/customer/Servicemen.vue'),
        },
        {
          path: '/customer-purchase',
          component: () => import('../pages/course/CoursePurchaseList.vue'),
        },
        {
          path: '/series-result',
          component: () => import('../pages/course/TestSeriesResultPage.vue'),
        },


        // vehicle routes

        {
          path: 'pages/vehicle-entry',
          component: () => import('../pages/vehicle/VehicleEntry.vue'),
        },

        {
          path: 'pages/vehicle-entry',
          component: () => import('../pages/vehicle/VehicleEntry.vue'),
        },
        {
          path: 'loan-form',
          component: () => import('../components/loan/LoanForm.vue'),
        },
        {
          path: 'loan-accounts',
          component: () => import('../components/loan/LoanAccounts.vue'),
          name: 'loan-accounts',
        },
        {
          path: 'loan-details/:id',
          component: () => import('../components/loan/LoanDetails.vue'),
        },
        {
          path: 'pdf-details/:userid/:loannumb',
          component: () => import('../pages/user/PDFUserinfo.vue'),
        },
        {
          path: 'loanLedgers',
          component: () => import('../components/loan/LoanLedgers.vue'),
        },
        {
          path: 'schedule-emis',
          component: () => import('../components/duesreport/ScheduleEmiReport.vue'),
        },
        {
          path: 'loan-transactions/:loanaccountid/:customerid',
          component: () => import('../components/loan/LoanLedgerTransaction.vue'),
        },
        {
          path: 'user-type-ledgers',
          component: () => import('../components/ledgers/UserTypeLedgers.vue'),
        },
        {
          path: 'registers',
          component: () => import('../components/registers/RegisterTransaction.vue'),
        },
        {
          path: 'eNach-form/:loanaccountid/:customerid',
          component: () => import('../components/enach/ENachRequest.vue'),
        }, 
        // {
        //   path: 'eNach-list/:loanaccountid/:customerid',
        //   component: () => import('../components/enach/ENachList.vue'),
        // },
        {
          path: 'enach-details/:id',
          component: () => import('../components/enach/ENachDetail.vue'),
        },
        {
          path: 'all-enach',
          component: () => import('../components/enach/AllENaches.vue'),
        },
      ],

    }
]
  export default routes;
  