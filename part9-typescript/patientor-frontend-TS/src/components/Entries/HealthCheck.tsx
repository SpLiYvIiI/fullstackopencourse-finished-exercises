import React from 'react'
import { Card, Icon } from 'semantic-ui-react';
import { useStateValue } from '../../state';
import {Diagnosis, Entry} from '../../types'

const EntryDetails : React.FC<{entry : Entry}> = ({entry}) =>{
    const[{diagnosis}] = useStateValue();
    return(
      <Card fluid>
        <Card.Content>
          <h1>{entry.date} <Icon className="user doctor"></Icon></h1>
          <Card.Description>{entry.description}</Card.Description>
          <Card.Meta>
          <ul>
        {entry.diagnosisCodes?.map((diagnosisCode : string,i : number) => {
            const code : Diagnosis | undefined = diagnosis.find((diagnosis : Diagnosis) => diagnosis.code === diagnosisCode) 
            if(!code) return null
            else{
            return(
                <li key={i}>
                {code.code} | {code.name} | {code.latin}
                </li>
            )
            }
        })}
        </ul>    
          </Card.Meta>

        </Card.Content>
      </Card>
    )
}


export default EntryDetails