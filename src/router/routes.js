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
        
      ],

    }
]
  export default routes;
  