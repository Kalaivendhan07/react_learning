import { lazy } from "react";

export const LEVELS=[
    {id:1,title:'Level 1 . Foundation'},
    {id:2,title:'Level 2 . Reusable UI Components'},
    {id:3,title:'Level 3 . State & Routing'},
    {id:4,title:'Level 4 . API, Performance & full stack'},
]

//[number ,router path ,title]
const meta=[
    [1,'counter-app','Counter with undo/redo'],
]

const modules=import.meta.glob("./*/index.jsx");

export const TASKS=meta.map(([n,router_path,title])=>{
    const folder=String(n).padStart(2,'0')+'-'+router_path;
    const load=modules['./'+folder+'/index.jsx'];
    return {
        n,router_path,title,folder,
        level:n<=8? 1 : n<=14 ? 2 : n<=21? 3:4,
        path:'/tasks/'+folder,
        build:Boolean(load),
        Component : load? lazy(load) : null
    }
})