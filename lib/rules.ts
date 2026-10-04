export type AppointmentStatus='Planifié'|'Honoré'|'Manqué';
export const scoreBid=(scores:number[],weights:number[])=>Math.round(scores.reduce((s,n,i)=>s+n*(weights[i]||0),0)/100*10)/10;
export const canSeeMedical=(role:string)=>['Direction','Responsable médical','Responsable de cas'].includes(role);
export const missedAppointmentTask=(name:string,date:string)=>({title:`Recontacter ${name}`,due:date,priority:'Haute',status:'À faire'} as const);
export const createsCellLoop=(id:string,parent:string|null,parents:Record<string,string|null>)=>{let cursor=parent;while(cursor){if(cursor===id)return true;cursor=parents[cursor]??null}return false};
