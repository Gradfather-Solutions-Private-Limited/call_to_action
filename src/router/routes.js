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
          path: '/studentmanager',
          component: () => import('../pages/student/StudentForm.vue'),
          
        },
        {
          path: '/patientmanager',
          component: () => import('../pages/Patient/PatientManager.vue'),
          
        },
        {
          path: '/hospitalmanager',
          component: () => import('../pages/Hospital/HospitalManager.vue'),
          
        },
        {
          path: '/institute',
          component: () => import('../pages/institute/InstituteForm.vue'),
          
        },
        {
          path: '/mobilizermanager',
          component: () => import('../pages/Mobilizer/MobilizerManager.vue'),
          
        },
        {
          path: '/access',
          component: () => import('../pages/access/ManageAccess.vue'),
          
        },
         {
          path: '/employee',
          component: () => import('../pages/employee/EmployeeList.vue'),
          
        },

      ],

    }
]
  export default routes;
  