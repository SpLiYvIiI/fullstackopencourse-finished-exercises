import React from 'react'
import {Entry} from '../types'
import {assertNever} from '../helper'
import HealthCheck  from './Entries/HealthCheck'
import Hospital from './Entries/Hospital'
import OccupationalHealthcare from './Entries/OccupationalHealthcare'

const EntryDetails : React.FC<{entry : Entry}> = ({entry}) =>{
    switch(entry.type){
        case "HealthCheck":
           return <HealthCheck entry={entry}/>
        case "Hospital" :
            return <Hospital entry = {entry}/>
        case "OccupationalHealthcare":
            return <OccupationalHealthcare entry = {entry} />
        default :
            return assertNever(entry)
    }
}


export default EntryDetails