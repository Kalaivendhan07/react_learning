import { lazy } from "react";

export const LEVELS=[
    {id:1,title:'Level 1 . Foundation'},
    {id:2,title:'Level 2 . Reusable UI Components'},
    {id:3,title:'Level 3 . State & Routing'},
]

//[number ,router path ,title]
const meta=[
    [1,'counter-app','Counter with undo/redo'],
    [2,'todo-app','Todo app with filters + localStorage'],
    [3,'signup-form','Signup form validation'],
    [4,'otp-input','OTP input with resend timer'],
    [5,'stopwatch','Stopwatch: class and hooks'],
    [6,'use-fetch','useFetch hook with retry'],
    [7,'modal-dropdown','Modal and dropdown'],
    [8,'tabs-rating-pagination','Tabs, star rating, pagination'],
    [9,'autocomplete','Autocomplete with keyboard'],
    [10,'image-carousel','Image carousel'],
    [11,'nested-comments','Nested comments'],
    [12,'shopping-cart','Shopping cart with useReducer'],
    [13,'theme-language','Theme and language switcher'],
    [14,'users-table','Users table with URL state'],
    [15,'infinite-scroll','Infinite scroll feed'],
]

const modules=import.meta.glob("./*/index.jsx");

export const TASKS=meta.map(([n,router_path,title])=>{
    const folder=String(n).padStart(2,'0')+'-'+router_path;
    const load=modules['./'+folder+'/index.jsx'];
    return {
        n,router_path,title,folder,
        level:n<=5? 1 : n<=10 ? 2 : 3,
        path:'/tasks/'+folder,
        build:Boolean(load),
        Component : load? lazy(load) : null
    }
})